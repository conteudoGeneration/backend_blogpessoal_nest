import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put } from '@nestjs/common';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { AuthService } from '../services/auth.service';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) { }

    @Get('/auth/all')
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Usuario[]> {
        return this.authService.findAll();
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('auth/cadastrar')
    async cadastrar(@Body() user: Usuario): Promise<Usuario> {
        return await this.authService.cadastrar(user);
    }

    @HttpCode(HttpStatus.CREATED)
    @Put('auth/atualizar')
    async atualizar(@Body() user: Usuario): Promise<Usuario> {
        return await this.authService.atualizar(user);
    }
}