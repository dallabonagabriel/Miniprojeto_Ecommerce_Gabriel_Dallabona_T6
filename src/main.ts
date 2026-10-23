import {
  cadastrarProduto, listarProdutos, buscarProdutoPorId, buscarProdutosPorNome,
  filtrarProdutosPorCategoria, atualizarProduto, removerProduto
} from './produtos';
import { cadastrarCliente, listarClientes, buscarClientePorId } from './clientes';
import { adicionarAoCarrinho, alterarQuantidade, removerDoCarrinho, exibirCarrinho } from './carrinho';
import { finalizarPedido, listarPedidos, consultarPedidosPorCliente } from './pedidos';
import { exibirRelatorioVendas } from './relatorios';

console.log("=== 1. PRODUTOS ===");
cadastrarProduto({ id: 1, nome: "Teclado Mecânico", categoria: "Informática", preco: 250.0, estoque: 10 });
cadastrarProduto({ id: 2, nome: "Mouse Sem Fio", categoria: "Informática", preco: 120.0, estoque: 15 });
cadastrarProduto({ id: 3, nome: "Caneca", categoria: "Casa", preco: 30.0, estoque: 5 });
console.log("Todos:", listarProdutos());
console.log("Por ID (2):", buscarProdutoPorId(2));
console.log('Por nome ("tecl"):', buscarProdutosPorNome("tecl"));
console.log('Categoria "Casa":', filtrarProdutosPorCategoria("Casa"));
atualizarProduto(3, { preco: 35.0 });
removerProduto(3);

console.log("\n=== 2. CLIENTES ===");
cadastrarCliente({ id: 4, nome: "Carlos Lima", email: "carlos@email.com" });
console.log("Clientes:", listarClientes());
console.log("Cliente ID 1:", buscarClientePorId(1));

console.log("\n=== 3. CARRINHO ===");
adicionarAoCarrinho(1, 2);
adicionarAoCarrinho(2, 1);
adicionarAoCarrinho(2, 2); // mesmo produto: soma na linha existente (total 3)
alterarQuantidade(2, 1);
adicionarAoCarrinho(3, 1); // produto removido acima
removerDoCarrinho(3);
exibirCarrinho();

console.log("\n=== 4. SITUAÇÕES INVÁLIDAS ===");
cadastrarProduto({ id: 10, nome: "Produto Ruim", categoria: "Teste", preco: -5, estoque: 1 }); // preço negativo
adicionarAoCarrinho(1, 999);                                                                  // acima do estoque
finalizarPedido(99);                                                                          // cliente inexistente

console.log("\n=== 5. PEDIDOS ===");
finalizarPedido(1);
finalizarPedido(1); // carrinho agora vazio -> erro esperado
console.log("Pedidos do cliente 1:");
console.dir(consultarPedidosPorCliente(1), { depth: null });
console.log("Todos os pedidos:", listarPedidos().length);

console.log("\n=== 6. ESTOQUE APÓS A COMPRA (Teclado 8, Mouse 14) ===");
console.log(listarProdutos().map(p => ({ nome: p.nome, estoque: p.estoque })));

exibirRelatorioVendas();