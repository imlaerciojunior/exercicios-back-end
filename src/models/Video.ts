export class Video {
    constructor(
        private id: string,
        private titulo: string,
        private duracao: number,
        private data_update: string
    ) {}

    public getId(): string{
        return this.id
    }

    public setId(newValue: string): void{
        this.id = newValue
    }

    public getTitulo(): string{
        return this.titulo
    }

    public setTitulo(newValue: string): void{
        this.titulo = newValue
    }

    public getDuracao(): number{
        return this.duracao
    }

    public setDuracao(newValue: number): void{
        this.duracao = newValue
    }

    public getDataUpdate(): string{
        return this.data_update
    }

    public setDataUpdate(newValue: string): void{
        this.data_update = newValue
    }

}