// src/carrinho.ts
import { ItemCarrinho } from './types';
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

export function calcularTotalCarrinho(): number {
  let total = 0;
  for (const item of itensCarrinho) {
    const produto = buscarProdutoPorId(item.produtoId);
    if (produto) {
      // O subtotal é calculado multiplicando o preço pela quantidade[cite: 1]
      const subtotal = produto.preco * item.quantidade;
      total += subtotal;
    }
  }
  return total;
}