import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Profile from './components/Profile/Profile';
import TaskList from './components/Tasks/TaskList';
import CreateTask from './components/Tasks/CreateTask';

const App = () => {
  return (
    <Router>
      <div>
        <h1>TaskRabbit Mini Application</h1>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/profile" component={Profile} />
          <Route path="/tasks" component={TaskList} />
          <Route path="/tasks/create" component={CreateTask} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
