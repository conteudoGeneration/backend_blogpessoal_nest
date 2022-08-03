import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt'

@Injectable()
export  class Bcrypt{

    async gerarHash(senha: string): Promise<string>{

        let saltos: number = 10
        return await bcrypt.hash(senha, saltos);

    }

    async compararHash(senhaBanco: string, senhaDigitada: string): Promise<boolean>{

        return await bcrypt.compare(senhaBanco, await this.gerarHash(senhaDigitada));

    }
}