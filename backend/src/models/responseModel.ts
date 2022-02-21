export interface ResponsInterface {
    code: number;
    data: any;
    message: string;
}

export class Response implements ResponsInterface {
    constructor(
        public code = 500, 
        public data = null,
        public message = 'Internal server error', 
    ){}
}