import { Body, Controller, Get, HttpCode, HttpStatus, Put, UseGuards } from "@nestjs/common";
import { Usuario } from "../entities/usuario.entity";
import { UsuarioService } from "../services/usuario.service";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller("/usuarios")
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) { }

  @Get('/all')
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Usuario[]> {
    return this.usuarioService.findAll();
  }

  @Put('/atualizar')
  @HttpCode(HttpStatus.OK)
  put(@Body() post: Usuario): Promise<Usuario> {
    return this.usuarioService.update(post);
  }

}
