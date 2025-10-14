"use client";
import { useEffect, useState } from "react";

type User = {
	id: string;
	nome: string;
	email: string;
	funcao: string;
};

const STORAGE_KEY = "sgm_users";

function uuid() {
	return Math.random().toString(36).substring(2, 9);
}

export default function DashboardAdmin() {
	const [users, setUsers] = useState<User[]>([]);
	const [nome, setNome] = useState("");
	const [email, setEmail] = useState("");
	const [funcao, setFuncao] = useState("tecnico");
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (raw) {
			try {
				setUsers(JSON.parse(raw));
			} catch {
				setUsers([]);
			}
		} else {
			const seed: User[] = [
				{ id: uuid(), nome: "Administrador", email: "admin@sgm.local", funcao: "admin" }
			];
			localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
			setUsers(seed);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
	}, [users]);

	const validarEmail = (e: string) => /\S+@\S+\.\S+/.test(e);

	const handleCreate = (ev?: React.FormEvent) => {
		ev?.preventDefault();
		setError(null);

		if (!nome.trim() || !email.trim()) {
			setError("Nome e email são obrigatórios.");
			return;
		}
		if (!validarEmail(email)) {
			setError("Email inválido.");
			return;
		}

		const newUser: User = { id: uuid(), nome: nome.trim(), email: email.trim(), funcao };
		setUsers((prev) => [newUser, ...prev]);
		setNome("");
		setEmail("");
		setFuncao("tecnico");
	};

	const handleDelete = (id: string) => {
		if (!confirm("Confirma excluir este usuário?")) return;
		setUsers((prev) => prev.filter((u) => u.id !== id));
	};

	return (
		<section className="admin-container">
			<h2>Gestão de Usuários (Admin)</h2>

			<div className="admin-grid">
				<form onSubmit={handleCreate} className="admin-form">
					<h3>Criar Usuário</h3>
					{error && <div className="error">{error}</div>}

					<label>Nome</label>
					<input value={nome} onChange={(e) => setNome(e.target.value)} />

					<label>Email</label>
					<input value={email} onChange={(e) => setEmail(e.target.value)} />

					<label>Função</label>
					<select value={funcao} onChange={(e) => setFuncao(e.target.value)}>
						<option value="admin">Admin</option>
						<option value="gerente">Gerente</option>
						<option value="tecnico">Técnico</option>
					</select>

					<div className="form-buttons">
						<button type="submit" className="btn-primary">Criar</button>
						<button
							type="button"
							onClick={() => {
								setNome(""); setEmail(""); setFuncao("tecnico"); setError(null);
							}}
							className="btn-secondary"
						>
							Limpar
						</button>
					</div>
				</form>

				<div className="table-container">
					<h3>Lista de Usuários</h3>
					<table>
						<thead>
							<tr>
								<th>Nome</th>
								<th>Email</th>
								<th>Função</th>
								<th>Ações</th>
							</tr>
						</thead>
						<tbody>
							{users.map((u) => (
								<tr key={u.id}>
									<td>{u.nome}</td>
									<td>{u.email}</td>
									<td>{u.funcao}</td>
									<td>
										<button onClick={() => handleDelete(u.id)} className="btn-delete">
											Excluir
										</button>
									</td>
								</tr>
							))}
							{users.length === 0 && (
								<tr>
									<td colSpan={4} className="empty">Nenhum usuário encontrado.</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>

			<style jsx>{`
				.admin-container {
					padding: 40px;
					min-height: 100vh;
					background: linear-gradient(135deg, #1e1e1e, #3a3a3a, #5a5a5a);
					font-family: "Segoe UI", sans-serif;
					color: #f1f1f1;
				}

				h2 {
					text-align: center;
					margin-bottom: 30px;
					font-size: 1.8rem;
					font-weight: 600;
				}

				.admin-grid {
					display: flex;
					flex-wrap: wrap;
					gap: 30px;
					justify-content: center;
				}

				.admin-form {
					background: rgba(255, 255, 255, 0.08);
					backdrop-filter: blur(10px);
					padding: 30px;
					border-radius: 16px;
					box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);
					width: 300px;
					display: flex;
					flex-direction: column;
					gap: 10px;
				}

				.admin-form h3 {
					margin-bottom: 10px;
					text-align: center;
				}

				label {
					font-size: 0.9rem;
					margin-top: 8px;
				}

				input, select {
					padding: 10px;
					border: none;
					border-radius: 8px;
					background: rgba(255, 255, 255, 0.15);
					color: #fff;
					outline: none;
					font-size: 0.95rem;
					transition: background 0.3s;
				}

				input:focus, select:focus {
					background: rgba(255, 255, 255, 0.25);
				}

				.form-buttons {
					display: flex;
					justify-content: space-between;
					margin-top: 12px;
				}

				.btn-primary {
					background: linear-gradient(135deg, #7a7a7a, #b1b1b1);
					color: #1a1a1a;
					padding: 8px 12px;
					border: none;
					border-radius: 8px;
					font-weight: bold;
					cursor: pointer;
					transition: 0.3s;
				}

				.btn-primary:hover {
					background: linear-gradient(135deg, #9e9e9e, #d3d3d3);
					transform: scale(1.05);
				}

				.btn-secondary {
					background: rgba(255, 255, 255, 0.15);
					color: #f1f1f1;
					padding: 8px 12px;
					border: none;
					border-radius: 8px;
					cursor: pointer;
					transition: 0.3s;
				}

				.btn-secondary:hover {
					background: rgba(255, 255, 255, 0.25);
				}

				.table-container {
					background: rgba(255, 255, 255, 0.08);
					backdrop-filter: blur(10px);
					padding: 20px;
					border-radius: 16px;
					box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);
					flex: 1;
					min-width: 340px;
				}

				table {
					width: 100%;
					border-collapse: collapse;
					color: #f1f1f1;
				}

				th, td {
					padding: 10px;
					text-align: left;
					border-bottom: 1px solid rgba(255, 255, 255, 0.1);
				}

				th {
					background: rgba(255, 255, 255, 0.1);
					font-weight: 600;
				}

				tr:hover td {
					background: rgba(255, 255, 255, 0.05);
				}

				.btn-delete {
					background: linear-gradient(135deg, #c94c4c, #e57373);
					border: none;
					color: #fff;
					padding: 6px 10px;
					border-radius: 8px;
					cursor: pointer;
					transition: 0.3s;
				}

				.btn-delete:hover {
					background: linear-gradient(135deg, #e57373, #ef9a9a);
					transform: scale(1.05);
				}

				.error {
					color: #ff7070;
					font-size: 0.9rem;
					margin-bottom: 5px;
					text-align: center;
				}

				.empty {
					text-align: center;
					color: #bbb;
					padding: 20px;
				}

				@media (max-width: 700px) {
					.admin-grid {
						flex-direction: column;
						align-items: center;
					}
					.table-container {
						width: 100%;
					}
				}
			`}</style>
		</section>
	);
}
