import React from 'react';
import { apiService } from './services/ApiService';

export default class PublicTodos extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            publicItems: [],
        };
    }

    componentDidMount() {
        apiService.getAllItems()
            .then(response => {
                this.setState({ publicItems: response.data });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    renderItem(item){
        return(
            <div>
                {item.title}
                {item.content}
            </div>
        );
    }


    render() {
        return(
            <div className="d-flex justify-content-center">
                <div className="col-sm-4 scroll">
                    {this.state.publicItems.map((item) => this.renderItem(item))}
                </div>
            </div>
        );
    }
}