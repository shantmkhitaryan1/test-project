export interface SignInterface {
    id: string,
    name: string,
    surname: string,
    username: string,
    password: string,
    confirmPassword: string,
}

export class LoginModel implements Pick<SignInterface, "username" | "password">{
    constructor(
        public username = "",
        public password = ""
    ){}
}

export class UserModel implements SignInterface{
    constructor(
        public id = "",
        public name = "",
        public surname = "",
        public username = "",
        public password = "",
        public confirmPassword = "",
    ){}
}