import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put } from '@nestjs/common';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { AuthService } from '../services/auth.service';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.CREATED)
    @Post('auth/cadastrar')
    async cadastrar(@Body() user: Usuario): Promise<Usuario> {
        return await this.authService.cadastrar(user);
    }

}