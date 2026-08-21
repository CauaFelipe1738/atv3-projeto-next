"use client";

import { useState } from "react";

interface Tarefa {
  id: number;
  texto: string;
  concluida: boolean;
}

export default function Home() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [novaTarefa, setNovaTarefa] = useState("");

  const adicionarTarefa = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novaTarefa.trim()) return;

    setTarefas([
      ...tarefas,
      { id: Date.now(), texto: novaTarefa, concluida: false },
    ]);
    setNovaTarefa("");
  };

  const alternarConcluida = (id: number) => {
    setTarefas(
      tarefas.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
      )
    );
  };

  const removerTarefa = (id: number) => {
    setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-8 bg-zinc-50 dark:bg-black font-sans text-zinc-900 dark:text-zinc-100">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-lg mt-12 border border-zinc-200 dark:border-zinc-800">
        <h1 className="text-2xl font-bold text-center mb-6">Lista de Tarefas</h1>

        {/* Campo de Input + Botão */}
        <form onSubmit={adicionarTarefa} className="flex gap-2 mb-6">
          <input
            type="text"
            value={novaTarefa}
            onChange={(e) => setNovaTarefa(e.target.value)}
            placeholder="Digite uma nova tarefa..."
            className="flex-1 px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            Adicionar
          </button>
        </form>

        {/* Lista de Tarefas (Abaixo do Input) */}
        <ul className="flex flex-col gap-2">
          {tarefas.length === 0 ? (
            <p className="text-sm text-center text-zinc-500 dark:text-zinc-400 py-4">
              Nenhuma tarefa cadastrada.
            </p>
          ) : (
            tarefas.map((tarefa) => (
              <li
                key={tarefa.id}
                className="flex items-center justify-between p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200/50 dark:border-zinc-700/50 gap-3"
              >
                <span
                  onClick={() => alternarConcluida(tarefa.id)}
                  className={`flex-1 cursor-pointer select-none text-sm ${
                    tarefa.concluida
                      ? "line-through text-zinc-400 dark:text-zinc-500"
                      : "text-zinc-800 dark:text-zinc-200"
                  }`}
                >
                  {tarefa.texto}
                </span>

                <button
                  onClick={() => removerTarefa(tarefa.id)}
                  className="text-xs text-red-500 hover:text-red-700 font-medium px-2 py-1 rounded hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                >
                  Remover
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </main>
  );
}