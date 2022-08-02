import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt'

@Injectable()
export  class Bcrypt{

    async criptografarSenha(senha: string): Promise<string>{

        return await bcrypt.hash(senha, 10);

    }

    async compararSenha(senhaBanco: string, senhaDigitada: string): Promise<boolean>{

        return await bcrypt.compare(senhaBanco, await this.criptografarSenha(senhaDigitada));

    }
}