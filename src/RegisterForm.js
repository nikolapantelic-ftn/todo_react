import React from 'react';
import { Redirect } from 'react-router-dom';
import { apiService } from './services/ApiService';

export default class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            redirect: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        let canProceed = this.refs.password.checkValidity()
        && this.refs.passwordConfirmation.checkValidity()
        && (this.state.password === this.state.passwordConfirmation);

        if(canProceed) {
            apiService.register(this.state)
                .then(response => {
                    this.setState({redirect: true});
                })
                .catch(error => {
                    this.setState({redirect: false});
                    console.log(error);
                });
        }
    }

    renderRedirect() {
        if (this.state.redirect) {
          return(<Redirect to='/'/>);
        }
    }

    render() {
        return (
            <div className="d-flex justify-content-center">
            {this.renderRedirect()}
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <div>
                            <label htmlFor="name" className="col-form-label">Name</label>
                            <input
                                id="name"
                                type="text"
                                value={this.state.name}
                                onChange={(event) => { this.setState({ name: event.target.value })}}
                                className="form-control"
                                required 
                            />
                        </div>
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
                                minLength="8"
                                value={this.state.password}
                                onChange={(event) => { this.setState({ password: event.target.value })}}
                                className="form-control"
                                required 
                            />
                        </div>
                        <div>
                            <label htmlFor="passwordConfirmation" className="col-form-label">Confirm Password</label>
                            <input 
                                id="passwordConfirmation" 
                                ref="passwordConfirmation"
                                type="password"
                                value={this.state.passwordConfirmation}
                                onChange={(event) => { this.setState({ passwordConfirmation: event.target.value })}}
                                className="form-control" 
                                required 
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="btn btn-primary">
                            Register
                        </button>
                    </div>
                </form>
            </div>
          );
    }
  }
