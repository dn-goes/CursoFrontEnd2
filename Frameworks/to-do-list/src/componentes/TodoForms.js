import "./TodoForms.css"
//formulário para inserir uma tarefa 
import { useState } from "react";

//React DOM

//lógica do componente
// arrow function
const TodoForm = ({addTask}) => {
    //Controle de estado
    // vetor para armazenamento da dados do formulário
    const [task, setTask] = useState("");
    //useState => usa a memoria local do navegador
    //para armazenar

    //Função para adicionar tarefa
    const handleSubmit = (e) => {
        //Prevenir o comportamento padrão do formulário
        e.preventDefault();
        //Verificar se não está vazio
        if(task.trim() !== ""){
            addTask(task); //Adiciona Tarefa no Vetor
            setTask(""); // Limpa o campo
        }
    };
    //Renderização do Componente
    return(
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Digite uma tarefa" value={task}
            onChange={(e) => setTask(e.target.value)}/>
            <button type="submit">Adicionar</button>
        </form>
    );
};

export default TodoForm;