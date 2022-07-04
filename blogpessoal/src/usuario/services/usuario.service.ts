import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>
    ) { }

    async findOneByUserName(username: string): Promise<Usuario | undefined> {
        return await this.usuarioRepository.findOne({
            where: {
                usuario: username
            },
            relations: {
                postagem: true
            }
        })
    }

    async findAll(): Promise<Usuario[]> {
        return await this.usuarioRepository.find(
            {
                relations:{
                    postagem: true
                }
            }
        );
    }

    async findOneById(id: number): Promise<Usuario> {

        let usuario = await this.usuarioRepository.findOne({
            where: {
                id
            },
            relations: {
                postagem: true
            }
        });

        if (!usuario)
            throw new HttpException('usuario não encontrado!', HttpStatus.NOT_FOUND);

        return usuario;

    }

    async create(usuario: Usuario): Promise<Usuario> {
        const usuer = await this.findOneByUserName(usuario.usuario);

        if (!usuario) {
            usuario.senha = await bcrypt.hash(usuario.senha, 10)
            return await this.usuarioRepository.save(usuario);
        }

        throw new HttpException("O Usuario ja existe!", HttpStatus.BAD_REQUEST);

    }

    async update(usuario: Usuario): Promise<Usuario> {

        const user = await this.findOneByUserName(usuario.usuario);
        let usuarioUpdate: Usuario = await this.findOneById(usuario.id);

        if (usuarioUpdate === undefined)
            throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);

        if (user.id !== usuario.id)
            throw new HttpException('O Usuário (e-mail) já Cadastrado, digite outro!', HttpStatus.NOT_FOUND);

        usuario.senha = await bcrypt.hash(usuario.senha, 10)
        return await this.usuarioRepository.save(usuario);

    }

}