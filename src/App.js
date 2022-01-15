import './App.css';
import { useState, useEffect } from 'react';
import { db } from './firebase-config'
import { collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc} from 'firebase/firestore'

function App() {
  const [todos, settodos] = useState([])
  const todoCollections = collection(db, "todos-v2")
  const [name, setName] = useState('')
  const [hide, setHide] = useState(false)
  const [editInput, setEditInput] = useState('')

  useEffect(() => {
      //const data = await getDocs(todoCollections)
      const unsub = onSnapshot(todoCollections, (snapshot) => 
      {
        settodos(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
      });

      //console.log(todos)
      return unsub
    },[])//end of useEffect

  const addtodo = async () => {
      await addDoc(todoCollections, {name: name, hide})
      setName('')
  }

  const deleteTodo = async (id) => {
    const todoDoc = doc(db, "todos-v2", id)
    await deleteDoc(todoDoc)
  }

  const editTodo = async (id, name) => {
    //get specific collections
    const docRef = doc(db, "todos-v2", id)
    await updateDoc(docRef, {hide: true})
    setEditInput(name)
  }

  const cancelEdit = async (id) => {
    const docRef = doc(db, "todos-v2", id)
    const hideUpdate = {hide: false}
    await updateDoc(docRef, hideUpdate)
  }

  const updateTodo = async (id) => {
    const docRef = doc(db, "todos-v2", id)
    const newValue = {name: editInput, hide: false}
    await updateDoc(docRef, newValue)
    setEditInput('')
  }


  return (
    <div className="container">
      <h1>Add Todos</h1>
      <input className='addInput' type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder='name'/>
      <button className='addButton' onClick={addtodo}>Add</button>
      <h3>{ todos.length === 0 ? "You have no Todo's" : ""}</h3>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className='todoList'> 
              <span className={ todo.hide ? "hideElement" : "showElement"}>{todo.name}</span>    
              <input className={ todo.hide ? "showElement" : "hideElement"} onChange={(e) => setEditInput(e.target.value)} value={editInput} type="text" />          
              <button className={ todo.hide ? "hideElement" : "showElement"} onClick={ () => editTodo(todo.id, todo.name) } >Edit</button>
              <button className={ todo.hide ? "showElement" : "hideElement"} onClick={ () => updateTodo(todo.id) } >Update</button>
              <button onClick={ () => deleteTodo(todo.id) }>Delete</button>
            </li>
          ))}
        </ul>
    </div>
  )
}

export default App;
