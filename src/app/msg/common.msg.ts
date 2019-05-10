
export class BaseMsg {
    Error: string;
}

export class ItemMsg {
    Id: number;
    Nombre: string;
}
export class SavedME extends BaseMsg {
    Saved: Boolean;
}
export class ListMe<T> extends BaseMsg {
    List: Array<T>;
    constructor() {
        super();
        this.List = [];
    }
}
