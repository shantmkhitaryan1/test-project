import { Router } from 'express';

import PdfController from '../controller/pdfController';
import { verifyUser } from '../middleware/auth';

const route = Router();
const pdfController = new PdfController();

route.post('/upload', verifyUser, pdfController.uploadPdf);

export default route;