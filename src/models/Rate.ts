import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from "typeorm";

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