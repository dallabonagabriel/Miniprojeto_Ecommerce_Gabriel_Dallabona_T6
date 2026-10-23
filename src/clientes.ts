import { Cliente } from './types';

// O sistema deve iniciar com pelo menos 3 clientes pré-cadastrados
let clientes: Cliente[] = [
  { id: 1, nome: "João Silva", email: "joao@email.com" },
  { id: 2, nome: "Maria Santos", email: "maria@email.com" },
  { id: 3, nome: "Ana Costa", email: "ana@email.com" }
];

export function cadastrarCliente(cliente: Cliente): void {
  if (!cliente.nome || cliente.nome.trim() === "") {
    console.log("Erro: O nome do cliente não pode estar vazio.");
    return;
  }
  if (!cliente.email || cliente.email.trim() === "") {
    console.log("Erro: O e-mail do cliente não pode estar vazio.");
    return;
  }
  
  const idExiste = clientes.find(c => c.id === cliente.id);
  if (idExiste) {
    console.log(`Erro: Já existe um cliente com o ID ${cliente.id}.`);
    return;
  }

  const emailExiste = clientes.find(c => c.email === cliente.email);
  if (emailExiste) {
    console.log(`Erro: O e-mail ${cliente.email} já está em uso.`);
    return;
  }
  
  clientes.push(cliente);
  console.log(`Cliente "${cliente.nome}" cadastrado com sucesso!`);
}

export function listarClientes(): Cliente[] {
  return clientes;
}

export function buscarClientePorId(id: number): Cliente | undefined {
  return clientes.find(c => c.id === id);
}