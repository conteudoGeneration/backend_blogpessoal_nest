# Projeto Blog Pessoal

<br />

<div align="center">
   <img src="https://i.imgur.com/icgjsRQ.png" title="source: imgur.com" width="50%"/>
</div>

<br /><br />

## Diagrama de Classes

```mermaid
classDiagram
class Tema {
  - id : Long
  - descricao : String
  - postagem : List ~Postagem~
  + getAll()
  + getById(Long id)
  + getByDescricao(String descricao)
  + postTema(Tema tema)
  + putTema(Tema tema)
  + deleteTema(Long id)
}
class Postagem {
  - id : Long
  - titulo : String
  - texto: String
  - data: LocalDateTime
  - tema : Tema
  - usuario : Usuario
  + getAll()
  + getById(Long id)
  + getByTitulo(String titulo)
  + postPostagem(Postagem postagem)
  + putPostagem(Postagem postagem)
  + deleteTema(Long id)
}
class Usuario {
  - id : Long
  - nome : String
  - usuario : String
  - senha : String
  - foto : String
  - postagem : List ~Postagem~
  + getAll()
  + getById(Long id)
  + autenticarUsuario(UsuarioLogin usuarioLogin)
  + cadastrarUsuario(Usuario usuario)
  + atualizarUsuario(Usuario usuario)
}
Tema --> Postagem
Usuario --> Postagem
```

<br /><br />

# Referências sobre NestJS

<br />

<a href="https://docs.nestjs.com/" target="_blank">Documentação Oficial do NestJS</a>

<a href="https://typeorm.io/" target="_blank">Documentação Oficial do TypeORM</a>

<a href="https://www.typescriptlang.org/pt/docs/" target="_blank">Documentação Oficial TypeScript</a>

<a href="https://docs.npmjs.com/" target="_blank">Documentação do NPM</a>

<a href="https://www.tutorialspoint.com/typeorm/typeorm_quick_guide.htm" target="_blank">Guia do TypeORM</a>
