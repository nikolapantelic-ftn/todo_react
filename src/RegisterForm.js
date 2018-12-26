import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

export default class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            redirect: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(e) {
        e.preventDefault();

        let canProceed = this.refs.password.checkValidity()
        && this.refs.passwordConfirm.checkValidity()
        && (this.state.password === this.state.confirmPassword);

        if(canProceed) {
            axios.post('http://127.0.0.1:8000/api/register', {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                password_confirmation: this.state.confirmPassword,
            })
            .then(response => {
                console.log(response);
                alert('Success!');
                this.setState({
                    redirect: true
                });

            })
            .catch(function (error) {
                console.log(error);
                alert(error);
            });
            
        }else{
            this.refs.email.reportValidity();
            this.refs.password.reportValidity();
            this.refs.passwordConfirm.reportValidity();
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
                    <div className="col">
                        <div>
                            <label htmlFor="name" className="col-form-label">Name</label>
                            <input
                            id="name"
                            type="text"
                            value={this.state.name}
                            onChange={(event) => { this.setState({ name: event.target.value })}}
                            className="form-control"
                            required />
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
                            required />
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
                            required />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="col-form-label">Confirm Password</label>
                            <input 
                            id="confirmPassword" 
                            ref="passwordConfirm"
                            type="password"
                            value={this.state.confirmPassword}
                            onChange={(event) => { this.setState({ confirmPassword: event.target.value })}}
                            className="form-control" 
                            required />
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
