import { getToken } from "../helpers/helper";

interface Options {
	method: string;
	headers?: {
		'content-type': string;
      Authorization?: string
	};
	body?: string;
}

export class Api {
   public static createHeaders(
      secure: boolean = true,
      method: string = 'get',
      body: any = null,
      isFile: boolean = false
   ) {
      const options: Options = {
         method
      };
      const headers: any = {};

      if(secure) {
         headers.Authorization = getToken();
      }
      if(!isFile) {
         headers['content-type'] = 'application/json';
      }
      options.headers = headers;
      if (body) options.body = isFile ? body : JSON.stringify(body);
      return options;
   }

   public static handleError(error: any) {
      return {
         error: true,
         errorInfo: error,
      };
   }
}
