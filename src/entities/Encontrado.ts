import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, CreateDateColumn } from "typeorm"
import { Objeto } from "./Objeto"
import { Usuario } from "./Usuario"

@Entity()
export class Encontrado extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    latitudReclamada: string
    
    @Column()
    longitudReclamada: string
    
    @Column({
        width: 2
    })
    valoracion: number

    @CreateDateColumn()
    fecha: Date
    
    @ManyToOne(() => Usuario, usuario => usuario.objetosEncontrados)
    ecnontradoPor: Promise<Usuario>

    @Column()
    encontradoPorId: string

    @ManyToOne(() => Objeto, objeto => objeto.encontradoEn)
    objeto: Promise<Objeto>
    
    @Column()
    objetoId: string
}