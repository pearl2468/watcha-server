import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from "typeorm";

import { User } from "./User";
import { Content } from "./Content";

export enum Status {
    NONE = "NONE",
    WISH = "WISH",
    WATCHING = "WATCHING"
}

@Entity()
export class Watch extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    contentId: number;

    @Column()
    userId: number;

    @Column({
        type: "enum",
        enum: Status
    })
    status: Status;

    @ManyToOne(type => User, user => user.watchs)
    user: User;

    @ManyToOne(type => Content, content => content.watchs)
    content: Content;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @BeforeInsert()
    BeforeInsert() {
        this.createdAt = new Date();
    }

    @BeforeUpdate()
    BeforeUpdate() {
        this.updatedAt = new Date();
    }

}