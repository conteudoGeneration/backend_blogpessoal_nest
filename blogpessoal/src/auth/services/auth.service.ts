import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { UsuarioService } from 'src/usuario/services/usuario.service';
import * as bcrypt from 'bcrypt'

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