
import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv';
import upload from 'express-fileupload';

dotenv.config();

import UserApi from './api/user.api';
import PdfApi from './api/pdf.api';
import connect from './db/config'

const app = express();
app.use(upload());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
connect();

app.use('/user', UserApi);
app.use('/pdf', PdfApi);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});