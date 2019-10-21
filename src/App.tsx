import React,{useEffect,useCallback} from 'react';
import './App.css';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';

import Home from '@/views/Home/Home';
import About from '@/views/About/About';


const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <header>
          <Link to='/'>首页</Link>
          <Link to='/about'>关于</Link>
        </header>
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
