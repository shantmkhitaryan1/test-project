import { Response } from "../models/responseModel";
import path from 'path';
// import axios from "axios";
import FormData from "form-data";
import request from "request";
import fs from 'fs';

const parserUrl = process.env.TIKA_URI

export default class PdfController {
    public async uploadPdf(req, res) {
        try {
            if(!req?.files?.file || !req?.files?.file.mimetype.includes('pdf')) {
                res.status(400).send(new Response(400, null, 'Invalid file provided'));
            }
            const file = req.files.file;

            const uploadDirectory = path.resolve(__dirname + '/../', `uploads/${file.name}`);
            await file.mv(uploadDirectory);
            const options = {
                method: 'PUT',
                url: parserUrl,
                'headers': {
                    Accept: 'text/plain',
                    'Content-Type': 'application/pdf'
                },
                body: fs.readFileSync(uploadDirectory)
            };

            request(options, function (error, response) {
                console.log(error);
                if (error) throw new Error(error);
                res.status(200).send(new Response(200, {data: response.body}, 'data successfully parsed'));
            });
        } catch (error) {
            res.status(500).send(new Response());
        }
    }
}