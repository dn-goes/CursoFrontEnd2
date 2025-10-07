// Rotas que precisam passar o ID Params (GET / PATCH / DELETE)

import { deleteEquipamento, getEquipamentoById, updateEquipamento } from "@/controllers/EquipamentoController";
import { NextRequest, NextResponse } from "next/server";

interface Parametro {
  id: string;
}

// GET -> busca equipamento pelo ID
export async function GET({ params }: { params: Parametro }) {
  try {
    const { id } = params;
    const data = await getEquipamentoById(id);
    if (!data) {
      return NextResponse.json({ success: false, error: "Equipamento não encontrado" });
    }
    return NextResponse.json({ success: true, data: data });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}

// PATCH -> atualiza equipamento pelo ID
export async function PATCH({ params }: { params: Parametro }, req: NextRequest) {
  try {
    const { id } = params;
    const body = await req.json();
    const equipamentoAtualizado = await updateEquipamento(id, body);
    if (!equipamentoAtualizado) {
      return NextResponse.json({ success: false, error: "Equipamento não encontrado" });
    }
    return NextResponse.json({ success: true, data: equipamentoAtualizado });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}

// DELETE -> deleta equipamento pelo ID
export async function DELETE({ params }: { params: Parametro }) {
  try {
    const { id } = params;
    await deleteEquipamento(id);
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}
