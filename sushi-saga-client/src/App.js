import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';
import AddMoneyForm from './components/AddMoneyForm';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {
  state = {
    sushis: [],
    startSushi: 0,
    endSushi: 4,
    eaten: [],
    money: 200
  }

  componentDidMount() {
    fetch(API)
    .then(resp => resp.json())
    .then(sushiData => this.setState({sushis: sushiData}))
  }

  moreSushi = () => {
    if (this.state.endSushi < this.state.sushis.length) {
      let start = this.state.startSushi + 4
      let end = this.state.endSushi + 4
      this.setState({
      startSushi: start,
      endSushi: end
      })
    } else {
      this.setState({
        startSushi: 0,
        endSushi: 4
      })
    }
    
  }

  handleEatSushi = (sushi) => {
    if (this.state.money >= sushi.price) {
      this.setState({
        eaten: [...this.state.eaten, sushi],
        money: this.state.money - sushi.price
      })
    }
  }

  addMoneyToAccount = (event, moneyToAdd) => {
    event.preventDefault()
    let totalAmount = parseInt(moneyToAdd) + this.state.money
    this.setState({money: totalAmount})
  }

  render() {
    return (
      <div className="app">
        <AddMoneyForm addMoneyToAccount={this.addMoneyToAccount}/>
        <SushiContainer eaten={this.state.eaten} handleEatSushi={this.handleEatSushi} moreSushi={this.moreSushi} sushis={this.state.sushis.slice(this.state.startSushi, this.state.endSushi)}/>
        <Table money={this.state.money} eaten={this.state.eaten}/>
      </div>
    );
  }
}

export default App;