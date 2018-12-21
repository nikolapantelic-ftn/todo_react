import React from 'react';

export default class Navbar extends React.Component {
    constructor(props){
        super(props);
        this.state={
            loggedIn: props.loggedIn,
            name: props.name
        };
    }

    login(){
        return(
            <nav className="navbar navbar-expand navbar-light bg-light">
                <h3>To-do</h3>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto"/>
                    <a className="nav-link" href="/register">Register</a>
                </div>
            </nav>
        );
    }
    logout(){
        return(
            <nav className="navbar navbar-expand navbar-light bg-light">
                <h3>To-do</h3>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto"/>
                    <button type="button" className="btn btn-link" onClick={this.props.handleLogout}>Logout</button>
                    Logged in as: {this.props.name}
                </div>
            </nav>
            
        );
    }

    render(){
        if(this.props.loggedIn)
            return(this.logout());
        else return(this.login());
    }
}