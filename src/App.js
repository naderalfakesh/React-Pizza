import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {
  state={
    pizzas: [],
    pizzaToChange: {}
  }
  
  componentDidMount(){
    fetch("http://localhost:3000/pizzas")
    .then(res => res.json())
    .then(data=>
      this.setState({pizzas: data}))
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
    let url =`http://localhost:3000/pizzas` ;
    let method = 'POST';
    if(id){
      url =`http://localhost:3000/pizzas/${id}`
      method = 'PUT';
    }
    fetch(url,{
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({topping,size,vegetarian})
    })
    .then(
      ()=> {
      fetch("http://localhost:3000/pizzas")
      .then(res => res.json())
      .then(data=>
        this.setState({pizzas: data}))
    }
    )
  }

  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm {...this.state.pizzaToChange} handleInput={this.handleInput} handleSubmit={this.handleSubmit}/>
        <PizzaList pizzas={[...this.state.pizzas].reverse()} handleEdit={this.handleEdit}/>
      </Fragment>
    );
  }
}

export default App;
