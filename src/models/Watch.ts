import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from "typeorm";

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

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @BeforeInsert()
    BeforeInsert() {
        this.setCreatedAt();
    }

    @BeforeUpdate()
    BeforeUpdate() {
        this.setUpdateAt();
    }

    setCreatedAt() {
        this.createdAt = new Date();
    }

    setUpdateAt() {
        this.updatedAt = new Date();
    }

}