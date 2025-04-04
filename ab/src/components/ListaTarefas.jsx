import { useEffect, useState } from "react";

function ListaTarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [ordenarAZ, setOrdenarAZ] = useState(false); // Estado para controlar a ordenação
  const [novaTarefa, setNovaTarefa] = useState("");
  const [buttonText, setButtonText] = useState("Ordenar de A-Z"); // Definir estado para o texto do botão

  // 🔹 Carregar tarefas salvas do LocalStorage
  useEffect(() => {
    const tarefasSalvas = localStorage.getItem("tarefas");
    if (tarefasSalvas) {
      setTarefas(JSON.parse(tarefasSalvas)); // Recupera as tarefas do LocalStorage
    }
  }, []);

  // 🔹 Salvar as tarefas no LocalStorage sempre que houver mudanças
  useEffect(() => {
    if (tarefas.length > 0) {
      localStorage.setItem("tarefas", JSON.stringify(tarefas)); // Salva as tarefas no LocalStorage
    }
  }, [tarefas]);

  // 🔹 Adicionar nova tarefa
  const adicionarTarefa = () => {
    if (novaTarefa.trim() !== "") {
      const novaTarefaComData = {
        texto: novaTarefa,
        concluida: false,
        dataCriacao: new Date().toISOString(), // Armazena a data de criação
      };
      const novasTarefas = [...tarefas, novaTarefaComData];
      setTarefas(novasTarefas);
      setNovaTarefa(""); // Limpa o campo de texto
    }
  };

  // 🔹 Ordenar tarefas A-Z
  const ordenarTarefasAZ = () => {
    const tarefasOrdenadas = [...tarefas].sort((a, b) =>
      a.texto.localeCompare(b.texto)
    );
    setTarefas(tarefasOrdenadas);
    setOrdenarAZ(true); // Define o estado de ordenação para A-Z
    setButtonText("Ordenar por ordem de criação"); // Muda o texto do botão
  };

  // 🔹 Ordenar tarefas por ordem de criação (utilizando a data de criação)
  const ordenarPorCriacao = () => {
    // Ordena pela data de criação (no LocalStorage está armazenada a ordem original)
    const tarefasOrdenadasPorCriacao = [...tarefas].sort((a, b) =>
      new Date(a.dataCriacao) - new Date(b.dataCriacao)
    );
    setTarefas(tarefasOrdenadasPorCriacao);
    setOrdenarAZ(false); // Define o estado de ordenação para ordem de criação
    setButtonText("Ordenar de A-Z"); // Muda o texto do botão
  };

  // 🔹 Alternar entre as ordenações
  const alternarOrdenacao = () => {
    if (ordenarAZ) {
      ordenarPorCriacao(); // Ordena por data de criação
    } else {
      ordenarTarefasAZ(); // Ordena de A-Z
    }
  };

  // 🔹 Remover tarefa
  const removerTarefa = (indice) => {
    const novasTarefas = tarefas.filter((_, i) => i !== indice);
    setTarefas(novasTarefas);
  };

  // 🔹 Marcar/desmarcar tarefa como concluída
  const marcarTarefa = (indice) => {
    const tarefasAtualizadas = tarefas.map((tarefa, i) =>
      i === indice ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
    );
    setTarefas(tarefasAtualizadas);
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
      <button onClick={alternarOrdenacao}>{buttonText}</button>
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
