//rotas que não precisam de ID ( GET / POST)

import { createUsuario, getUsuarios } from "@/controllers/UsuarioController";
import { NextRequest, NextResponse } from "next/server";


// http -> request
export async function GET(){
    try {
        const data = await getUsuarios(); //busca todos os dados da coleção
        return NextResponse.json({success:true, data:data});
    } catch (error) {
        return NextResponse.json({success:false, error:error})
    }
}

export async function POST(req: NextRequest) {
    try { //pegar o corpo da requisição
        const body = await req.json();//pegar o corpo da requisição
        //chamar a função do controller
        const data = await createUsuario(body); //chamar a função do controller
        return NextResponse.json({success:true, data:data});//retornar a resposta
    } catch (error) {// tratar erro
        return NextResponse.json({success:false, error:error})//retornar a resposta de erro
    }
}