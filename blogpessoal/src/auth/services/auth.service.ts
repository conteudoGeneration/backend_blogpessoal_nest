import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { Usuario } from '../../usuario/entities/usuario.entity';
import { UsuarioService } from '../../usuario/services/usuario.service';

@Injectable()
export class AuthService {
    constructor(
        private usuarioService: UsuarioService,
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, password: string): Promise<any> {
    
        const user = await this.usuarioService.findOneByUserName(username);
        
        if (user && bcrypt.compare(user.senha, await bcrypt.hash(password, 10))) {
          const { senha, ...result } = user;
          return result;
        }
        return null;
      }
    
      async login(user: any) {
        const payload = { username: user.username, sub: user.userId };     
      
        return {
          usuario: user.username,
          access_token: this.jwtService.sign(payload),
        };
      }

    async cadastrar(user: Usuario): Promise<Usuario> {
        return await this.usuarioService.create(user);
    }
    
}