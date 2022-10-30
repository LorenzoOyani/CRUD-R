import React, { useEffect, useRef, useState } from 'react'

function usePrevious(value) {
  const ref = useRef(null);
  useEffect(()=>{
    ref.current = value;
  });
  return ref.current;
}

const Todo = (props)=>{
  
  const [isEditing, setEditing] = useState(false );
  const [newName, setNewName] = useState('');

  const wasEditing = usePrevious(isEditing)

  const editFieldRef = useRef(null)
  const editButtonRef = useRef(null)

  useEffect(()=>{
    if(!wasEditing && isEditing) {
     editButtonRef.current?.focus();
     
    } 
    if(wasEditing && !isEditing){
      editButtonRef.current?.focus()
    }
     
    
   }, [wasEditing, isEditing]);
   
 
  function handleChange(e) {
    setNewName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.editTask(props.id, newName);
    setNewName(" ");
    setEditing(false);
  }

  const editingTemplate = (
    <form 
    className="stack-small"
    onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          New name for {props.name}
        </label>
        <input id={props.id} 
        className="todo-text" 
        type="text" 
        value={newName}
        onChange={handleChange}
        ref = {editFieldRef}/>
      </div>
      <div className="btn-group">
        <button type="button" className="btn todo-cancel"
        onClick={()=> setEditing(false)}>
          Cancel
          <span className="visually-hidden">renaming {props.name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">new name for {props.name}</span>
        </button>
      </div>
    </form>
  );
  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
          <input
            id={props.id}
            type="checkbox"
            defaultChecked={props.completed}
            onChange={() => props.taskCompleted(props.id)}
          />
          <label className="todo-label" htmlFor={props.id}>
            {props.name}
          </label>
        </div>
        <div className="btn-group">
          <button type="button" className="btn" onClick={()=>
          setEditing(true)}
          ref = {editButtonRef}>
            Edit <span className="visually-hidden">{props.name}</span>
          </button>
          <button
            type="button"
            className="btn btn__danger"
            onClick={() => props.deleted(props.id)}
          >
            Delete <span className="visually-hidden">{props.name}</span>
          </button>
        </div>
    </div>
  );
  

// conditional rendering inside jsx..
    return (
        <>
         <li className="todo stack-small">
         {isEditing? editingTemplate : viewTemplate}
        </li>
        </>

    )


}

export default Todo;