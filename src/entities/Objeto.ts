import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from "typeorm"
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
    
}