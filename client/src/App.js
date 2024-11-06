import React from 'react';
import './App.css'
import PropertyForm from './components/PropertyForm';
// import TaskList from './components/TaskList';
// import TaskForm from './components/TaskForm';
import TaskManager from './components/TaskManager';
function App() {
  return (
    <div>
      <center>
      <h1>Waqf Property Task Tracker</h1>
      </center>
      <PropertyForm />
      <TaskManager />
     
      {/* <TaskForm/>
      <TaskList /> */}

    </div>
  );
}

export default App;
