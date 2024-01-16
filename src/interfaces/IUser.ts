import { IJob } from "./IJob";

export interface IUser {
    id?: number,
    firstname: string,
    email: string,
    password: string,
    role: string,
    jobs: IJob[]
}

export interface IUserDTO extends Omit<IUser, "password"> { }