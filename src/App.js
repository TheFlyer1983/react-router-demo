import React, { Component } from 'react';
import {Link, Route, Switch, Redirect} from 'react-router-dom';
import Home from './Home';
import Category from './Category';
import Products from './Products';
import Login, {fakeAuth} from './Login';
import Admin from './Admin';
import './App.css';

const PrivateRoute = ({component: Component, authed, ...rest}) => {
  return(
    <Route
      {...rest}
      render={(props) => fakeAuth.isAuthenticated === true
        ? <Component{...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}}
        />
      }
    />
  )
}

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li>
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/category">Category</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products">Products</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin">Admin Area</Link>
              </li>
            </ul>
          </div>
        </nav>
        <Switch>
          <Route exact={true} path="/" component={Home}/>
          <Route path="/category" component={Category}/>
          <Route path="/login" component={Login}/>
          <PrivateRoute path="/admin" component={Admin} />
          <PrivateRoute authed={fakeAuth.isAuthenticated} path="/products" component={Products}/>
        </Switch>
      </div>
    );
  }
}

export default App;
