import React from 'react'
import Ingredient from './ingredient'
import Nutrient from './nutrient'
import {Cell} from 'react-pure'
import _ from 'underscore'

export default class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {ingredients:[
      {
        name:'People',
        nutrients:{calories:100,vitaminA:10},
        unit:'people',
        min:0,
        max:20,
        default:2
      },
      {
        name:'Maltodextrin',
        nutrients:{calories:20,vitaminA:0},
        unit:'cups',
        min:0,
        max:20,
        default:5,
      },
      {
        name:'Rice Starch',
        nutrients:{calories:50,vitaminA:20},
        unit:'cups',
        min:0,
        max:20,
        default:1
      }
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
