import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class nft_user {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ type: 'varchar', length: 50})
    public username: string;

    @Column({ type: 'varchar', length: 120})
    public email: string;

    @Column({ type: 'text'})
    public password: string;

    @Column({ type: 'boolean', default: false})
    public isDeleted: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    public createdAt!: Date;

    @CreateDateColumn({ type: 'timestamp' })
    public updatedAt!: Date;

    @CreateDateColumn({ type: 'timestamp', default: null })
    public deletedAt!: Date;
    
}