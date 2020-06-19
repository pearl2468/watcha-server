import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, OneToMany } from "typeorm";

import { User } from "./User";
import { Heart } from "./Heart";
import { Content } from "./Content";
import { Collection } from "./Collection";

export enum CommentSort {
    CONTENT = "CONTENT",
    COLLECTION = "COLLECTION"
}

@Entity()
export class Comment extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "enum",
        enum: CommentSort
    })
    sort: CommentSort;

    @Column()
    parentId: number;

    @Column()
    parentCommentId: number;

    @Column()
    userId: number;

    @Column()
    text: string;

    @Column()
    isSpoiler: boolean;

    @Column({ default: 0 })
    heartCount: number;

    @ManyToOne(type => User, user => user.comments)
    user: User;

    @ManyToOne(type => Content, content => content.comments)
    content: Content;

    @ManyToOne(type => Collection, collection => collection.comments)
    collection: Collection;

    @OneToMany(type => Heart, heart => heart.comment)
    hearts: Heart[];

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