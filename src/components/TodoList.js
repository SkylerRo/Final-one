import React, { useEffect, useState } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';

//

function TodoList() {
  const [weather, setWeather] = useState();
  const [todos, setTodos] = useState([]);
useEffect(() => {
  fetch('http://localhost:4000/weather').then(x => x.json()).then(data => setWeather(data)) // call the backend and get the weather and transforms it into a json object
},[])

useEffect(() => { 
const userName = window.localStorage.getItem('userName')
  if (!userName) {
    return
  }
  
  //Connects to the backend
 const fetchData = async () => {
   const res = await fetch('http://localhost:4000/api/todos/'+ userName);
   const data = await res.json();
     console.log(data);
    
     //set data to the state todos variable
     setTodos(data.map(x => x.todo));
 }
 fetchData();
 
 
 }, []);

  const addTodo = todo => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo, ...todos];

    setTodos(newTodos);
    const userName = window.localStorage.getItem('userName')
  if (!userName) {
    return
  }
  
  //Connects to the backend
 
   fetch('http://localhost:4000/api/todos/',{method:'post',headers:{
    'Content-Type':'application/json'
   },
  body: JSON.stringify({
    userName,
    todo: todo
  })});
    console.log(...todos);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
  };

  const removeTodo = id => {
    const removedArr = [...todos].filter(todo => todo.id !== id);

    setTodos(removedArr);
  };

  const completeTodo = id => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <>
    {weather?.current?.temp_f && <h1>Current Weather is {weather.current.temp_f}°F</h1>}
      <h1>Let's Get It Done!</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}

export default TodoList;