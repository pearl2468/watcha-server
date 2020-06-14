import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { Content } from "./Content";

@Entity()
export class Watch extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    contentId: number;

    @Column()
    userId: number;

    @Column()
    status: string;

    @ManyToOne(type => User, user => user.watchs)
    user: User;

    @ManyToOne(type => Content, content => content.watchs)
    content: Content;

}