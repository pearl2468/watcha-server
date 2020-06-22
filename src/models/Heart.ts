import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, ManyToOne } from "typeorm";

import { Comment } from "./Comment";
import { Collection } from "./Collection";

@Entity()
export class Heart extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    collectionId: number;

    @Column()
    commentId: number;

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