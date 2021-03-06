import { Injectable } from '@angular/core';

@Injectable()
export class StringUtils {
    static replace(texto: string, textoBusqueda: string, textoRemplazo: string): string {
        if (texto && texto !== '') {
            const re = new RegExp(textoBusqueda);
            return texto.replace(re, textoRemplazo);
        }
        return null;
    }
    static quitarTildes(me: string): string {
        let ms = this.replace(me, 'á', 'a');
        ms = this.replace(ms, 'é', 'e');
        ms = this.replace(ms, 'í', 'i');
        ms = this.replace(ms, 'ó', 'o');
        ms = this.replace(ms, 'ú', 'u');
        ms = this.replace(ms, 'ñ', 'n');
        ms = this.replace(ms, 'Á', 'A');
        ms = this.replace(ms, 'É', 'E');
        ms = this.replace(ms, 'Í', 'I');
        ms = this.replace(ms, 'Ó', 'O');
        ms = this.replace(ms, 'Ú', 'U');
        ms = this.replace(ms, 'Ñ', 'N');
        return ms;
    }
    static getTwoDigitNumber(me: number) {
        if ( me < 10) {
            return '0' + me;
        }
        return me;
    }
}
