import ListaTarefas from "./components/ListaTarefas";
import './App.css';

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Gerenciador de Tarefas</h1>
      <ListaTarefas />
    </div>
  );
}

export default App;