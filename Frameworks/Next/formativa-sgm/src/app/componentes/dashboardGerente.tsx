"use client";
import { useEffect, useState } from "react";

type Ordem = {
  id: string;
  titulo: string;
  descricao: string;
  status: "pendente" | "em andamento" | "concluída";
  data: string;
};

type Equipamento = {
  id: string;
  nome: string;
  tipo: string;
  status: "ativo" | "manutenção" | "inativo";
};

const STORAGE_ORDENS = "sgm_ordens";
const STORAGE_EQUIPS = "sgm_equipamentos";

function uuid() {
  return Math.random().toString(36).substring(2, 9);
}

export default function DashboardGerente() {
  const [ordens, setOrdens] = useState<Ordem[]>([]);
  const [equipamentos, setEquipamentos] = useState<Equipamento[]>([]);
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [statusEq, setStatusEq] = useState<Equipamento["status"]>("ativo");
  const [erro, setErro] = useState<string | null>(null);

  // carregar localStorage
  useEffect(() => {
    const rawOrd = localStorage.getItem(STORAGE_ORDENS);
    const rawEq = localStorage.getItem(STORAGE_EQUIPS);

    if (rawOrd) {
      try {
        setOrdens(JSON.parse(rawOrd));
      } catch {
        setOrdens([]);
      }
    }
    if (rawEq) {
      try {
        setEquipamentos(JSON.parse(rawEq));
      } catch {
        setEquipamentos([]);
      }
    }
  }, []);

  // salvar no localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_ORDENS, JSON.stringify(ordens));
  }, [ordens]);

  useEffect(() => {
    localStorage.setItem(STORAGE_EQUIPS, JSON.stringify(equipamentos));
  }, [equipamentos]);

  // CRUD Equipamentos
  const handleAddEquipamento = (e: React.FormEvent) => {
    e.preventDefault();
    setErro(null);
    if (!nome.trim() || !tipo.trim()) {
      setErro("Preencha todos os campos!");
      return;
    }
    const novo: Equipamento = {
      id: uuid(),
      nome: nome.trim(),
      tipo: tipo.trim(),
      status: statusEq,
    };
    setEquipamentos((prev) => [novo, ...prev]);
    setNome("");
    setTipo("");
    setStatusEq("ativo");
  };

  const handleDeleteEquip = (id: string) => {
    if (!confirm("Excluir este equipamento?")) return;
    setEquipamentos((prev) => prev.filter((e) => e.id !== id));
  };

  const handleStatusOrdem = (id: string, novo: Ordem["status"]) => {
    setOrdens((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: novo } : o))
    );
  };

  const handleStatusEquip = (id: string, novo: Equipamento["status"]) => {
    setEquipamentos((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: novo } : e))
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
        Painel de Gerência — Ordens e Equipamentos
      </h2>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
        {/* BLOCO 1 — ORDENS */}
        <div
          style={{
            flex: 1,
            minWidth: 420,
            background: "#0A84FF10",
            border: "1px solid #0A84FF30",
            borderRadius: 10,
            padding: 16,
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <h3 style={{ color: "#0A84FF", marginBottom: 12 }}>
            📋 Ordens de Serviço
          </h3>
          <div style={{ overflowX: "auto" }}>
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
                          handleStatusOrdem(o.id, e.target.value as Ordem["status"])
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
                  </tr>
                ))}
                {ordens.length === 0 && (
                  <tr>
                    <td colSpan={4} style={{ textAlign: "center", padding: 12 }}>
                      Nenhuma ordem cadastrada.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* BLOCO 2 — EQUIPAMENTOS */}
        <div
          style={{
            flex: 1,
            minWidth: 420,
            background: "#0A84FF10",
            border: "1px solid #0A84FF30",
            borderRadius: 10,
            padding: 16,
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <h3 style={{ color: "#0A84FF", marginBottom: 12 }}>
            ⚙️ Equipamentos
          </h3>

          <form
            onSubmit={handleAddEquipamento}
            style={{
              marginBottom: 16,
              display: "grid",
              gap: 8,
              gridTemplateColumns: "1fr 1fr 120px",
            }}
          >
            <input
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              style={{
                padding: 8,
                borderRadius: 6,
                border: "1px solid #ccc",
              }}
            />
            <input
              placeholder="Tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              style={{
                padding: 8,
                borderRadius: 6,
                border: "1px solid #ccc",
              }}
            />
            <select
              value={statusEq}
              onChange={(e) =>
                setStatusEq(e.target.value as Equipamento["status"])
              }
              style={{
                padding: 8,
                borderRadius: 6,
                border: "1px solid #ccc",
              }}
            >
              <option value="ativo">Ativo</option>
              <option value="manutenção">Manutenção</option>
              <option value="inativo">Inativo</option>
            </select>

            <button
              type="submit"
              style={{
                gridColumn: "1 / -1",
                background: "#0A84FF",
                color: "#fff",
                padding: "8px 12px",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              Adicionar equipamento
            </button>
          </form>

          {erro && (
            <div style={{ color: "#E63946", marginBottom: 10 }}>{erro}</div>
          )}

          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 14,
              }}
            >
              <thead>
                <tr style={{ background: "#f8faff", color: "#0A84FF" }}>
                  <th style={{ textAlign: "left", padding: 8 }}>Nome</th>
                  <th style={{ textAlign: "left", padding: 8 }}>Tipo</th>
                  <th style={{ textAlign: "center", padding: 8 }}>Status</th>
                  <th style={{ textAlign: "center", padding: 8 }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {equipamentos.map((e) => (
                  <tr key={e.id} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: 8 }}>{e.nome}</td>
                    <td style={{ padding: 8 }}>{e.tipo}</td>
                    <td style={{ padding: 8, textAlign: "center" }}>
                      <select
                        value={e.status}
                        onChange={(ev) =>
                          handleStatusEquip(e.id, ev.target.value as Equipamento["status"])
                        }
                        style={{
                          padding: 4,
                          borderRadius: 6,
                          border: "1px solid #ccc",
                        }}
                      >
                        <option value="ativo">Ativo</option>
                        <option value="manutenção">Manutenção</option>
                        <option value="inativo">Inativo</option>
                      </select>
                    </td>
                    <td style={{ textAlign: "center", padding: 8 }}>
                      <button
                        onClick={() => handleDeleteEquip(e.id)}
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
                {equipamentos.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      style={{
                        textAlign: "center",
                        padding: 12,
                        color: "#777",
                      }}
                    >
                      Nenhum equipamento cadastrado.
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
