import React, { Component } from 'react';
import { withRouter } from 'react-router';

class Review extends Component {

    constructor() {
        super();

        this.state={
            edit: false
        }
    }

    editToggle = () => {
        let edit = !this.state.edit
        this.setState({edit})
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleDeleteReview = () => {
        fetch(`http://localhost:3000/reviews/${this.props.review.id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${localStorage.token}`
            }
        })
        .then(res => res.json())
        .then(() => {
            this.props.removeReview(this.props.review)
            alert("Message successfully removed")
        })
    }

    handleEditReview = (e) => {
        e.preventDefault()

        fetch(`http://localhost:3000/reviews/${this.props.review.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            },
            body: JSON.stringify({
                "title": e.target[0].value,
                "description": e.target[1].value
            })
        })
        .then(res => res.json())
        .then(editedReview => {
            this.props.editReview(editedReview)
            this.editToggle()
        })
    }

    render() {
        return (
            <div>
                <h1>Review Controller</h1>
            </div>
        )
    }
}

export default withRouter(Review);