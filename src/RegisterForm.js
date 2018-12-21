import React from 'react';
import axios from 'axios';

export default class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        };
        this.handleNameInput = this.handleNameInput.bind(this);
        this.handlePasswordInput = this.handlePasswordInput.bind(this);
        this.handleConfirmPasswordInput = this.handleConfirmPasswordInput.bind(this);
        this.handleEmailInput = this.handleEmailInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
  
    }
    handleNameInput(event) {
        this.setState({
          name: event.target.value
        });
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
    handleConfirmPasswordInput(event){
        let password_confirm = document.getElementById('confirmPassword');
        password_confirm.setCustomValidity('');
        this.setState({
            confirmPassword: event.target.value
        });
    }


    handleSubmit(e) {
        e.preventDefault();

        var canProceed = this.refs.password.checkValidity()
        && this.refs.passwordConfirm.checkValidity()
        && (this.state.password === this.state.confirmPassword);

        let password_confirm = document.getElementById('confirmPassword');
        password_confirm.setCustomValidity('');
        if(this.state.password !== this.state.confirmPassword){
            password_confirm.setCustomValidity('Passwords do not match.');
        }

        if(canProceed) {
            axios.post('http://127.0.0.1:8000/api/register', {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                password_confirmation: this.state.confirmPassword,
            })
            .then(function (response) {
                console.log(response);
                alert('Success!');
            })
            .catch(function (error) {
                console.log(error);
                alert(error);
            });
            

            axios.get('/')
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
            });
        }else{
            this.refs.email.reportValidity();
            this.refs.password.reportValidity();
            this.refs.passwordConfirm.reportValidity();
        }
    }
    render() {
        return (
            <div className="d-flex justify-content-center">
                <form onSubmit={this.handleSubmit}>
                    <div className="col">
                        <div>
                            <label htmlFor="name" className="col-form-label">Name</label>
                            <input
                            id="name"
                            type="text"
                            value={this.state.name}
                            onChange={this.handleNameInput}
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
                            minLength="8"
                            value={this.state.password}
                            onChange={this.handlePasswordInput}
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
                            onChange={this.handleConfirmPasswordInput}
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
