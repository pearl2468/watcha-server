import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, Timestamp, BeforeInsert, BeforeUpdate } from "typeorm";
import * as bcrypt from "bcryptjs";

import { Comment } from "./Comment";
import { Watch } from "./Watch";

const saltRounds = 10;

export enum Role {
    ADMIN = "admin",
    USER = "user"
}

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    descr: string;

    //TODO https://typeorm.io/#/entities/enum-column-type
    @Column({
        type: "enum",
        enum: Role,
        default: Role.USER
    })
    role: Role;

    @OneToMany(type => Comment, comment => comment.user)
    comments: Comment[];

    @OneToMany(type => Watch, watch => watch.user)
    watchs: Watch[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @BeforeInsert()
    BeforeInsert() {
        this.setCreatedAt();
        this.hashPasswordBeforeCreate();
    }

    @BeforeUpdate()
    BeforeUpdate() {
        this.setUpdateAt();
        this.hashPasswordBeforeUpdate();
    }

    setCreatedAt() {
        this.createdAt = new Date();
    }

    setUpdateAt() {
        this.updatedAt = new Date();
    }

    hashPasswordBeforeCreate() {
        if (this.password) {
            var salt = bcrypt.genSaltSync(saltRounds);
            this.password = bcrypt.hashSync(this.password, salt);
        }
    }

    hashPasswordBeforeUpdate() {
        if (this.password) {
            var salt = bcrypt.genSaltSync(saltRounds);
            this.password = bcrypt.hashSync(this.password, salt);
        }
    }

}