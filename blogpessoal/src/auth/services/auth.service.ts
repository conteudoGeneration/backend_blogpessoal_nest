import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../../usuario/services/usuario.service';
import { Bcrypt } from '../bcrypt/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
    private bcrypt: Bcrypt
  ) { }

  async validateUser(username: string, password: string): Promise<any> {

    const user = await this.usuarioService.findByUsuario(username);

    if (user && this.bcrypt.compararHash(user.senha, password)) {
      const { senha, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };

    return {
      usuario: user.usuario,
      token: `Bearer ${this.jwtService.sign(payload)}`,
    };
  }

}