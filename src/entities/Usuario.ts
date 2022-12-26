import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm"
import { Objeto } from "./Objeto"
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

    @OneToMany(() => Objeto, objeto => objeto.propietario)
    objetosCreados: Objeto[]

}