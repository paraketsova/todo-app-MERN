import React from 'react';
import {Switch, Route} from 'react-router-dom';
import AllTodoListsPage from './pages/AllTodoListsPage';
//import ListDetailsPage from './pages/ListDetailsPage';
import './App.css';

function App() {
  return (

    <div className="container">
      {/*/<Switch>*/}
        {/*<Route path="/:id" component={ListDetailsPage}/>*/}
        <Route path="/"><AllTodoListsPage/></Route>
      {/*</Switch>*/}
    </div>
  );
}

export default App;


