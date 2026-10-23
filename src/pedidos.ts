import { Pedido } from './types';
import { buscarClientePorId } from './clientes';
import { buscarProdutoPorId, atualizarProduto } from './produtos';
import { listarCarrinho, calcularTotalCarrinho, limparCarrinho } from './carrinho';

let pedidos: Pedido[] = [];
let contadorIdPedido = 1;

export function finalizarPedido(clienteId: number): void {
  const cliente = buscarClientePorId(clienteId);
  if (!cliente) {
    console.log(`Erro: Cliente com ID ${clienteId} inexistente. Pedido cancelado.`);
    return;
  }

  const itensCarrinho = listarCarrinho();
  if (itensCarrinho.length === 0) {
    console.log("Erro: O carrinho está vazio. Não é possível finalizar um pedido sem itens.");
    return;
  }

  // Validação de segurança: garantir que ainda há stock antes de processar qualquer desconto
  for (const item of itensCarrinho) {
    const produto = buscarProdutoPorId(item.produtoId);
    if (!produto || produto.estoque < item.quantidade) {
      console.log(`Erro: Falha na validação final. Stock insuficiente para o produto ID ${item.produtoId}.`);
      return;
    }
  }

  // Montar o histórico do pedido guardando o preço atual
  const itensComprados = itensCarrinho.map(item => {
    const produto = buscarProdutoPorId(item.produtoId)!;
    return {
      produtoId: item.produtoId,
      quantidade: item.quantidade,
      precoPraticado: produto.preco
    };
  });

  const totalCompra = calcularTotalCarrinho();

  const novoPedido: Pedido = {
    id: contadorIdPedido++,
    clienteId,
    itens: itensComprados,
    total: totalCompra,
    data: new Date()
  };

  // Guardar o pedido
  pedidos.push(novoPedido);

  // Descontar do stock oficial do catálogo
  for (const item of itensCarrinho) {
    const produto = buscarProdutoPorId(item.produtoId)!;
    atualizarProduto(produto.id, { estoque: produto.estoque - item.quantidade });
  }

  // Limpar o carrinho para o próximo cliente
  limparCarrinho();
  
  console.log(`\nSUCESSO: Pedido #${novoPedido.id} finalizado para o cliente "${cliente.nome}". Total: R$ ${totalCompra.toFixed(2)}`);
}

export function listarPedidos(): Pedido[] {
  return pedidos;
}

export function consultarPedidosPorCliente(clienteId: number): Pedido[] {
  return pedidos.filter(p => p.clienteId === clienteId);
}