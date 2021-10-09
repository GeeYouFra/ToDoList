import './App.css';
import Todos from './components/Todos';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import React, { useState } from 'react';


function App() {

  const [value, setValue] = useState(1);
  const handleChange = (event, value) => {
    setValue(value);
  }
  return (
    <div className="App">
      <AppBar position="static" color="transparent">
       
          <Typography variant="h5">
            My Todos
          </Typography>
        
        <Tabs value={value} onChange={handleChange} >
          <Tab label="HOME" />
          <Tab label="TODO LIST" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>Hey World</TabPanel>
      <TabPanel value={value} index={1}> <Todos /> </TabPanel>
    </div>
  );
}

function TabPanel(props) {
  const { children, value, index } = props;
  return (
    <div>
      {
        value === index && (
          <Typography>{children}</Typography>
        )
      }
    </div>
  )
}
export default App;
