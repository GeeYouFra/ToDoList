import React, { useState } from 'react';
import TodoTable from './TodoTable';

function Todos() {
    const [todo, setTodo] = useState({ desc: '', date: '' });
    const [todos, setTodos] = useState([]);

    const addTodo = () => {
        setTodos([...todos, todo]);
    }

    const inputChanged = (event) => {
        setTodo({ ...todo, [event.target.name]: event.target.value })
    }

    const deleteTodo = (row) => {
        console.log('Row ' + row + ' deleted');
        setTodos(todos.filter((todo, index) => index !== row));
    }

    return (
        <div>
            <h2> Simple ToDo List </h2>
            <p> Add todo: </p>
            <div>
                <label> Description: <input name="desc" value={todo.desc} onChange={inputChanged} /> </label>
                <label> Date: <input name="date" value={todo.date} onChange={inputChanged} /> </label>
                <button onClick={addTodo}>Add</button>
                <TodoTable todos={todos} deleteTodo={deleteTodo}/>
            </div>

        </div>
    );
}

export default Todos;
