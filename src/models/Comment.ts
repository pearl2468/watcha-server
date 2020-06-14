import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Comment extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sort: string;

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

    @Column()
    heartCount: number;

    @ManyToOne(type => User, user => user.comments)
    user: User;
}