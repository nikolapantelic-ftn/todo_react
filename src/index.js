import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import TodoApp from './TodoApp'

class Form extends React.Component {
    render() {
        return (
            //Dodaj neki header
            <Router>
                <div>
                    <Route exact path="/" component={LoginForm} />
                    <Route path="/login" component={LoginForm} />
                    <Route path="/register" component={RegisterForm} />
                    <Route path="/app" component={TodoApp}/>
                </div>
            </Router>
        );
    }  
}


ReactDOM.render(<Form/>, document.getElementById('root'));