import { UserModel } from "../signModel";

export interface UserReducerInterface {
    loading: boolean,
    currentUser: Partial<UserModel>,
    error: any
}