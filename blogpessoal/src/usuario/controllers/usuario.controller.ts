import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put, UseGuards } from "@nestjs/common";
import { Usuario } from "../entities/usuario.entity";
import { UsuarioService } from "../services/usuario.service";

@Controller("/usuarios")
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) { }

    @Get('/all')
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Usuario[]> {
        return this.usuarioService.findAll();
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('/cadastrar')
    async cadastrar(@Body() usuario: Usuario): Promise<Usuario> {
        return await this.usuarioService.create(usuario);
    }

    @Put('/atualizar')
    @HttpCode(HttpStatus.OK)
    put(@Body() usuario: Usuario): Promise<Usuario> {
        return this.usuarioService.update(usuario);
    }

}
