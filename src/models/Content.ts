import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from "typeorm";

import { Watch } from "./Watch";
import { Rate } from "./Rate";

export enum Category {
    MOVIE = "MOVIE",
    BOOK = "BOOK",
    TV = "TV"
}

@Entity()
export class Content extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column("simple-json")
    attr: {};

    @Column({
        type: "enum",
        enum: Category
    })
    category: Category;

    @Column({ default: 0 })
    score: number;

    @Column({ default: 0 })
    rateCount: number;

    @Column({ default: 0 })
    commentCount: number;

    @OneToMany(type => Watch, watch => watch.user)
    watchs: Watch[];

    @OneToMany(type => Rate, rate => rate.user)
    rates: Rate[];

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