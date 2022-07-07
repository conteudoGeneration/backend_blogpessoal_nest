import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import { Bcrypt } from '../../auth/bcrypt/bcrypt';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        private bcrypt: Bcrypt
    ) { }

    async findOneByUserName(username: string): Promise<Usuario | undefined> {
        return await this.usuarioRepository.findOne({
            where: {
                usuario: username
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
            }
        });

        if (!usuario)
            throw new HttpException('usuario não encontrado!', HttpStatus.NOT_FOUND);

        return usuario;

    }

    async create(user: Usuario): Promise<Usuario> {
        const usuarioBusca = await this.findOneByUserName(user.usuario);

        if (!usuarioBusca) {
            user.senha = await this.bcrypt.gerarHash(user.senha)
            return await this.usuarioRepository.save(user);
        }

        throw new HttpException("O Usuario ja existe!", HttpStatus.BAD_REQUEST);

    }

    async update(user: Usuario): Promise<Usuario> {

        let usuarioUpdate: Usuario = await this.findOneById(user.id);
        const usuarioBusca = await this.findOneByUserName(user.usuario);

        if (usuarioUpdate === undefined)
            throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);

        if (usuarioBusca && usuarioBusca.id !== user.id)
            throw new HttpException('Usuário (e-mail) já Cadastrado, digite outro!', HttpStatus.BAD_REQUEST);

        user.senha = await this.bcrypt.gerarHash(user.senha)
        return await this.usuarioRepository.save(user);

    }

}