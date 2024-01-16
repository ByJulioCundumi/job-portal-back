export interface IJob {
    id?:number,
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
