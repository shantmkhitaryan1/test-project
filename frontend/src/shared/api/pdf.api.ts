import { Api } from './api';

const baseUrl = 'http://localhost:8000/pdf';

export class PdfApi extends Api {
   public static uploadPdf(data: FormData) {
      return fetch(
         `${baseUrl}/upload`,
         PdfApi.createHeaders(true, 'POST', data, true),
      )
         .then(async (response) => await response.json())
         .catch(PdfApi.handleError);
   }
}
