export interface IJob {
    id?:number,
    img: {
        path:string,
        url:string,
        id:string
    }
    title: string,
    location: string,
    type: string,
    modality: string,
    salary: number,
    experience: number,
    description: string,
    user?:number,
    createdAt: Date
}

export interface IJobPost extends Omit<IJob, "img" | "user" | "createdAt"> {
    img: string
}
