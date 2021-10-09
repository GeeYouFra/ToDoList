import React, { useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

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
        setTodo({ ...todo, [event.target.name]: event.target.value });
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

    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setTodo({ ...todo, date: date.toISOString() });
    }

    return (
        <div>
            <div style={{ marginTop: 20, marginBottom: 20 }}>
                <Stack direction="row" spacing={2} justifyContent="center">
                    <TextField size="small" label="Description" name="desc" value={todo.desc} onChange={inputChanged} />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                        autoOk
                        clearable
                        value={selectedDate}
                        onChange={date => handleDateChange(date)}
                        format="MM/dd/yyyy" />
                    </MuiPickersUtilsProvider>
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
