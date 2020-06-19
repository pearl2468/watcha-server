import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, ManyToOne } from "typeorm";

import { Comment } from "./Comment";
import { Collection } from "./Collection";

export enum HeartSort {
    COLLECTION = "COLLECTION",
    COMMENT = "COMMENT"
}

@Entity()
export class Heart extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "enum",
        enum: HeartSort
    })
    sort: HeartSort;

    @Column()
    parentId: number;

    @Column()
    userId: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(type => Comment, comment => comment.hearts)
    comment: Comment;

    @ManyToOne(type => Collection, collection => collection.hearts)
    collection: Collection;

    @BeforeInsert()
    BeforeInsert() {
        this.createdAt = new Date();
    }

    @BeforeUpdate()
    BeforeUpdate() {
        this.updatedAt = new Date();
    }

}