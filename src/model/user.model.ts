import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Relation, OneToMany } from "typeorm";
import { USER_ROLE } from '../util/role.enum.js';
import { Job } from "./job.model.js";

@Entity()
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"simple-json", nullable:true})
    img: {
        url:string,
        id:string
    }

    @Column({nullable:false})
    firstname:string;

    @Column({nullable:false, unique:true})
    email:string;

    @Column({nullable:false})
    password:string;

    @Column({type:"enum", enum: USER_ROLE, default:"user"})
    role: USER_ROLE;

    @OneToMany(()=> Job, (job)=> job.user)
    jobs: Relation<Job[]>
}