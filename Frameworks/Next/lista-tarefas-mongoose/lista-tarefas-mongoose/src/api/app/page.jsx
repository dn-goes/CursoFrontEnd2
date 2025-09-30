// indicar que a página é componente client-side
"use client";

import { useEffect, useState } from "react";

export default function Home() {
  // setState -> Armazenamento de estado nas variáveis locais
  const [tarefas, setTarefas] = useState([]); // array para armazenamento das tarefas
  const [novaTarefa, setNovaTarefa] = useState(""); // String para adicionar nova tarefa

  // useEffect - carrega as tarefas na montagem do componente
  useEffect(() => {
    fetchTarefas();
  }, []); // [] evita loop infinito

  // pegar todas as tarefas
  const fetchTarefas = async () => {
    try {
      const resposta = await fetch("/api/tarefas");
      const dados = await resposta.json();
      setTarefas(dados.data);
    } catch (err) {
      console.error("Erro ao buscar tarefas:", err);
    }
  };

  // adicionar nova Tarefa
  const addTarefa = async () => {
    if (!novaTarefa.trim()) return; // evita adicionar vazio

    try {
      const resposta = await fetch("/api/tarefas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo: novaTarefa }),
      });

      const dados = await resposta.json();
      setTarefas([...tarefas, dados.data]);
      setNovaTarefa(""); // limpa o campo de nova tarefa
    } catch (err) {
      console.error("Erro ao adicionar tarefa:", err);
    }
  };

  // deletar tarefa
  const deleteTarefa = async (id) => {
    try {
      await fetch(`/api/tarefas/${id}`, {
        method: "DELETE",
      });

      setTarefas(tarefas.filter((tarefa) => tarefa._id !== id));
    } catch (err) {
      console.error("Erro ao deletar tarefa:", err);
    }
  };

  // atualizar tarefa
  const updateTarefa = async (id, concluida) => {
    try {
      const resposta = await fetch(`/api/tarefas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ concluida }),
      });

      const dados = await resposta.json();
      setTarefas(
        tarefas.map((tarefa) =>
          tarefa._id === id ? dados.data : tarefa
        )
      );
    } catch (err) {
      console.error("Erro ao atualizar tarefa:", err);
    }
  };

  // contagem de tarefas
  const contagemTarefasConcluidas = tarefas.filter((t) => t.concluida).length;
  const contagemTotalTarefas = tarefas.length;

  return (
    <div>
      <h1>Lista de Tarefas</h1>

      <input
        type="text"
        value={novaTarefa}
        onChange={(e) => setNovaTarefa(e.target.value)}
        placeholder="Digite uma tarefa..."
      />
      <button onClick={addTarefa}>Adicionar</button>

      <ul>
        {tarefas.map((tarefa) => (
          <li key={tarefa._id}>
            {tarefa.titulo} -{" "}
            {tarefa.concluida ? "Concluída ✅" : "Pendente ⏳"}
            <button onClick={() => updateTarefa(tarefa._id, !tarefa.concluida)}>
              Atualizar
            </button>
            <input
              type="checkbox"
              checked={tarefa.concluida}
              onChange={(e) => updateTarefa(tarefa._id, e.target.checked)}
            />
            <button onClick={() => deleteTarefa(tarefa._id)}>Deletar</button>
          </li>
        ))}
      </ul>

      <div>
        <p>Total de tarefas: {contagemTotalTarefas}</p>
        <p>Tarefas concluídas: {contagemTarefasConcluidas}</p>
      </div>
    </div>
  );
}
