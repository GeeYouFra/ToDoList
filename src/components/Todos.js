import React, { useState, useRef } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';


import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';


function Todos() {
    const [todo, setTodo] = useState({ desc: '', date: '', priority: '' });
    const [todos, setTodos] = useState([]);

    const gridRef = useRef();

    const addTodo = () => {
        setTodos([...todos, todo]);
        setTodo({ desc: '', date: '', priority: '' });
    }

    const inputChanged = (event) => {
        setTodo({ ...todo, [event.target.name]: event.target.value })
    }

    const deleteTodo = () => {
        if (gridRef.current.getSelectedNodes().length > 0)
            setTodos(todos.filter((todo, index) => index !== gridRef.current.getSelectedNodes()[0].childIndex));
        else
            alert('Select row first')
    }

    const columns = [
        { field: 'desc', sortable: true, filter: true, floatingFilter: true },
        { field: 'date', sortable: true, filter: true, floatingFilter: true },
        {
            field: 'priority', sortable: true, filter: true, floatingFilter: true,
            cellStyle: params => params.value === "High" ? { color: 'green' } : { color: 'blue' }
        }
    ];

  /* const handleDateChange = (date) => {
       setTodo({...todo, date: date.getDate() + "." + (date.getMonth()+1) + "." + date.getFullYear() })
   }*/

    return (
        <div>
            <h2> Simple ToDo List </h2>
            <p> Add todo: </p>
            <div style={{ marginTop: 20, marginBottom: 20 }}>
                <Stack direction="row" spacing={2} justifyContent="center">
                    <TextField size="small" label="Description" name="desc" value={todo.desc} onChange={inputChanged} />
               
                    <TextField size="small"  label="Date" name="date" value={todo.date} onChange={inputChanged} />
              
                    <TextField size="small" label="Priority" name="priority" value={todo.priority} onChange={inputChanged} />
                    <Button
                        variant="outlined"
                        onClick={addTodo}
                        startIcon={<AddIcon />}>
                        Add
                    </Button>
                    <Tooltip title="Oh my goodness! Please don't!">
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={() => deleteTodo()} //{deleteTodo}
                            startIcon={<DeleteIcon />}>
                            Delete
                        </Button>
                    </Tooltip>
                </Stack>
                <div className="ag-theme-material" style={{ height: 500, width: 600, margin: 'auto' }}>
                    <AgGridReact
                        rowData={todos}
                        columnDefs={columns}
                        rowSelection="single"
                        ref={gridRef}
                        onGridReady={params => gridRef.current = params.api}
                        animateRows={true}
                        suppressDragLeaveHidesColumns={true}
                    />
                </div>
            </div>

        </div>
    );
}

export default Todos;
