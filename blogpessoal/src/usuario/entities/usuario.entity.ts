import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Postagem } from "../../postagem/entities/postagem.entity"

@Entity({name: "tb_usuarios"})
export class Usuario {

    @PrimaryGeneratedColumn()   
    public id: number

    @Column({length: 80, nullable: false}) 
    public nome: string

    @Column({length: 80, nullable: false }) 
    public usuario: string

    @Column({length: 255, nullable: false }) 
    public senha: string

    @Column({type: "longtext" }) 
    public foto: string

    @OneToMany(() => Postagem, (postagem) => postagem.usuario)
    postagem: Postagem[]

}