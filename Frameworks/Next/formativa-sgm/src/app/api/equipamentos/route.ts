// Rotas que não precisam de ID (GET / POST)

import { createEquipamento, getEquipamentos } from "@/controllers/EquipamentoController";
import { NextRequest, NextResponse } from "next/server";

// GET -> listar todos os equipamentos
export async function GET() {
  try {
    const data = await getEquipamentos(); // busca todos os equipamentos
    return NextResponse.json({ success: true, data: data });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}

// POST -> criar novo equipamento
export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // pegar corpo da requisição
    const data = await createEquipamento(body); // cria novo equipamento
    return NextResponse.json({ success: true, data: data });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}
