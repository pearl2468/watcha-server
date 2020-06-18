import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, ManyToOne } from "typeorm";

import { Content } from "./Content";

@Entity()
export class Rate extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    contentId: number;

    @Column()
    userId: number;

    @Column({ default: 0 })
    score: number;

    @ManyToOne(type => Content, content => content.rates)
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