import { useEffect, useState } from "react";

function ListaTarefas() {
  // Estados do componente
  const [tarefas, setTarefas] = useState([]); // Lista de tarefas visivel na tela
  const [novaTarefa, setNovaTarefa] = useState(""); // Campo de input para nova tarefa
  const [ordenadoAZ, setOrdenadoAZ] = useState(false); // Indica se esta ordenado de A-Z ou nao

  // Carrega tarefas do localStorage quando a pagina for carregada
  useEffect(() => {
    const tarefasSalvas = localStorage.getItem("tarefas");
    if (tarefasSalvas) {
      setTarefas(JSON.parse(tarefasSalvas));
    }
  }, []);

  // Sempre que a lista de tarefas mudar, ela sera salva no localStorage
  useEffect(() => {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }, [tarefas]);

  // Adiciona uma nova tarefa a lista
  const adicionarTarefa = () => {
    if (novaTarefa.trim() === "") return; // Ignora se estiver vazio

    const nova = {
      texto: novaTarefa,
      concluida: false
    };

    const novasTarefas = [...tarefas, nova];

    setTarefas(novasTarefas);
    setNovaTarefa(""); 

    // Aqui salvamos a ordem de criaçao das tarefas em outro localStorage separado
    // Isso é importante para podermos restaurar a ordem original depois de uma ordenaçao
    const tarefasOriginais = localStorage.getItem("tarefasOriginais");
    if (!tarefasOriginais) {
      localStorage.setItem("tarefasOriginais", JSON.stringify(novasTarefas));
    } else {
      const atual = JSON.parse(tarefasOriginais);
      atual.push(nova);
      localStorage.setItem("tarefasOriginais", JSON.stringify(atual));
    }
  };

  // Remove uma tarefa da lista e tambem da ordem original
  const removerTarefa = (indice) => {
    const novas = tarefas.filter((_, i) => i !== indice);
    setTarefas(novas);

    // Tambem remove da lista de ordem original
    const originais = JSON.parse(localStorage.getItem("tarefasOriginais") || "[]");
    originais.splice(indice, 1); //Remove o item do array original no indice indicado.
    localStorage.setItem("tarefasOriginais", JSON.stringify(originais));
  };

  // Alterna o status de concluida ou nao concluida da tarefa
  const marcarTarefa = (indice) => {
    const novas = tarefas.map((tarefa, i) =>
      i === indice ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
    );
    setTarefas(novas);
  };

  // Ordena as tarefas em ordem de A-Z
  const ordenarAZ = () => {
    const ordenadas = [...tarefas].sort((a, b) =>
      a.texto.localeCompare(b.texto)
    );
    setTarefas(ordenadas);
    setOrdenadoAZ(true);
  };

  // Restaura a ordem original baseada no tarefas originais
  const restaurarOrdemOriginal = () => {
    const originais = JSON.parse(localStorage.getItem("tarefasOriginais") || "[]");
    setTarefas(originais);
    setOrdenadoAZ(false);
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
      <button onClick={ordenadoAZ ? restaurarOrdemOriginal : ordenarAZ}>
        {ordenadoAZ ? "Ordem de Criação" : "Ordenar A-Z"}
      </button>

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
