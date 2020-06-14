import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from "typeorm";

import { Watch } from "./Watch";

@Entity()
export class Content extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    // TODO https://typeorm.io/#/entities/simple-json-column-type
    @Column("simple-json")
    attr: { director: string };

    @Column()
    category: string;

    @Column({ default: 0 })
    score: number;

    @Column({ default: 0 })
    rateCount: number;

    @Column({ default: 0 })
    commentCount: number;

    @OneToMany(type => Watch, watch => watch.user)
    watchs: Watch[];

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