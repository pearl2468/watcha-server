import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, OneToMany } from "typeorm";
import { Heart } from "./Heart";
import { Comment } from "./Comment";

@Entity()
export class Collection extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    title: string;

    @Column()
    descr: string;

    @Column({ default: 0 })
    heartCount: number;

    @Column({ default: 0 })
    commentCount: number;

    @OneToMany(type => Heart, heart => heart.collection)
    hearts: Heart[];

    @OneToMany(type => Comment, comment => comment.collection)
    comments: Comment[];

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

@Entity()
export class CollectionContent extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    collectionId: number;

    @Column()
    contentId: number;

}