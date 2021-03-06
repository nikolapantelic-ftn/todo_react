import React from 'react';
import { apiService } from './services/ApiService';

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        apiService.login(this.state)
            .then(() => {
                alert('Successfully logged in!');
                this.props.handleLogin();
            })
            .catch(error => {
                console.log(error);
                alert("Invalid Email or Password!");
            });
    }
    render() {
        return(
            <div className="d-flex justify-content-center">
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <div>
                            <label htmlFor="email" className="col-form-label">Email</label>
                            <input  
                                id="email"
                                ref="email"
                                type="email"
                                value={this.state.email}
                                onChange={(event) => { this.setState({ email: event.target.value })}}
                                className="form-control"
                                required 
                                />
                        </div>
                        <div>
                            <label htmlFor="password" className="col-form-label">Password</label>
                            <input
                                id="password"
                                type="password"
                                ref="password"
                                value={this.state.password}
                                onChange={(event) => { this.setState({ password: event.target.value })}}
                                className="form-control"
                                required 
                                />
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