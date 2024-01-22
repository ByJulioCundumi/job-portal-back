import { USER_ROLE } from "../util/role.enum";
import { IJob } from "./IJob";

export interface IUser {
    id?: number,
    img?: {
        url:string,
        id:string
    }
    firstname: string,
    email: string,
    password: string,
    role: USER_ROLE,
    jobs?: IJob[]
}

export interface IUserDTO extends Omit<IUser, "password"> { }