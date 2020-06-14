import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Heart extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sort: string;

    @Column()
    parentId: number;

    @Column()
    userId: number;

}