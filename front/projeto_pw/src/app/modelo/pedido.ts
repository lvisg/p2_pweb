import { Cliente } from "./cliente";
import { ItemCesta } from "./item-cesta";

export class Pedido {
  public codigo: number | null = null;
  public cliente: Cliente;
  public status: string;
  public total: number;
  public metodoPagamento: string;
  public data: string = '';
  public produtos: ItemCesta[] = [];
  constructor(cliente: Cliente, total: number, metodoPagamento: string, produtos: ItemCesta[]) {
    this.cliente = cliente;
    this.total = total;
    this.metodoPagamento = metodoPagamento;
    this.status = 'PENDENTE';
    this.produtos = produtos;
  }
}
