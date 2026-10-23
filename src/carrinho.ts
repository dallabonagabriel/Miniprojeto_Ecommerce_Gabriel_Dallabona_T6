import type { ItemCarrinho } from './types';
import { buscarProdutoPorId } from './produtos';

let itensCarrinho: ItemCarrinho[] = [];

export function adicionarAoCarrinho(produtoId: number, quantidade: number): void {
  if (quantidade <= 0) {
    console.log(`Erro: A quantidade deve ser maior que zero.`);
    return;
  }

  const produto = buscarProdutoPorId(produtoId);
  if (!produto) {
    console.log(`Erro: Produto com ID ${produtoId} não existe.`);
    return;
  }

  const itemExistente = itensCarrinho.find(item => item.produtoId === produtoId);
  const quantidadeDesejada = itemExistente ? itemExistente.quantidade + quantidade : quantidade;

  if (quantidadeDesejada > produto.estoque) {
    console.log(`Erro: Quantidade solicitada (${quantidadeDesejada}) excede o stock disponível (${produto.estoque}) para o produto "${produto.nome}".`);
    return;
  }

  if (itemExistente) {
    itemExistente.quantidade += quantidade;
    console.log(`Quantidade do produto "${produto.nome}" atualizada no carrinho.`);
  } else {
    itensCarrinho.push({ produtoId, quantidade });
    console.log(`Produto "${produto.nome}" adicionado ao carrinho!`);
  }
}

export function removerDoCarrinho(produtoId: number): void {
  const tamanhoInicial = itensCarrinho.length;
  itensCarrinho = itensCarrinho.filter(item => item.produtoId !== produtoId);
  
  if (itensCarrinho.length < tamanhoInicial) {
    console.log(`Produto ID ${produtoId} removido do carrinho.`);
  } else {
    console.log(`Erro: Produto ID ${produtoId} não encontrado no carrinho.`);
  }
}

export function listarCarrinho(): ItemCarrinho[] {
  return itensCarrinho;
}

export function limparCarrinho(): void {
  itensCarrinho = [];
}

export function alterarQuantidade(produtoId: number, novaQuantidade: number): void {
  const item = itensCarrinho.find(i => i.produtoId === produtoId);
  if (!item) {
    console.log(`Erro: Produto ID ${produtoId} não está no carrinho.`);
    return;
  }
  if (novaQuantidade <= 0) {
    console.log("Erro: A quantidade deve ser maior que zero.");
    return;
  }
  const produto = buscarProdutoPorId(produtoId);
  if (!produto) {
    console.log(`Erro: Produto com ID ${produtoId} não existe mais no catálogo.`);
    return;
  }
  if (novaQuantidade > produto.estoque) {
    console.log(`Erro: Quantidade solicitada (${novaQuantidade}) excede o estoque disponível (${produto.estoque}).`);
    return;
  }
  item.quantidade = novaQuantidade;
  console.log(`Quantidade do produto "${produto.nome}" alterada para ${novaQuantidade}.`);
}

// Subtotal = preço unitário x quantidade
export function calcularSubtotal(item: ItemCarrinho): number {
  const produto = buscarProdutoPorId(item.produtoId);
  return produto ? produto.preco * item.quantidade : 0;
}

export function calcularTotalCarrinho(): number {
  return itensCarrinho.reduce((soma, item) => soma + calcularSubtotal(item), 0);
}

export function exibirCarrinho(): void {
  console.log("Itens do carrinho:");
  for (const item of itensCarrinho) {
    const produto = buscarProdutoPorId(item.produtoId);
    const nome = produto ? produto.nome : `Produto ${item.produtoId}`;
    console.log(`  ${item.quantidade}x ${nome} -> subtotal R$ ${calcularSubtotal(item).toFixed(2)}`);
  }
  console.log(`  TOTAL: R$ ${calcularTotalCarrinho().toFixed(2)}`);
}