import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { Encontrado } from "./Encontrado"
import { Usuario } from "./Usuario"

@Entity()
export class Objeto extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string
    
    @Column()
    latitud: string
    
    @Column()
    longitud: string
    
    @Column('text')
    descripcion: string
    
    @CreateDateColumn()
    fechaCreacion: Date

    @UpdateDateColumn()
    fechaActualizacion: Date

    @ManyToOne(() => Usuario, usuario => usuario.objetosCreados)
    propietario: Usuario
    
    @OneToMany(() => Encontrado, encontrado => encontrado.objeto)
    encontradoEn: Encontrado[]
}