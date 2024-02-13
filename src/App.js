import { useEffect, useState } from 'react';
import MainPage from './pages/MainPage';
import TodoList from './components/TodoList';
import './App.css';


function App() {
  const [todos, setTodos] = useState([]);

//useEffect
useEffect(() => { 

 
 
 //Connects to the backend
const fetchData = async () => {
  const res = await fetch('http://localhost:4000/api/todos');
  const data = await res.json();
    console.log(data);
   
    //set data to the state todos variable
    setTodos(data);
}
fetchData();


}, []);

  return (
    <div className="todo-app">
     <TodoList/>
     
    
    </div>
  );
}

export default App;
