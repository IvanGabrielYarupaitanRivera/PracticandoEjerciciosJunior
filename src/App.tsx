import TaskList from './components/TaskList'

function App() {
  return (
    <div className="bg-yellow-200 min-h-screen py-8 px-4">
      <h1 className="text-3xl text-yellow-800 mb-6 font-bold text-center">Lista de Tareas</h1>
      <TaskList />
    </div>
  );
}

export default App
