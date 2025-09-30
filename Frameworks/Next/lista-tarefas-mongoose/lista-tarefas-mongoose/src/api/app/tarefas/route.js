// rotas GET e POST

import Tarefa from "@/api/tarefas/[id]/route.js"; // ajuste conforme nome do arquivo (Tarefa.js ou tarefas.js)
import connectMongo from "@/services/mongodb";
import { NextResponse } from "next/server";

// GET - buscar todas as tarefas
export async function GET() {
  try {
    await connectMongo(); // conecta com o mongoDB
    const tarefas = await Tarefa.find({}); // retorna todas as tarefas
    return NextResponse.json({ data: tarefas }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar as tarefas" },
      { status: 500 }
    );
  }
}

// POST - criar nova tarefa
export async function POST(request) {
  try {
    await connectMongo();
    const data = await request.json(); // transforma o corpo da requisição em JSON
    const tarefa = await Tarefa.create(data); // cria a tarefa no banco
    return NextResponse.json({ data: tarefa }, { status: 201 }); // retorna a tarefa criada
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar a tarefa" },
      { status: 500 }
    );
  }
}
