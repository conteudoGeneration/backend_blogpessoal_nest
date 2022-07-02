import { Controller, Get, Post, Put, Delete, HttpCode, HttpStatus, Param, Body, HttpException } from "@nestjs/common";
import { Tema } from "../entities/tema.entity";
import { TemaService } from "../services/tema.service";

@Controller("/temas")
export class TemaController {
  constructor(private readonly temaService: TemaService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Tema[]> {
    return this.temaService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id') id: number): Promise<Tema> {
    return this.temaService.findOneById(id);
  }

  @Get('/descricao/:descricao')
  @HttpCode(HttpStatus.OK)
  findByTitulo(@Param('descricao') descricao: string): Promise<Tema[]> {
    return this.temaService.findByDescricao(descricao);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  post(@Body() tema: Tema): Promise<Tema> {
    return this.temaService.create(tema);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  put(@Body() tema: Tema): Promise<Tema> {
    return this.temaService.update(tema);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: number) {
    const resultadoDelete = this.temaService.delete(id);
    
    if (resultadoDelete === undefined)
        throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);
    else
        return resultadoDelete;

  }

}
