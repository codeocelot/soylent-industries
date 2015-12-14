import React from 'react'
import Ingredient from './ingredient'
import Nutrient from './nutrient'
import {Cell} from 'react-pure'
import _ from 'underscore'

export default class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {ingredients:[
      {name:'people', multiplier:1, nutrients:{calories:100,vitaminA:10}},
      {name:'maltodextrin', multiplier:.5, nutrients:{calories:20,vitaminA:0}},
      {name:'riceStarch', multiplier:0.5, nutrients:{calories:50,vitaminA:20}}
    ]}
  }
  makeIngredients = () => {
    return this.state.ingredients.map(indegredient=>{return(<Ingredient {...indegredient } />)})
  }
  makeNutrients = () =>{
    return ['calories','vitaminA'].map(n=>{
      return(<Nutrient name={n}/>)
    })
  }
  render(){
    let ingreds = this.makeIngredients();
    let nutrients = this.makeNutrients();
    return(
      <div>
        <Cell size="1">
          {nutrients}
        </Cell>
        <Cell size="1">
          {ingreds}
        </Cell>
      </div>
    )
  }
}
