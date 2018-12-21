import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import axios from 'axios';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import TodoApp from './TodoApp';
import Navbar from './Navbar';

class Index extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loggedIn: false,
            name: ''
        };
        this.handleLogout = this.handleLogout.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    componentDidMount(){
        let JWTToken = localStorage.getItem('JWTToken');
        axios.post('http://127.0.0.1:8000/api/me', {},
        { headers: {"Authorization" : `Bearer ${JWTToken}`} })
            .then(response => {
                this.setState({
                    loggedIn: true,
                    name: response.data.name
                })
            })
            .catch(function (error) {});
    }

    handleLogout(){
        let JWTToken = localStorage.getItem('JWTToken');
        axios.post('http://127.0.0.1:8000/api/logout', {},
        { headers: {"Authorization" : `Bearer ${JWTToken}`} })
            .then(response => {
                this.setState({
                    loggedIn: false,
                    name: ""
                })
            })
            .catch(function (error) {
                console.log(error);
                alert(error);
            })
    }

    handleLogin(){
        this.setState({
            loggedIn: true,
        })
    }


    render() {
        return (
            <div>
            <Navbar
            loggedIn={this.state.loggedIn}
            name={this.state.name}
            handleLogout={this.handleLogout}
            />
            <Router>
                <div>
                    <Route exact path="/" component={() => (
                        this.state.loggedIn ? (
                            <TodoApp
                            handleLogin={this.handleLogin}
                            />
                        ):(
                            <LoginForm 
                            handleLogin={this.handleLogin}
                            />
                        ))}
                    />
                    <Route path="/register" component={RegisterForm} />
                </div>
            </Router>
            </div>
        );
    }  
}


ReactDOM.render(<Index/>, document.getElementById('root'));