import React from 'react';
import axios from 'axios';

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };

        this.handleEmailInput = this.handleEmailInput.bind(this);
        this.handlePasswordInput = this.handlePasswordInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    

    handleEmailInput(event) {
        this.setState({
            email: event.target.value
        });
    }

    handlePasswordInput(event) {
        this.setState({
            password: event.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        axios.post('http://127.0.0.1:8000/api/login', {
            email: this.state.email,
            password: this.state.password
        })
        .then(response => {
            console.log(response);
            localStorage.setItem('JWTToken', response.data.access_token);
            axios.defaults.headers['Authorization'] = `Bearer ${response.data.access_token}`
            alert('Success!');
            this.props.handleLogin();
        })
        .catch(function (error) {
            console.log(error);
            alert(error);
        });
    }
    render() {
        return(
            <div className="d-flex justify-content-center">
                <form onSubmit={this.handleSubmit}>
                    <div className="col">
                        <div>
                            <label htmlFor="email" className="col-form-label">Email</label>
                            <input  
                            id="email"
                            ref="email"
                            type="email"
                            value={this.state.email}
                            onChange={this.handleEmailInput}
                            className="form-control"
                            required />
                        </div>
                        <div>
                            <label htmlFor="password" className="col-form-label">Password</label>
                            <input
                            id="password"
                            type="password"
                            ref="password"
                            value={this.state.password}
                            onChange={this.handlePasswordInput}
                            className="form-control"
                            required />
                        </div>
                        <button 
                            type="submit" 
                            className="btn btn-primary">
                            Login
                        </button>
                    </div>   
                </form>
            </div>
        );
    }
}