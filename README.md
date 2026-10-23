# Sistema de Gerenciamento de E-commerce

**Aluno:** Gabriel Dallabona
**Turma:** Back-End Node T6

## Objetivo

Gerenciar as operações básicas de uma pequena loja virtual: cadastrar produtos e clientes, montar o carrinho, finalizar pedidos controlando o estoque e consultar um relatório de vendas. Os dados ficam em memória durante a execução.

## Funcionalidades implementadas

- **Produtos:** cadastrar, listar, buscar por ID, buscar por parte do nome, filtrar por categoria, atualizar e remover.
- **Clientes:** cadastrar, listar e buscar por ID (3 clientes iniciais).
- **Carrinho:** adicionar, remover, alterar quantidade, listar itens, subtotal por item e total.
- **Pedidos:** finalizar compra, consultar todos os pedidos e os pedidos de um cliente.
- **Relatórios:** total de pedidos e receita total.

## Tecnologias utilizadas

- TypeScript
- Node.js

## Estrutura dos arquivos

```
src/
  types.ts       interfaces Produto, Cliente, ItemCarrinho, ItemPedido e Pedido
  produtos.ts    catálogo de produtos
  clientes.ts    cadastro e consulta de clientes
  carrinho.ts    operações e cálculos do carrinho
  pedidos.ts     finalização e consulta de pedidos
  relatorios.ts  relatório consolidado de vendas
  main.ts        demonstração do fluxo completo
dist/            JavaScript compilado (gerado pelo tsc)
```

## Compilação e execução

Requer Node.js instalado. Na raiz do projeto:

```bash
npm install     # instala as dependências
npm run build   # compila src/ para dist/ (tsc)
npm start       # executa node dist/main.js
```

## Exemplos das principais operações

```ts
cadastrarProduto({ id: 1, nome: "Teclado", categoria: "Informática", preco: 250, estoque: 10 });
buscarProdutosPorNome("tecl");      // localiza por parte do nome
adicionarAoCarrinho(1, 2);          // 2 unidades do produto 1
alterarQuantidade(1, 3);            // muda a quantidade para 3
exibirCarrinho();                   // itens, subtotais e total
finalizarPedido(1);                 // fecha o pedido do cliente 1
consultarPedidosPorCliente(1);      // pedidos do cliente 1
```

## Regras de negócio implementadas

- ID de produto único; nome preenchido; preço maior que zero; estoque não negativo (também validados na atualização).
- ID e e-mail de cliente únicos; nome e e-mail obrigatórios.
- Quantidade no carrinho maior que zero, produto existente e dentro do estoque disponível.
- Adicionar um produto já presente no carrinho soma na mesma linha, sem duplicar.
- Subtotal = preço × quantidade; total = soma dos subtotais.
- Pedido exige cliente existente e carrinho com itens.
- O estoque é validado para todos os itens antes de registrar o pedido; só depois é descontado, então não há registro parcial.
- O pedido guarda o preço praticado na compra, e mudanças futuras no catálogo não alteram pedidos antigos.
- Remover um produto do catálogo não altera pedidos já registrados. Se ele ainda estiver no carrinho, a finalização é bloqueada.

## Limitações conhecidas

- Dados apenas em memória: tudo se perde ao encerrar a execução.
- Existe um único carrinho global, não um por cliente.
- Não há autenticação, pagamento, frete ou descontos (fora do escopo).
- O e-mail é validado apenas quanto a estar preenchido e ser único, não quanto ao formato.
- Não há testes automatizados; a demonstração está em `main.ts`.