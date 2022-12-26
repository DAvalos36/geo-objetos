import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { Encontrado } from "./Encontrado"
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

    @CreateDateColumn()
    fechaCreacion: Date

    @UpdateDateColumn()
    fechaActualizacion: Date

    @OneToMany(() => Objeto, objeto => objeto.propietario)
    objetosCreados: Objeto[]
    
    @OneToMany(() => Objeto, objeto => objeto.propietario)
    objetosEncontrados: Encontrado[]

}