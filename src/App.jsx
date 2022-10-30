import React, { useState, useRef, useEffect } from 'react';
import { nanoid } from "nanoid";


import './App.css'

import Todo from "./component/Todo"
import Form from "./component/Form"
import FilterButton from './component/FilterButton';

function usePrevious(value) {
  const ref = useRef(null);
  useEffect(()=>{
    ref.current = value;
  });
  return ref.current;
}

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  completed: (task) => task.completed
}

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {

const [tasks, setTasks] =  useState(props.tasks);
const [ filter, setFilter] = useState("All");

const listHeadingRef = useRef(null);


const previousTasksLength = usePrevious(tasks.length);

useEffect(()=>{
  if(tasks.length - previousTasksLength === -1) {
    listHeadingRef.current?.focus()
  }

}, [tasks.length, previousTasksLength])

function toggleCompleted(id) {
  const updatedTasks =  tasks.map((task)=>{
    if(id === task.id) {
      return {
        ...task,
        completed: !task.completed
      }
    }
    return task;
  })
  setTasks(updatedTasks)
} 

function deleteTask(id) {
  const deleteInputTasks =  tasks.filter((task)=> id !== task.id);
  setTasks(deleteInputTasks)

   
  
}

function editTask(id, newName) {
  const editTaskList = tasks.map((task)=> {
      if(id === task.id) {
        return{...tasks, name: newName}
      }
      return task;
  })
  setTasks(editTaskList);
}


  const taskList =  tasks.filter(FILTER_MAP[filter])
  .map((task) => (
    <Todo
     id = {task.id}
     name = {task.name} 
     completed = {task.completed}
     key = {task.id}
     taskCompleted = {toggleCompleted} 
     deleted = {deleteTask}
     editTask = {editTask}/>));


     const filterList = FILTER_NAMES.map((names)=>( <FilterButton
       key = {names} 
       name = {names} 
       isPressed = {filter}
       setFilter = {setFilter}/>));
     

     function addTask(name) {
      const newTask = {id: `todo-${nanoid()}`, name, completed: false}
      setTasks([...tasks, newTask]);
     }

     const tasksNouns =  taskList.length !==1? "tasks" : "task";

     const headingText = `${taskList.length} ${tasksNouns} Remaining`;


  return (
    
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
     <Form addTask = {addTask} />
      <div className="filters btn-group stack-exception">
      {filterList}
      </div>
      <h2 id="list-heading" tabIndex= "-1" ref = {listHeadingRef}>
       {headingText}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
      {taskList}
      </ul>
    </div>
  );
}

export default App;
