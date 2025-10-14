"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

// página de interação do usuário UI
export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const route = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErro("");

        try {
            const response = await fetch("/api/usuarios/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, senha })
            });

            const data = await response.json();
            if (data.success) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("funcao", data.usuario.funcao);
                route.push("/dashboard");
            } else {
                setErro(data.error?.message || "Falha de Login");
            }
        } catch (error) {
            console.error("Erro de Login:", error);
            setErro("Erro de Servidor: " + error);
        }
    };

    return (
        <div className="container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                {erro && <p className="erro">{erro}</p>}
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="senha">Senha</label>
                    <input
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Entrar</button>
            </form>

            <style jsx>{`
                .container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    background: linear-gradient(135deg, #1e1e1e, #3a3a3a, #5a5a5a);
                    font-family: "Segoe UI", sans-serif;
                }

                .login-form {
                    background: rgba(255, 255, 255, 0.08);
                    padding: 40px;
                    border-radius: 20px;
                    box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);
                    width: 320px;
                    backdrop-filter: blur(10px);
                    text-align: center;
                    color: #f1f1f1;
                }

                h2 {
                    margin-bottom: 20px;
                    font-weight: 600;
                    font-size: 1.8rem;
                }

                .erro {
                    color: #ff7070;
                    font-size: 0.9rem;
                    margin-bottom: 10px;
                }

                .input-group {
                    margin-bottom: 15px;
                    text-align: left;
                }

                label {
                    display: block;
                    margin-bottom: 5px;
                    font-size: 0.9rem;
                }

                input {
                    width: 100%;
                    padding: 10px;
                    border: none;
                    border-radius: 8px;
                    background: rgba(255, 255, 255, 0.2);
                    color: #fff;
                    outline: none;
                    font-size: 0.95rem;
                    transition: background 0.3s;
                }

                input:focus {
                    background: rgba(255, 255, 255, 0.3);
                }

                button {
                    width: 100%;
                    padding: 12px;
                    border: none;
                    border-radius: 8px;
                    background: linear-gradient(135deg, #7a7a7a, #b1b1b1);
                    color: #1a1a1a;
                    font-weight: bold;
                    cursor: pointer;
                    transition: background 0.3s, transform 0.2s;
                }

                button:hover {
                    background: linear-gradient(135deg, #9e9e9e, #d3d3d3);
                    transform: scale(1.02);
                }
            `}</style>
        </div>
    );
}
