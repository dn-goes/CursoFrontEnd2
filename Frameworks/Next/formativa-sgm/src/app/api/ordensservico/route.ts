// Rotas que não precisam de ID (GET / POST)

import { createOrdemServico, getOrdensServico } from "@/controllers/OrdemServicoController";
import { NextRequest, NextResponse } from "next/server";

// GET -> listar todas as ordens de serviço
export async function GET() {
  try {
    const data = await getOrdensServico(); // busca todas as ordens
    return NextResponse.json({ success: true, data: data });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}

// POST -> criar nova ordem de serviço
export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // corpo da requisição
    const data = await createOrdemServico(body); // cria nova ordem
    return NextResponse.json({ success: true, data: data });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}
