import { Controller, Get, Post, Put, HttpCode, HttpStatus, Param, Body } from "@nestjs/common";
import { Postagem } from "../entities/postagem.entity";
import { PostagemService } from "../services/postagem.service";

@Controller("/postagens")
export class PostagemController {
  constructor(private readonly service: PostagemService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Postagem[]> {
    return this.service.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id') id: number): Promise<Postagem> {
    return this.service.findById(id);
  }

  @Get('/titulo/:titulo')
  @HttpCode(HttpStatus.OK)
  findByTitulo(@Param('titulo') titulo: string): Promise<Postagem[]> {
    return this.service.findByTitulo(titulo);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  post(@Body() post: Postagem): Promise<Postagem> {
    return this.service.create(post);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  put(@Body() post: Postagem): Promise<Postagem> {
    return this.service.update(post);
  }

}
