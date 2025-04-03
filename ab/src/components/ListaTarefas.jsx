import { useEffect, useState } from "react";

function ListaTarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [ordenarAZ, setOrdenarAZ] = useState(false); // Estado para controlar a ordenação
  const [novaTarefa, setNovaTarefa] = useState("");

  // 🔹 Carregar tarefas salvas do LocalStorage
  useEffect(() => {
    const tarefasSalvas = localStorage.getItem("tarefas");
    if (tarefasSalvas) {
      setTarefas(JSON.parse(tarefasSalvas)); // Agora corretamente recupera os dados
    }
  }, []);
 
  useState
  // 🔹 Salvar as tarefas no LocalStorage sempre que houver mudanças
  useEffect(() => {
    if (tarefas.length > 0) {
      localStorage.setItem("tarefas", JSON.stringify(tarefas));
    }
  }, [tarefas]);

  // 🔹 Adicionar nova tarefa
  const adicionarTarefa = () => {
    if (novaTarefa.trim() !== "") {
      const novasTarefas = [...tarefas, { texto: novaTarefa, concluida: false }];
      setTarefas(novasTarefas);
      localStorage.setItem("tarefas", JSON.stringify(novasTarefas)); // Salva imediatamente no LocalStorage
      setNovaTarefa(""); // Limpa o campo
    }
  };

  // 🔹 Ordenar tarefas
  const ordenarTarefas = () => {
    const tarefasOrdenadas = [...tarefas].sort((a, b) =>
      a.texto.localeCompare(b.texto)
    );
    setTarefas(tarefasOrdenadas);
    setOrdenarAZ(!ordenarAZ); // Alterna o estado de ordenação
  };


  // 🔹 Remover tarefa
  const removerTarefa = (indice) => {
    const novasTarefas = tarefas.filter((_, i) => i !== indice);
    setTarefas(novasTarefas);
    localStorage.setItem("tarefas", JSON.stringify(novasTarefas)); // Atualiza o LocalStorage
  };

  // 🔹 Marcar/desmarcar tarefa como concluída
  const marcarTarefa = (indice) => {
    const tarefasAtualizadas = tarefas.map((tarefa, i) =>
      i === indice ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
    );
    setTarefas(tarefasAtualizadas);
    localStorage.setItem("tarefas", JSON.stringify(tarefasAtualizadas)); // Atualiza o LocalStorage
  };

  return (
    <div>
      <h2>Lista de Tarefas</h2>
      <input
        type="text"
        value={novaTarefa}
        onChange={(e) => setNovaTarefa(e.target.value)}
        placeholder="Digite uma nova tarefa"
      />
      <button onClick={adicionarTarefa}>Adicionar</button>
      <button onClick={() => ordenarAZ(indice)}>Ordenar de A-Z</button>
      <ul>
        {tarefas.map((tarefa, indice) => (
          <li key={indice}>
            <input
              type="checkbox"
              checked={tarefa.concluida}
              onChange={() => marcarTarefa(indice)}
            />
              {tarefa.texto}
            <button onClick={() => removerTarefa(indice)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaTarefas;
