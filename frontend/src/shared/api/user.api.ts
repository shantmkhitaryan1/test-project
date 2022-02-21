import { UserModel } from '../models/signModel';
import { Api } from './api';

const baseUrl = 'http://localhost:8000/user';

export class UserApi extends Api {
   public static login(data: {username: string; password: string}) {
      return fetch(
         `${baseUrl}/login`,
         UserApi.createHeaders(false, 'POST', data),
      )
         .then(async (response) => await response.json())
         .catch(UserApi.handleError);
   }

   public static register(data: UserModel) {
      return fetch(`${baseUrl}/register`, UserApi.createHeaders(false, 'POST', data))
         .then(async (response) => await response.json())
         .catch(UserApi.handleError);
   }

   public static getLogedInUser = () => {
      return fetch(`${baseUrl}/currentUser`, UserApi.createHeaders(true))
         .then(async (response) => await response.json())
         .catch(UserApi.handleError);
   }
}
