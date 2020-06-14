import {BaseEntity, Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Like extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    commentId: number;

    @Column()
    userId: number;

}