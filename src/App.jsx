import React, { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  
  const[toDos,settodos] = useState([]);
  const[toDo,setTOdo] = useState('');
  const [editingTodo,setEditingTodo] = useState(null);
  const [editingText , setEditingText] = useState('');
  const refObj = useRef()
  
  useEffect(()=>{
    refObj.current.focus()
  })

  const handleAddtodo = ()=>{
    if(toDo.trim() !== '') {
      settodos([...toDos,{id:Date.now(),text:toDo,status:false}])
      setTOdo('')
    }else{
      alert('please enter the todo')
    }
  }

  const handleTOdochange = (event) =>{
    setTOdo(event.target.value)
  }

  const checkBoxChange = (toDoId,checked) =>{
    console.log(toDoId +''+checked)
    settodos(toDos.filter((obj) =>{
      if(obj.id === toDoId) {
        obj.status = checked
      }
      return obj
    }))
  }

  const toDodelete = (obj) =>{
    settodos(toDos.filter((obj2) =>{
      return obj2.id !== obj.id
    }))
  }

  const handleTodoEDIT = (obj) =>{
    setEditingTodo(obj.id);
    setEditingText(obj.text);
  }

  const handleSaveEdit = () =>{
    if(editingText.trim() !==''){
    settodos(
      toDos.map((obj) =>{
        if(obj.id === editingTodo) {
          obj.text = editingText;
        }
        return obj
      })
    )
    setEditingTodo(null);
    setEditingText('')
  }else{
    alert('please enter a todo')
  }}

  const handleCancelEdit =() =>{
    setEditingTodo(null);
    setEditingText('');
  }

  return (
    <div className="app">
    <div className="mainHeading">
      <h1>ToDo List</h1>
    </div>
    <div className="subHeading">
      <br />
      <h2>Whoop, it's My Plan 🌝 ☕ </h2>
    </div>
    <div className="input">
      
      <input ref={refObj} onChange={handleTOdochange} value={toDo} type="text" placeholder="🖊️ Add item..." />
      <i onClick={handleAddtodo} className="fas fa-plus"></i>
    </div>
    <div className="todos">
     { 
        toDos.map((obj)=>{
          return(
        <div className="todo">
        <div className="left">
          <input onChange={(event) => checkBoxChange(obj.id,event.target.checked)} value={obj.status} type="checkbox" name="" id="" />
          {editingTodo === obj.id ?(
            <div className='changeinput'>
              <input onChange={(event) =>setEditingText(event.target.value)} type='text' value={editingText}/>
            </div>
          ):(
            <p>{obj.text}</p>
          )}
          
        </div>
        <div className="right">
          {editingTodo === obj.id ?(
            <>
            <i onClick={handleSaveEdit} className="fas fa-save"></i>
            <i onClick={handleCancelEdit} className="fas fa-ban"></i>
            </>
          ) : (
            <i onClick={()=>handleTodoEDIT(obj)} className="fas fa-edit"></i>
          )}
        <i onClick={()=>toDodelete(obj)} className="fas fa-times"></i>
        </div>
      </div>
          )
      })
      }
    </div>
  </div>
  );
}

export default App;