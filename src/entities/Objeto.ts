import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { Encontrado } from "./Encontrado"
import { Usuario } from "./Usuario"

@Entity()
export class Objeto extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string
    
    @Column('decimal', { precision: 14, scale: 10})
    latitud: number
    
    @Column('decimal', { precision: 14, scale: 10})
    longitud: number
    
    @Column('text')
    descripcion: string
    
    @CreateDateColumn()
    fechaCreacion: Date

    @UpdateDateColumn()
    fechaActualizacion: Date

    @ManyToOne(() => Usuario, usuario => usuario.objetosCreados)
    propietario: Promise<Usuario>
    
    @Column()
    propietarioId: string

    @OneToMany(() => Encontrado, encontrado => encontrado.objeto)
    encontradoEn: Encontrado[]
}