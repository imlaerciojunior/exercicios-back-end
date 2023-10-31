export class Heroes{
    constructor(
        private id: string,
        private name: string,
        private titulo: string,       
    ) {}

    public getId(): string{
        return this.id
    }

    public setId(newValue: string): void{
        this.id = newValue
    }

    public getName(): string{
        return this.name
    }

    public setName(newValue: string): void{
        this.name = newValue
    }

    public getTitulo(): string{
        return this.titulo
    }

    public setTitulo(newValue: string): void{
        this.titulo = newValue
    }
}
