import React from 'react';
import IngredientStore from '../stores/ingredientStore';
import Ingredient from './ingredient'
import constants from '../constants/constants'

export default class ActiveIngredientList extends React.Component{
  constructor(props){
    super(props);
    this.state = {ingredients:[]}
    IngredientStore.listen((type,data)=>{
      switch(type){
        case constants.UPDATE_INGREDIENTS:
        case constants.NEW_INGREDIENT:
          // let ingredients = this.state.ingredients;
          // data.isDisabled = false;
          // ingredients[data.long_desc] = data;
          this.setState({ingredients:data});
          console.log("new ingredient: ", data)
          break;
      }
    })
  }
  render = () => {
    console.log('active ingredinet list rerender')
    // let ingrds = this.state.ingredients.filter(x=>{return !x.isDisabled}).map((indegredient,i)=>{<Ingredient {...indegredient } key={i} />});
    let ingrds = this.state.ingredients.map(i=>{
      Object.assign(i,{
        amount:0,
        default:0,
        unit:'g',
        name:i.long_desc,
        max:500,
        min:0,
      });
      return(
        <Ingredient {...i} />
      )
    })
    return(
      <div>
        {ingrds}
      </div>
    )
  }
}
