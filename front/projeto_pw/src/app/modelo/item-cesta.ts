import { Produto } from "./produto";
export class ItemCesta {
    produto : Produto = new Produto();
    qtd : number =1;
    subTotal :number = this.produto.valor;
}
