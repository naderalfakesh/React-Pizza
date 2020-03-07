import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {
  state={
    pizzaToChange: {}
  }
  handleEdit = (pizzaToChange)=>{
    this.setState({pizzaToChange})
  }
  handleInput=(e)=>{
    const name = e.target.name;
    let value = e.target.value;
    if(name === "vegetarian"){
      value = value === "Vegetarian";
    }
    this.setState({
      pizzaToChange :  {
        ...this.state.pizzaToChange , 
        [name] : value
      }
    })
  
  }

  handleSubmit = ()=>{
    const {id,topping,size,vegetarian } = this.state.pizzaToChange
    fetch(`http://localhost:3000/pizzas/${id}`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({topping,size,vegetarian})
    })
  }

  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm {...this.state.pizzaToChange} handleInput={this.handleInput} handleSubmit={this.handleSubmit}/>
        <PizzaList handleEdit={this.handleEdit}/>
      </Fragment>
    );
  }
}

export default App;
