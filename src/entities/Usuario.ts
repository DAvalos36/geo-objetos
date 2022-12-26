import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm"

@Entity()
export class Usuario {
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

    @CreateDateColumn()
    creadoEn: Date
}