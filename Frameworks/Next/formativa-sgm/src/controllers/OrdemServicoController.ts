// Controller de Ordens de Serviço
// Responsável por todas as operações CRUD (Create, Read, Update, Delete)

import OrdemServico, { IOrdemServico } from "@/models/OrdemServico";
import connectMongo from "@/services/mongodb";

// listar todas as ordens de serviço    
export const getOrdensServico = async () => {
  await connectMongo(); // Conecta ao MongoDB
  const ordens = await OrdemServico.find(); // Busca todas as ordens
  return ordens;
};

// pegar uma ordem específica
export const getOrdemServicoById = async (id: string) => {
  await connectMongo();
  const ordem = await OrdemServico.findById(id); // Busca uma ordem específica
  return ordem;
};

// criar uma nova ordem de serviço
export const createOrdemServico = async (data: Partial<IOrdemServico>) => {
  await connectMongo();
  const novaOrdem = new OrdemServico(data); // Cria uma nova instância
  const ordemSalva = await novaOrdem.save(); // Salva no banco
  return ordemSalva;
};

// atualizar uma ordem existente
export const updateOrdemServico = async (id: string, data: Partial<IOrdemServico>) => {
  await connectMongo();
  const ordemAtualizada = await OrdemServico.findByIdAndUpdate(id, data, {
    new: true, // Retorna o documento atualizado
  });
  return ordemAtualizada;
};

// deletar uma ordem
export const deleteOrdemServico = async (id: string) => {
  await connectMongo();
  const ordemRemovida = await OrdemServico.findByIdAndDelete(id);
  return ordemRemovida;
};
