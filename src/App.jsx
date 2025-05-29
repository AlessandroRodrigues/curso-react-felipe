import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import TemaProvider from "./infrastructure/tema/TemaProvider";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  //acessa toda vez que task mudar
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  },[tasks]);

  //acessar apenas uma vez, quando acessa a aplicação
  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos?_limit=10',
        { method: "GET"}
      );
      const data = await response.json();
      setTasks(data);
    }
    //pega tarefas de uma API
    //fetchTasks();
  },[]);

  function onTaskClick(taskId){
    const newTasks = tasks.map(task => {
      if(task.id === taskId){
        return {... task, completed: !task.completed}
      }
      return task;
    })
    setTasks(newTasks);
  }

  function onDeleteTaskClick(taskId){
    const newTasks = tasks.filter(task => task.id !== taskId);
    setTasks(newTasks);
  }

  function onAddTaskSubmit(title, description){
    const newTask = {
      id: v4(),
      title,
      description,
      completed: false,
    }
    setTasks([...tasks, newTask]);
  }

  return (
      <TemaProvider>
        <div className="w-screen h-screen flex justify-center bg-slate-500 p-6">
            <div className="w-[500px] space-y-4">
              <h1 className="text-3xl text-slate-100 font-bold text-center">
                Gerenciador de Tarefas
              </h1>
              <AddTask 
                onAddTaskSubmit={onAddTaskSubmit} />
              <Tasks 
                tasks={tasks} 
                onTaskClick={onTaskClick} 
                onDeleteTaskClick={onDeleteTaskClick} />
            </div>
        </div>
      </TemaProvider>
  )
}

export default App
