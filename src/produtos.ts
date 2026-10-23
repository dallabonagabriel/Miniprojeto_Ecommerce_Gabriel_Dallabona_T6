import type { Produto } from './types';

let produtos: Produto[] = [];

export function cadastrarProduto(produto: Produto): void {
  if (!produto.nome || produto.nome.trim() === "") {
    console.log("Erro: O nome do produto não pode estar vazio.");
    return;
  }
  if (produto.preco <= 0) {
    console.log("Erro: O preço deve ser maior que zero.");
    return;
  }
  if (produto.estoque < 0) {
    console.log("Erro: O estoque não pode ser negativo.");
    return;
  }

  const idExiste = produtos.find(p => p.id === produto.id);
  if (idExiste) {
    console.log(`Erro: Já existe um produto com o ID ${produto.id}.`);
    return;
  }

  produtos.push(produto);
  console.log(`Produto "${produto.nome}" cadastrado com sucesso!`);
}

export function listarProdutos(): Produto[] {
  return produtos;
}

export function buscarProdutoPorId(id: number): Produto | undefined {
  return produtos.find(p => p.id === id);
}

export function buscarProdutosPorNome(nome: string): Produto[] {
  return produtos.filter(p => p.nome.toLowerCase().includes(nome.toLowerCase()));
}

export function filtrarProdutosPorCategoria(categoria: string): Produto[] {
  return produtos.filter(p => p.categoria.toLowerCase() === categoria.toLowerCase());
}

export function atualizarProduto(id: number, dados: Partial<Omit<Produto, "id">>): void {
  const produto = produtos.find(p => p.id === id);
  if (!produto) {
    console.log(`Erro: Produto ID ${id} não encontrado.`);
    return;
  }

  // Monta a versão atualizada e valida ANTES de gravar
  const atualizado: Produto = { ...produto, ...dados };
  if (atualizado.nome.trim() === "") {
    console.log("Erro: O nome do produto não pode estar vazio.");
    return;
  }
  if (atualizado.preco <= 0) {
    console.log("Erro: O preço deve ser maior que zero.");
    return;
  }
  if (atualizado.estoque < 0) {
    console.log("Erro: O estoque não pode ser negativo.");
    return;
  }

  Object.assign(produto, atualizado);
  console.log(`Produto ID ${id} atualizado.`);
}

export function removerProduto(id: number): void {
  const index = produtos.findIndex(p => p.id === id);
  if (index !== -1) {
    produtos.splice(index, 1);
    console.log(`Produto ID ${id} removido.`);
  } else {
    console.log(`Erro: Produto ID ${id} não encontrado.`);
  }
}