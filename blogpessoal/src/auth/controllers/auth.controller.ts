import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { AuthService } from '../services/auth.service';

@Controller("/auth")
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('/logar')
    async login(@Body() user: any): Promise<any> {
        return this.authService.login(user);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('auth/cadastrar')
    async cadastrar(@Body() user: Usuario): Promise<Usuario> {
        return await this.authService.cadastrar(user);
    }

}