import { useState } from "react";

function ListaTarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');

  const adicionarTarefa = () => {
    if (novaTarefa.trim() !== '') {
      setTarefas([...tarefas, { texto: novaTarefa, concluida: false }]);
      setNovaTarefa(""); // Limpa o campo de entrada após adicionar
    }
  };

  const removerTarefa = (indice) => {
    setTarefas(tarefas.filter((_, i) => i !== indice)); // Remove a tarefa da lista
  };

  const marcarTarefa = (indice) => {
    // Atualiza o estado de concluída da tarefa específica
    const tarefasAtualizadas = tarefas.map((tarefa, i) =>
      i === indice ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
    );
    setTarefas(tarefasAtualizadas); // Atualiza a lista de tarefas
  };

  return (
    <div>
      <h2>Lista de Tarefas</h2>
      <input
        type="text"
        value={novaTarefa}
        onChange={(e) => setNovaTarefa(e.target.value)} // Atualiza o valor de novaTarefa
        placeholder="Digite uma nova tarefa"
      />
      <button onClick={adicionarTarefa}>Adicionar</button>
      <ul>
        {tarefas.map((tarefa, indice) => (
          <li key={indice}>
            <input
              type="checkbox"
              checked={tarefa.concluida} // Marca a checkbox se a tarefa estiver concluida
              onChange={() => marcarTarefa(indice)} // Alterna a concluso da tarefa
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
