// src/relatorios.ts
import { listarPedidos } from './pedidos';

export function exibirRelatorioVendas(): void {
  const pedidos = listarPedidos();
  const totalPedidos = pedidos.length;
  
  // A função reduce vai percorrer os pedidos e somar o valor total das vendas
  const receitaTotal = pedidos.reduce((soma, pedido) => soma + pedido.total, 0);

  console.log("\n--- RELATÓRIO CONSOLIDADO DE VENDAS ---");
  console.log(`Total de Pedidos Realizados: ${totalPedidos}`);
  console.log(`Receita Total Gerada: R$ ${receitaTotal.toFixed(2)}`);
  console.log("---------------------------------------");
}