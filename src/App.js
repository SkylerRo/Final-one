import { useEffect, useState } from 'react';
import './App.css';
import TodoList from './components/TodoList';

function App() {

//useEffect
useEffect(async () => { 
 
 
 //Connects to the backend
const fetchData = () => {
  console.log('fetching data...');
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
