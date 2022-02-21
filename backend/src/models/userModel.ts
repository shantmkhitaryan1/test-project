export interface UserInterface {
    id: string;
    name: string;
    surname: string;
    username: string;
    token: string;
}

export class UserData implements UserInterface {
    constructor(
        public id = "",
        public name = "",
        public surname = "",
        public username = "",
        public token = ""
    ){}
}