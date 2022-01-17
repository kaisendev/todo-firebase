import './App.css';
import { useState, useEffect } from 'react';
import { db } from './firebase-config'
import { collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc} from 'firebase/firestore'

function App() {
  const [todos, settodos] = useState([])
  const todoCollections = collection(db, "todos-v2")
  const [name, setName] = useState('')
  const [editRef, setEditRef] = useState(null)

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
    if(!editRef){
      await addDoc(todoCollections, {name: name})
      setName('')
    }
    else{
      updateTodo()
    }
  }

  const deleteTodo = async (id) => {
    const todoDoc = doc(db, "todos-v2", id)
    await deleteDoc(todoDoc)
  }

  const editTodo = async (id, name) => {
     //get specific collections
     const docRef = doc(db, "todos-v2", id)
     //doc reference
     setEditRef(docRef)
     setName(name)
  }

  const cancelEdit = async (id) => {
    const docRef = doc(db, "todos-v2", id)
    const hideUpdate = {hide: false}
    await updateDoc(docRef, hideUpdate)
  }

  const updateTodo = async () => {
    const newValue = { name: name}
    await updateDoc(editRef, newValue)
    setName('')
    setEditRef(null)
  }


  return (
    <div className="container">
      <h1>Add Todos</h1>
      <input className='addInput' type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder='name'/>
      <button className='addButton' onClick={addtodo}>{ editRef ? "Update" : "Add"}</button>
      <h3>{ todos.length === 0 ? "You have no Todo's" : ""}</h3>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className='todoList'> 
              <span>{todo.name}</span>    
              <button onClick={ () => editTodo(todo.id, todo.name) } >Edit</button>
              <button onClick={ () => deleteTodo(todo.id) }>Delete</button>
            </li>
          ))}
        </ul>
    </div>
  )
}

export default App;
