import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, Relation, CreateDateColumn } from "typeorm";
import { User } from "./user.model.js";

@Entity()
export class Job extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Column({nullable:false})
    title:string;

    @Column({nullable:false})
    location:string;

    @Column({nullable:false})
    type:string;

    @Column({nullable:false})
    modality:string;

    @Column({nullable:false})
    salary:number;

    @Column({nullable:false})
    experience:number;

    @Column({nullable:false})
    description:string;

    @ManyToOne(()=> User, (user)=> user.jobs)
    user: Relation<User>

    @CreateDateColumn()
    createdAt: Date;
}