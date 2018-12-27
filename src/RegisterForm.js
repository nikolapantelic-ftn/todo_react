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
            redirect: false,
            errors: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    hasErrors(field) {
        return !!this.state.errors[field];
    }

    firstError(field) {
        return this.hasErrors(field) ? this.state.errors[field][0] : '';
    }

    clearErrors(field) {
        this.hasErrors(field) && delete this.state.errors[field];
    }

    handleSubmit(e) {
        e.preventDefault();

            apiService.register(this.state)
                .then(response => {
                    this.setState({redirect: true});
                })
                .catch(error => {
                    this.setState({redirect: false});
                    this.setState({errors: error.response.data.errors});
                });
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
                                onChange={
                                    (event) => { 
                                        this.setState({ email: event.target.value });
                                        this.clearErrors('email');
                                    }
                                }
                                className="form-control"
                                required 
                            />
                            <div>
                                {this.firstError('email')}
                            </div>
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
                                onChange={
                                    (event) => { 
                                        this.setState({ passwordConfirmation: event.target.value });
                                        this.clearErrors('password');
                                    }
                                }
                                className="form-control" 
                                required 
                            />
                            <div>
                                {this.firstError('password')}
                            </div>
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
