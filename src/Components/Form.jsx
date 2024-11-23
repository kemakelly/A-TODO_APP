import React, { useEffect, useState } from 'react';
import styles from './Form.module.css';
import { BiSolidEditAlt } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";

function Form() {
  const [todo, setTodo] = useState('');
  const [enterTodo, setEnterTodo] = useState([]);
  const [initialLoad, setInitialLoad] = useState(true);
  const [editor,setEditor]= useState(null)


  useEffect(() => {
    const storedTodos = localStorage.getItem('ReactTodo');
    if (storedTodos) {
      setEnterTodo(JSON.parse(storedTodos));
    }
    setInitialLoad(false); 
  }, []);

  
  useEffect(() => {
    if (!initialLoad) {
      localStorage.setItem('ReactTodo', JSON.stringify(enterTodo));
    }
  }, [enterTodo, initialLoad]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if(editor !== null){
        const allTodos = [...enterTodo]
        allTodos[editor] = {
            ...allTodos[editor], 
            text: todo,  
        }   
        setEnterTodo(allTodos);
    setEditor(null);       // Reset the editor index
    setTodo(''); 
    }else if
     (todo) {
      const date = new Date().toLocaleString(); 
      setEnterTodo([
        ...enterTodo,
        { text: todo, completed: false, time: date }, 
      ]);
      setTodo('');
    }
  };

  const handleCheckboxChange = (index) => {
    const updatedTodos = enterTodo.map((item, i) =>
      i === index ? { ...item, completed: !item.completed } : item
    );
    setEnterTodo(updatedTodos);
  };
//   Edit todo
const editTodo = (index)=>{
    setTodo(enterTodo[index].text)
    setEditor(index)
}
const deleteTodo =(index)=>{
  const filteredTodo = enterTodo.filter((item,ind)=>ind !== index)
  setEnterTodo(filteredTodo)

}

  return (
    <div className={styles.FormContainer}>
      <form className={styles.Form} onSubmit={handleSubmit}>
        <input
          type="text"
          id="todoItem"
          placeholder="Add a new task"
          name="todo"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <div className={styles.buttoncontainer}>
          <button type="submit">Create</button>
        </div>
      </form>

     
      {enterTodo.map((todoItem, index) => (
        <div className={styles.task} key={index}>
          <div className={styles.left}>
            <input
              className={styles.check}
              type="checkbox"
              checked={todoItem.completed}
              onChange={() => handleCheckboxChange(index)}
            />
            <div className={styles.todoTime}>
              <p>{todoItem.text}</p>
              <p className={styles.time}>{todoItem.time}</p> 
            </div>
          </div>
          <div className={styles.rightTask}>
            <div className={styles.edit}onClick={()=>editTodo(index)}>
              <BiSolidEditAlt />
            </div>
            <div className={styles.delete} onClick={()=>deleteTodo(index)}>
              <RiDeleteBin5Line />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Form;
