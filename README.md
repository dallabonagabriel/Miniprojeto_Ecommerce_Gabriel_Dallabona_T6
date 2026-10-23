# Sistema de Gerenciamento de E-commerce

**Aluno: Gabriel Dallabona 
**Turma:** Back-End Node T6

## Objetivo
O objetivo desta aplicação é gerir as operações básicas de uma pequena loja virtual. O sistema permite cadastrar produtos, controlar o stock, gerir clientes, montar carrinhos de compras e registrar pedidos, mantendo as informações consistentes.

## Funcionalidades Implementadas
* **Catálogo de Produtos:** Cadastro, listagem, busca por ID e nome, filtro por categoria, atualização e remoção.
* **Gestão de Clientes:** Cadastro e busca de clientes com validação de dados únicos (ID e e-mail).
* **Carrinho de Compras:** Adição, remoção e atualização de itens, com cálculo automático de subtotais e validação de stock disponível.
* **Pedidos:** Finalização de compras, preservação do preço histórico no momento da venda, cálculo do valor total e atualização automática do stock do catálogo.
* **Relatórios:** Apresentação de métricas consolidadas (total de pedidos e receita gerada).

## Tecnologias Utilizadas
* TypeScript
* Node.js

## Estrutura de Ficheiros
O projeto está organizado na seguinte estrutura:
* `src/`: Contém todo o código-fonte TypeScript.
  * `types.ts`: Definição das interfaces (Produto, Cliente, ItemCarrinho, Pedido).
  * `produtos.ts`: Lógica e dados do catálogo.
  * `clientes.ts`: Lógica e dados dos clientes.
  * `carrinho.ts`: Operações de gestão da compra atual.
  * `pedidos.ts`: Finalização de compras e histórico.
  * `relatorios.ts`: Funções de consolidação de dados.
  * `main.ts`: Ponto de entrada que demonstra o fluxo completo da aplicação.
* `dist/`: Pasta gerada automaticamente contendo o código compilado para JavaScript.

## Instruções de Compilação e Execução
Certifique-se de que tem o Node.js instalado. No terminal, navegue até à pasta raiz do projeto e execute:

1. Instalar as dependências:
   ```bash
   npm install