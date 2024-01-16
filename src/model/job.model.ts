import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, Relation } from "typeorm";
import { User } from "./user.model.js";

@Entity()
export class Job extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Column({nullable:false})
    firstname:string;

    @Column({nullable:false, unique:true})
    email:string;

    @Column({nullable:false})
    password:string;

    @ManyToOne(()=> User, (user)=> user.jobs)
    user: Relation<User>

}