export class EstadoCuentaMsg{
    codigo: number;
    mensaje: string;
    data: DataMsg;
    constructor(){
        this.data=new DataMsg();
    }
}

export class DataMsg{
    participante: string;
    ruc: string;
    puntosCanjeados: number;
    puntosDisponibles: number;
    montoFacturacion: number;
    canjes: CanjeMsg[];
    constructor(){
        this.canjes=[];
    }
}

export class CanjeMsg{
    idPedido: number;
    totalPuntos: number;
    fecha: string;
    detalles: DetalleCompraMsg[];
    constructor(){
        this.detalles=[];
    }
}

export class DetalleCompraMsg{
    idProducto: number;
    cantidad: number;
    puntosUnitario: number;
}
