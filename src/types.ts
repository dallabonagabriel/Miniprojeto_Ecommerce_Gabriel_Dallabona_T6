export interface Produto {
  id: number;
  nome: string;
  categoria: string;
  preco: number;
  estoque: number;
}

export interface Cliente {
  id: number;
  nome: string;
  email: string;
}

export interface ItemCarrinho {
  produtoId: number;
  quantidade: number;
}

// Item do pedido guarda o preço da época da compra
export interface ItemPedido {
  produtoId: number;
  quantidade: number;
  precoPraticado: number;
}

export interface Pedido {
  id: number;
  clienteId: number;
  itens: ItemPedido[];
  total: number;
  data: Date;
}