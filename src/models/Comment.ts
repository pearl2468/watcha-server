import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from "typeorm";
import { User } from "./User";

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
    content: string;

    @Column()
    isSpoiler: boolean;

    @Column({ default: 0 })
    heartCount: number;

    @ManyToOne(type => User, user => user.comments)
    user: User;

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