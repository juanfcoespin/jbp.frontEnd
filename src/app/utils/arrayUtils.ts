import { Injectable } from '@angular/core';
import { StringUtils } from './stringUtils';

@Injectable()
export class ArrayUtils {
    static contieneTokens(texto: string, matrixToken: string[]) {
        if (texto) {
            texto = texto.toLocaleLowerCase();
            texto = StringUtils.quitarTildes(texto);
        }
        for (let token of matrixToken) {
            if(token) {
                token = token.toLowerCase();
                token = StringUtils.quitarTildes(token);
            }
            if (!texto.includes(token)) {
                return false;
            }
        }
        return true;
    }
}
