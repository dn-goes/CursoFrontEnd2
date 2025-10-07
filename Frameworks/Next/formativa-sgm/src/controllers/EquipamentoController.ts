// Controller de Equipamentos
// Responsável por gerenciar todas as operações CRUD (Create, Read, Update, Delete)

import Equipamento, { IEquipamento } from "@/models/Equipamento";
import connectMongo from "@/services/mongodb";

// Listar todos os equipamentos
export const getEquipamentos = async () => {
  await connectMongo(); // Conecta ao banco de dados
  const equipamentos = await Equipamento.find(); // Retorna todos os documentos da coleção
  return equipamentos;
};

// Listar um equipamento por ID
export const getEquipamentoById = async (id: string) => {
  await connectMongo();
  const equipamento = await Equipamento.findById(id); // Busca pelo ID
  return equipamento;
};

// Criar um novo equipamento
export const createEquipamento = async (data: Partial<IEquipamento>) => {
  await connectMongo();
  const novoEquipamento = new Equipamento(data); // Cria uma nova instância com os dados
  const equipamentoSalvo = await novoEquipamento.save(); // Salva no MongoDB
  return equipamentoSalvo;
};

// Atualizar um equipamento existente
export const updateEquipamento = async (id: string, data: Partial<IEquipamento>) => {
  await connectMongo();
  const equipamentoAtualizado = await Equipamento.findByIdAndUpdate(id, data, {
    new: true, // Retorna o documento atualizado
  });
  return equipamentoAtualizado;
};

// Deletar um equipamento
export const deleteEquipamento = async (id: string) => {
  await connectMongo();
  const equipamentoRemovido = await Equipamento.findByIdAndDelete(id);
  return equipamentoRemovido;
};
