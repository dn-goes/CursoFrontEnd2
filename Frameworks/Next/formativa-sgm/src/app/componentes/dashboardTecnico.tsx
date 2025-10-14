"use client";
import { useEffect, useState } from "react";

type Ordem = {
  id: string;
  titulo: string;
  descricao: string;
  status: "pendente" | "em andamento" | "concluída";
  data: string;
};

const STORAGE_KEY = "sgm_ordens";

function uuid() {
  return Math.random().toString(36).substring(2, 9);
}

export default function DashboardTecnico() {
  const [ordens, setOrdens] = useState<Ordem[]>([]);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState<Ordem["status"]>("pendente");
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setOrdens(JSON.parse(raw));
      } catch {
        setOrdens([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ordens));
  }, [ordens]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setErro(null);
    if (!titulo.trim() || !descricao.trim()) {
      setErro("Preencha todos os campos!");
      return;
    }

    const nova: Ordem = {
      id: uuid(),
      titulo: titulo.trim(),
      descricao: descricao.trim(),
      status,
      data: new Date().toLocaleDateString(),
    };
    setOrdens((prev) => [nova, ...prev]);
    setTitulo("");
    setDescricao("");
    setStatus("pendente");
  };

  const handleDelete = (id: string) => {
    if (!confirm("Deseja realmente excluir esta ordem?")) return;
    setOrdens((prev) => prev.filter((o) => o.id !== id));
  };

  const handleStatus = (id: string, novo: Ordem["status"]) => {
    setOrdens((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: novo } : o))
    );
  };

  return (
    <section style={{ padding: 24, fontFamily: "Inter, sans-serif" }}>
      <h2
        style={{
          fontSize: 24,
          fontWeight: 600,
          color: "#0A84FF",
          marginBottom: 20,
        }}
      >
        Gestão de Ordens de Serviço (Técnico)
      </h2>

      <div
        style={{
          display: "flex",
          gap: 20,
          flexWrap: "wrap",
          alignItems: "flex-start",
        }}
      >
        {/* Formulário */}
        <form
          onSubmit={handleCreate}
          style={{
            flex: "0 0 320px",
            background: "#0A84FF10",
            border: "1px solid #0A84FF30",
            padding: 16,
            borderRadius: 10,
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <h3 style={{ color: "#0A84FF", fontWeight: 600, marginBottom: 12 }}>
            Criar nova ordem
          </h3>
          {erro && (
            <div style={{ color: "#E63946", fontSize: 14, marginBottom: 8 }}>
              {erro}
            </div>
          )}
          <div style={{ marginBottom: 10 }}>
            <label style={{ fontSize: 13, color: "#555" }}>Título</label>
            <input
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              style={{
                width: "100%",
                padding: 8,
                border: "1px solid #ccc",
                borderRadius: 6,
                marginTop: 4,
              }}
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <label style={{ fontSize: 13, color: "#555" }}>Descrição</label>
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              style={{
                width: "100%",
                padding: 8,
                border: "1px solid #ccc",
                borderRadius: 6,
                marginTop: 4,
                minHeight: 70,
                resize: "vertical",
              }}
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <label style={{ fontSize: 13, color: "#555" }}>Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as Ordem["status"])}
              style={{
                width: "100%",
                padding: 8,
                border: "1px solid #ccc",
                borderRadius: 6,
                marginTop: 4,
              }}
            >
              <option value="pendente">Pendente</option>
              <option value="em andamento">Em andamento</option>
              <option value="concluída">Concluída</option>
            </select>
          </div>
          <button
            type="submit"
            style={{
              background: "#0A84FF",
              color: "#fff",
              padding: "8px 12px",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              fontWeight: 500,
              width: "100%",
            }}
          >
            Criar ordem
          </button>
        </form>

        {/* Lista */}
        <div style={{ flex: 1, minWidth: 400 }}>
          <h3 style={{ color: "#0A84FF", fontWeight: 600, marginBottom: 10 }}>
            Ordens criadas
          </h3>
          <div
            style={{
              overflowX: "auto",
              border: "1px solid #ddd",
              borderRadius: 8,
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 14,
              }}
            >
              <thead>
                <tr style={{ background: "#f8faff", color: "#0A84FF" }}>
                  <th style={{ textAlign: "left", padding: 8 }}>Título</th>
                  <th style={{ textAlign: "left", padding: 8 }}>Descrição</th>
                  <th style={{ textAlign: "center", padding: 8 }}>Status</th>
                  <th style={{ textAlign: "center", padding: 8 }}>Data</th>
                  <th style={{ textAlign: "center", padding: 8 }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {ordens.map((o) => (
                  <tr key={o.id} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: 8 }}>{o.titulo}</td>
                    <td style={{ padding: 8 }}>{o.descricao}</td>
                    <td style={{ padding: 8, textAlign: "center" }}>
                      <select
                        value={o.status}
                        onChange={(e) =>
                          handleStatus(o.id, e.target.value as Ordem["status"])
                        }
                        style={{
                          padding: 4,
                          borderRadius: 6,
                          border: "1px solid #ccc",
                          background: "#f9f9f9",
                        }}
                      >
                        <option value="pendente">Pendente</option>
                        <option value="em andamento">Em andamento</option>
                        <option value="concluída">Concluída</option>
                      </select>
                    </td>
                    <td style={{ padding: 8, textAlign: "center" }}>{o.data}</td>
                    <td style={{ padding: 8, textAlign: "center" }}>
                      <button
                        onClick={() => handleDelete(o.id)}
                        style={{
                          background: "none",
                          border: "1px solid #E63946",
                          color: "#E63946",
                          padding: "4px 8px",
                          borderRadius: 6,
                          cursor: "pointer",
                        }}
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
                {ordens.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      style={{ textAlign: "center", padding: 12, color: "#777" }}
                    >
                      Nenhuma ordem cadastrada.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
