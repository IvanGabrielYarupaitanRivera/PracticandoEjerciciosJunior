import React, { useState, useRef, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
//Aquí estoy creando la plantilla de las tareas, es decir, cada tarea debe tener estos datos.
interface Task {
  id: string
  task: string
  completed: boolean
}

//Aquí estoy creando el componente de TaskList
const TaskList: React.FC = () => {
  //Aquí se guarda la tarea que nos da el usuario, (solo nos da un texto)
  const [newTask, setNewTask] = useState('')
  //Aquí se va a guardar nuestra lista de tareas
  const [tasks, setTasks] = useState<Task[]>([])
  //Aquí creo una referencia al input de la UI
  const inputRef = useRef<HTMLInputElement>(null)

  // Enfocar el input al cargar el componente
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  //Función para añadir una tarea a nuestra lista de tareas
  const addTask = () => {
    //Aquí verificamos si el texto del usuario no está vacío
    if (newTask.trim() !== '') {
      //Aquí convierte el texto del usuario a la plantilla Task
      const newTaskItem: Task = {
        id: uuidv4(),
        task: newTask,
        completed: false,
      }
      //Anañidos la nueva tarea a nuestra lista
      setTasks([...tasks, newTaskItem])
      //Borramos el texto del usuario para poder recibir otra tarea
      setNewTask('')

      // Enfocar el input después de añadir una tarea
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }
  }

  //Función para eliminar una tarea de nuestra lista de tareas
  //Recibimos un parámetro, en este caso es el id
  const removeTask = (taskId: string) => {
    //Creamos un nuevo array con todos los datos que cumplan con la condición
    const updateTasks = tasks.filter((task) => task.id !== taskId)
    //Reemplazamos la lista que ya teníamos, con la lista filtrada
    setTasks(updateTasks)
  }

  //Función para cambiar el estado de un tarea
  const completeTask = (taskId: string) => {
    //Creamos un nuevo array modificado con la función
    const updatedTasks = tasks.map((task) => {
      //Verificamos si el id de la lista seleccionada coincide con la id de nuestra lista
      //Si es así, cambiamos su estado
      if (task.id === taskId) {
        return { ...task, completed: !task.completed }
      } else {
        return task
      }
    })
    //Reemplazamos la lista que ya teníamos, con la lista mapeada
    setTasks(updatedTasks)
  }

  return (
    <div>
      <div className='flex items-center mb-4'>
        <input
          ref={inputRef}
          className='w-3/4 p-2 rounded-l-lg border-2 border-yellow-400 focus:outline-none'
          type='text'
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder='Añadir nueva tarea'
        />
        <button
          className='w-1/4 p-2 rounded-r-lg bg-yellow-400 hover:bg-yellow-500 text-white'
          onClick={addTask}
        >
          Añadir
        </button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            className='flex items-center justify-between p-2 mb-2 bg-yellow-100 rounded'
          >
            <span className={`text-lg ${task.completed ? 'line-through' : ''}`}>
              {task.task}
            </span>
            <div>
              <button
                className='bg-yellow-400 hover:bg-yellow-500 text-white p-2 mr-2'
                onClick={() => completeTask(task.id)}
              >
                {task.completed ? 'Desmarcar' : 'Completar'}
              </button>
              <button
                className='bg-red-400 hover:bg-red-500 text-white p-2'
                onClick={() => removeTask(task.id)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TaskList
