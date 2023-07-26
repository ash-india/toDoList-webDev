// import logo from './logo.svg';
import { useEffect, useState } from "react"
import './App.css';
import NewTodoForm from "./Components/NewTodoForm";
import Todolist from "./Components/Todolist";

function App() {
  const [todos, setTodos] = useState(() =>{
    const localValue = localStorage.getItem("ITEMS")
    if(localValue == null) return []

    return JSON.parse(localValue)
  })

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])

  function addTodo(title){
    setTodos((currentTodos)=>{
      return [
        ...currentTodos, { id: crypto.randomUUID(), 
        title, completed: false},
      ]
    })
  }
  
  var toggleTodo = (id,completed) => {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if(todo.id === id){
          return { ...todo, completed }
        }
        return todo;
      })
    })
  }

  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  
  // Instead of returning a div so that the full jsx 
  // could come under one html tag
  // we could avoid the extra div by using fragment <></>
  return (
    <>  
      <NewTodoForm onSubmit={addTodo} />
      <h1 className="header">Todo List</h1>
      <Todolist 
        todos={todos} 
        toggleTodo={toggleTodo} 
        deleteTodo={deleteTodo} />
    </>
  );
}

export default App;
