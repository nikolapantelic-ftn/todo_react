import React from 'react';
import axios from 'axios';
import { apiService } from './services/ApiService';

export default class TodoApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
        };
        this.handleItemDelete = this.handleItemDelete.bind(this);
        this.handleItemAdd = this.handleItemAdd.bind(this);
    }
    
    componentDidMount() {

        apiService.getItems()
                .then(response => {
                    this.setState({
                        items: response.data
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
    }

    handleItemDelete(index) {
        const items = this.state.items.slice();
        items.splice(index, 1);
        this.setState({
            items
        });
    }

    handleItemAdd() {
        apiService.getItems()
                .then(response => {
                    this.setState({
                        items: response.data
                    })
                })
                .catch(function (error) {
                    console.log(error);
                });
    }

    renderItem(item, index) {
        return <Item 
            key={item.id}
            item={item}
            index={index}
            handleItemDelete={this.handleItemDelete}
            />;
    }

    renderTaskForm() {
        return <TaskForm 
            handleItemAdd={this.handleItemAdd}/>
    }

    render() {
        return(
            <div className="d-flex justify-content-center">
                <div className="col-sm-4 scroll">
                    {this.state.items.map((item, index) => this.renderItem(item, index))}
                </div>
                {this.renderTaskForm()}
            </div>
        );
    }
}

class TaskForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            content: ""
        };
        this.handleContentChange = this.handleContentChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    

    handleTitleChange(event) {
        this.setState({
            title: event.target.value
        });
    }

    handleContentChange(event) {
        this.setState({
            content: event.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        apiService.addItem(this.state)
            .then(response => {
                this.setState({
                    title: '',
                    content: ''
                });
            })
            .catch(function (error) {
                console.log(error);
                alert(error);
            })
            this.props.handleItemAdd();
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="title">Title:</label>
                <input type="text" className="form-control" id="title" value={this.state.title} onChange={this.handleTitleChange}/>
                <label htmlFor="content">To-Do:</label>
                <textarea className="form-control" rows="3" id="content" value={this.state.content} onChange={this.handleContentChange}/>
                <button type="submit" className="btn btn-primary">Add Task</button>
            </form>
        );
    }
}

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.item.id,
            userId: props.item.userId,
            title: props.item.title,
            content: props.item.content,
            priority: props.item.priority,
            isDone: props.item.is_done,
            createdAt: props.item.createdAt,
            updatedAt: props.item.updatedAt,
            editMode: false,
        };

        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handlePriorityChange = this.handlePriorityChange.bind(this);
        this.handleSavePress = this.handleSavePress.bind(this);
        this.submitChanges = this.submitChanges.bind(this);
        this.handleDeletePress = this.handleDeletePress.bind(this);
        this.submitPriorityChange = this.submitPriorityChange.bind(this);
        this.submitCheckboxChange = this.submitCheckboxChange.bind(this);
    }

    submitCheckboxChange(done) {
        let JWTToken = localStorage.getItem('JWTToken');
        axios.put(`http://127.0.0.1:8000/api/todo/${this.state.id}`, {
            is_done: done,
        }, { headers: {"Authorization" : `Bearer ${JWTToken}`} })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
            alert(error);
        });
    }

    handleCheckboxChange(event) {
        this.setState({
            isDone: event.target.checked ? 1 : 0
        });
        this.submitCheckboxChange(event.target.checked);
        console.log(event.target.checked);
    }

    handleSavePress() {
        this.setState({
            editMode: false
        });
        this.submitChanges();
    }

    submitPriorityChange(p) {
        let JWTToken = localStorage.getItem('JWTToken');
        axios.put(`http://127.0.0.1:8000/api/todo/${this.state.id}`, {
            priority: p,
        }, { headers: {"Authorization" : `Bearer ${JWTToken}`} })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
            alert(error);
        });
    }

    handlePriorityChange(event) {
        this.setState({
            priority: event.target.value
        });
        this.submitPriorityChange(event.target.value);
    }

    submitChanges(event) {
        let JWTToken = localStorage.getItem('JWTToken');
        axios.put(`http://127.0.0.1:8000/api/todo/${this.state.id}`, {
            title: this.state.title,
            content: this.state.content
        }, { headers: {"Authorization" : `Bearer ${JWTToken}`} })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
            alert(error);
        });
    }

    handleDeletePress() {
        let JWTToken = localStorage.getItem('JWTToken');
        axios.delete(`http://127.0.0.1:8000/api/todo/${this.state.id}`, { headers: {"Authorization" : `Bearer ${JWTToken}`} })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
            alert(error);
        });
        this.props.handleItemDelete(this.props.index);
    }

    render() {
        return(
            <div className="col">
                {this.state.editMode ? (
                    <input 
                        type="text" 
                        className="form-control" 
                        id="title" 
                        value={this.state.title} 
                        onChange={(event) => { this.setState({ title: event.target.value })}}
                    />
                ) : (
                    <h3>{this.state.title}</h3>
                )}
                <div className="row">
                <div className="col">
                {this.state.editMode ? (
                    <textarea 
                        className="form-control" 
                        rows="3" 
                        id="content" 
                        value={this.state.content} 
                        onChange={(event) => { this.setState({ content: event.target.value })}}
                    />
                ) : (
                    <p>{this.state.content}</p>
                )}
                </div>
                <div className="col">
                {this.state.editMode ? (
                    <button 
                        id="save" 
                        type="button" 
                        className="btn btn-success" 
                        onClick={this.handleSavePress}
                    > Save </button>
                ) : (
                    <div>
                        <button 
                            id="edit" 
                            type="button" 
                            className="btn btn-primary" 
                            onClick={(event) => { this.setState({ editMode: true })}}
                        > Edit </button>
                        <button 
                            id="delete" 
                            type="button" 
                            className="btn btn-danger" 
                            onClick={this.handleDeletePress}
                        > Delete </button>
                    </div>
                )}
                </div>
                </div>
                <select id="priority" className="form-control form-control-lg" defaultValue={this.state.priority} onChange={this.handlePriorityChange}>
                    <option value="0">High</option>
                    <option value="1">Medium</option>
                    <option value="2">Low</option>
                </select>
                <label htmlFor="isDone">Done</label>
                <input 
                    className="form-check-input" 
                    type="checkbox" 
                    id="isDone" 
                    checked={this.state.isDone} 
                    onChange={this.handleCheckboxChange}
                />
            </div>
        );
    }
}