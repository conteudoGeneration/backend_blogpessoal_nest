import { Injectable } from '@nestjs/common';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { UsuarioService } from 'src/usuario/services/usuario.service';

@Injectable()
export class AuthService {
    constructor(
        private usuarioService: UsuarioService
    ) { }

    async findAll(): Promise<Usuario[]> {
        return await this.usuarioService.findAll();
    }

    async cadastrar(user: Usuario): Promise<Usuario> {
        return await this.usuarioService.create(user);
    }

    async atualizar(user: Usuario): Promise<Usuario> {
        return await this.usuarioService.update(user);
    }

}