import { useState } from "react";

//React DOM

//lógica do componente
const TodoForm = ({addTask}) => {
    //Controle de estado
    const [task, setTask] = useState("");

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