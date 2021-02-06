import React from 'react';

class AddMoneyForm extends React.Component {
    state = {
        addMoney: ""
    }

    handleChange = (event) => {
        this.setState({ addMoney: event.target.value})
    }

    render() {
        return(
            <form onSubmit={event => this.props.addMoneyToAccount(event, this.state.addMoney)}>
                <label>Add Money to Account:</label>
                <input onChange={event => this.handleChange(event)} type="number"></input>
                <input type="submit"></input>
            </form>
        )
    } 
}

export default AddMoneyForm;