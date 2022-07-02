import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Like, Repository } from "typeorm";
import { Postagem } from "../Entities/postagem.entity";

@Injectable()
export class PostagemService {
    constructor(
        @InjectRepository(Postagem)
        private postagemRepository: Repository<Postagem>
    ) { }

    async findAll(): Promise<Postagem[]> {
        return await this.postagemRepository.find(
            {
                relations:{
                    tema: true
                }
            }
        );
    }

    async findOneById(id: number): Promise<Postagem> {

        let postagem = await this.postagemRepository.findOne({
            where: {
                id
            },
            relations: {
                tema: true
            }
        });

        if (!postagem)
            throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);

        return postagem;
            
    }

    async findByTitulo(titulo: string): Promise<Postagem[]> {
        return await this.postagemRepository.find({
            where: {
                titulo: Like(`%${titulo}%`)
            },
            relations: {
                tema: true
            }
        })
    }

    async create(postagem: Postagem): Promise<Postagem> {
        return await this.postagemRepository.save(postagem);
    }

    async update(postagem: Postagem): Promise<Postagem> {
        
        let post: Postagem = await this.findOneById(postagem.id);

        if (post === undefined)
            throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);
        
        return await this.postagemRepository.save(postagem);
    }

    async delete(id: number): Promise<DeleteResult> {
        
        let postagem = await this.findOneById(id);

        return await this.postagemRepository.delete(id);

    }

}


