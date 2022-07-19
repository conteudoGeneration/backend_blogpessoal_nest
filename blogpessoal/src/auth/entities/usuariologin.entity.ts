import { ApiProperty } from "@nestjs/swagger"

export class UsuarioLogin {

    @ApiProperty({example: "teste"}) 
    public usuario: string

    @ApiProperty() 
    public senha: string

}