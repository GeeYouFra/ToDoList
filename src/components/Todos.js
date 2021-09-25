import React, { useState } from 'react';

function Todos() {
    const [todo, setTodo] = useState({ desc: '', date: '' });
    const [todos, setTodos] = useState([]);

    const addTodo = () => {
        setTodos([...todos, todo]);
    }

    const inputChanged = (event) => {
        setTodo({ ...todo, [event.target.name]: event.target.value })
    }

    const deleteToDo = (row) => {
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
                <table>
                    <tbody>
                        <tr>
                            <th> Description </th>
                            <th> Date </th>
                        </tr>
                        {
                            todos.map((todo, index) =>
                                <tr key={index}>
                                    <td>{todo.desc}</td>
                                    <td>{todo.date}</td>
                                    <td><button onClick={() => deleteToDo(index)}>Delete</button></td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default Todos;
