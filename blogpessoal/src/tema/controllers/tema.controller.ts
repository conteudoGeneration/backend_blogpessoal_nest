import { Controller, Get, Post, Put, Delete, HttpCode, HttpStatus, Param, Body, HttpException, ParseIntPipe } from "@nestjs/common";
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
  findById(@Param('id', ParseIntPipe) id: number): Promise<Tema> {
    return this.temaService.findById(id);
  }

  @Get('/titulo/:titulo')
  @HttpCode(HttpStatus.OK)
  findByTitulo(@Param('titulo') titulo: string): Promise<Tema[]> {
    return this.temaService.findByTitulo(titulo);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() Tema: Tema): Promise<Tema> {
    return this.temaService.create(Tema);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() Tema: Tema): Promise<Tema> {
    return this.temaService.update(Tema);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number){
    return this.temaService.delete(id);
  }

}
