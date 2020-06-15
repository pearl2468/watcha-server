import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from "typeorm";

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

    @BeforeInsert()
    BeforeInsert() {
        this.createdAt = new Date();
    }

    @BeforeUpdate()
    BeforeUpdate() {
        this.updatedAt = new Date();
    }

}