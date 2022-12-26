import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BaseEntity } from "typeorm"

@Entity()
export class Usuario extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    usuario: string

    @Column({
        length: 60,
    })
    contra: string

    @Column()
    nombres: string

    @Column()
    apellidos: string

}