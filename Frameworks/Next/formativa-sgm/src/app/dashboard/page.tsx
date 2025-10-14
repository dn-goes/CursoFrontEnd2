"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
    const route = useRouter();
    const [funcao, setFuncao] = useState<string | null>(null);

    useEffect(() => {
        const funcao = localStorage.getItem("funcao");
        if (!funcao) {
            route.push("/login");
        } else {
            setFuncao(funcao);
        }
    }, [route]);

    const handleLogout = async () => {
        localStorage.removeItem("token");
        localStorage.removeItem("funcao");
        route.push("/login");
    };

    const renderDashboard = () => {
        if (funcao?.toLowerCase() === "admin") {
            return <p>Área do Administrador 🧑‍💼</p>;
        } else if (funcao === "gerente") {
            return <p>Área do Gerente 👨‍💼</p>;
        } else if (funcao === "tecnico") {
            return <p>Área do Técnico 🧰</p>;
        } else {
            return <p>Carregando...</p>;
        }
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Bem-vindo, {funcao ? funcao : "Usuário"}!</h1>
                <button onClick={handleLogout} className="logout-btn">
                    Logout
                </button>
            </header>

            <main className="dashboard-content">
                <div className="dashboard-card">
                    {renderDashboard()}
                </div>
            </main>

            <style jsx>{`
                .dashboard-container {
                    display: flex;
                    flex-direction: column;
                    height: 100vh;
                    background: linear-gradient(135deg, #1e1e1e, #3a3a3a, #5a5a5a);
                    font-family: "Segoe UI", sans-serif;
                    color: #f1f1f1;
                    align-items: center;
                }

                .dashboard-header {
                    width: 100%;
                    padding: 20px 40px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background: rgba(255, 255, 255, 0.05);
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
                    backdrop-filter: blur(10px);
                }

                h1 {
                    font-size: 1.8rem;
                    font-weight: 600;
                }

                .logout-btn {
                    padding: 10px 18px;
                    background: linear-gradient(135deg, #a0a0a0, #d3d3d3);
                    color: #1a1a1a;
                    border: none;
                    border-radius: 8px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: background 0.3s, transform 0.2s;
                }

                .logout-btn:hover {
                    background: linear-gradient(135deg, #bdbdbd, #e4e4e4);
                    transform: scale(1.05);
                }

                .dashboard-content {
                    flex: 1;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    padding: 40px;
                }

                .dashboard-card {
                    background: rgba(255, 255, 255, 0.08);
                    padding: 50px;
                    border-radius: 20px;
                    box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
                    text-align: center;
                    backdrop-filter: blur(10px);
                    width: 60%;
                    max-width: 600px;
                    font-size: 1.2rem;
                }

                @media (max-width: 600px) {
                    .dashboard-card {
                        width: 90%;
                        padding: 30px;
                    }
                    h1 {
                        font-size: 1.5rem;
                    }
                }
            `}</style>
        </div>
    );
}
