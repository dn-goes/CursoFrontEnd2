//para modelar ea tarefa vou usar o proprio mongoDB

import { default as mongoose } from "mongoose";

const TarefaSchema = new mongoose.Schema({
    titulo:{
        type: String,
        required:[true, "O titulo da tarefa é obrigatorio"], //personalizo a mensagem de erro
        maxlength:[50, "<50char"],
        trim: true
    },
    concluida:{
        type: Boolean,
        default: false
    },
    criadaEm:{
        type: Date,
        default: Date.now //pega a data na criação da tarefa
    }
});

// Export do Modelo
export default mongoose.models.Tarefa || mongoose.model("Tarefa", TarefaSchema); //se já existir o modelo, usa ele, se não, cria um novo com o schema

