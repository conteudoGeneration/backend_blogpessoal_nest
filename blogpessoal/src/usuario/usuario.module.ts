import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { UsuarioService } from './services/usuario.service';


@Module({
  imports: [TypeOrmModule.forFeature([Usuario])], 
  providers: [UsuarioService],
  controllers: [],
  exports: [UsuarioService],
})
export class UsuarioModule {}