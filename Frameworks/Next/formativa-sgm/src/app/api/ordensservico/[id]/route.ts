// Rotas que precisam passar o ID Params (GET / PATCH / DELETE)

import { deleteOrdemServico, getOrdemServicoById, updateOrdemServico } from "@/controllers/OrdemServicoController";
import { NextRequest, NextResponse } from "next/server";

interface Parametro {
  id: string;
}

// GET One -> busca uma ordem de serviço pelo ID
export async function GET({ params }: { params: Parametro }) {
  try {
    const { id } = params;
    const data = await getOrdemServicoById(id);
    if (!data) {
      return NextResponse.json({ success: false, error: "Ordem de Serviço não encontrada" });
    }
    return NextResponse.json({ success: true, data: data });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}

// PATCH -> atualiza dados da ordem de serviço
export async function PATCH({ params }: { params: Parametro }, req: NextRequest) {
  try {
    const { id } = params;
    const body = await req.json();
    const ordemAtualizada = await updateOrdemServico(id, body);
    if (!ordemAtualizada) {
      return NextResponse.json({ success: false, error: "Ordem de Serviço não encontrada" });
    }
    return NextResponse.json({ success: true, data: ordemAtualizada });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}

// DELETE -> remove uma ordem de serviço
export async function DELETE({ params }: { params: Parametro }) {
  try {
    const { id } = params;
    await deleteOrdemServico(id);
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}
