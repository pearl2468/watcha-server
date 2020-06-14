import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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

    @Column()
    heartCount: number;

    @Column()
    commentCount: number;

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