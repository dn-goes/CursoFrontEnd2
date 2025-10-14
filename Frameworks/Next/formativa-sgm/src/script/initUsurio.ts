//script para criação de um usuário admin par o site

import Usuario from "@/models/Usuario";
import connectMongo from "@/services/mongodb"

export const criarAdmin =  async () =>{
    await connectMongo();
    const adminEmail = "admin@admin.com";
    //verificar se usuario já existe
    const adminExiste = await Usuario.findOne({email:adminEmail});
    //se não achado
    if(!adminExiste){
        const admin = new Usuario({
            nome: "Administrador",
            email: adminEmail,
            senha: "admin123",
            funcao: "Admin"
        });
        await admin.save();
        console.log("Usuário Admin criado com sucesso");
    }else{
        console.log("Usuário Admin já existe");
    }
}

criarAdmin().catch((error) => console.log("Erro ao criar o usuário Admin:", error));