import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany } from "typeorm"
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
    
    @ManyToOne(() => Usuario, usuario => usuario.objetosCreados)
    propietario: Usuario
    
    @OneToMany(() => Encontrado, encontrado => encontrado.objeto)
    encontradoEn: Encontrado[]
}