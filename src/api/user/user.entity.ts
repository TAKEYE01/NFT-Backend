import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import { bcrypt } from 'bcryptjs';

@Entity('nft_user')
export class nft_user {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({ type: 'varchar', length: 50, nullable: false, unique: true})
    public username: string;

    @Column({ type: 'varchar', nullable: false})
    public password: string;

    @Column({ type: 'varchar', nullable: false, length: 120})
    public email: string;

}
