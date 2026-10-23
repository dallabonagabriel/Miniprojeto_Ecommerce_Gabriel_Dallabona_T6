// src/main.ts
import { cadastrarProduto, listarProdutos } from './produtos';
import { cadastrarCliente } from './clientes';
import { adicionarAoCarrinho } from './carrinho';
import { finalizarPedido, listarPedidos } from './pedidos';
import { exibirRelatorioVendas } from './relatorios';

console.log("--- 1. PREPARANDO DADOS ---");
cadastrarProduto({ id: 1, nome: "Teclado Mecânico", categoria: "Informática", preco: 250.00, estoque: 10 });
cadastrarProduto({ id: 2, nome: "Rato Sem Fio", categoria: "Informática", preco: 120.00, estoque: 15 });
cadastrarCliente({ id: 1, nome: "João Silva", email: "joao@email.com" });

console.log("\n--- 2. ENCHENDO O CARRINHO ---");
adicionarAoCarrinho(1, 2); // João quer 2 teclados
adicionarAoCarrinho(2, 1); // João quer 1 rato

console.log("\n--- 3. FINALIZANDO O PEDIDO ---");
// Tentando finalizar para um cliente que não existe (falha esperada)
finalizarPedido(99); 
// Finalizando corretamente para o João (ID 1)
finalizarPedido(1); 

console.log("\n--- 4. CONFERÊNCIA FINAL ---");
console.log("Pedidos Registados:");
// Exibimos o JSON completo usando util.inspect nativo do console para melhor formatação
console.dir(listarPedidos(), { depth: null });

console.log("\nStock Atualizado do Catálogo (Teclado deve ter 8, Rato deve ter 14):");
console.log(listarProdutos().map(p => ({ nome: p.nome, estoque: p.estoque })));

exibirRelatorioVendas();