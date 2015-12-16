import React from 'react'
import $ from 'jquery'
import {Checkbox, LeftNav} from 'material-ui'
import IngredientActions from '../actions/ingredientActions'
import IngredientStore from '../stores/ingredientStore'
import constants from '../constants/constants'

export default class IngredientList extends React.Component{
  constructor(props){
    super(props);
    this.state = {ingredients:[]}
    IngredientStore.listen((type,ingredients)=>{
      switch(type){
        case constants.ALL_INGREDIENTS:
          this.setState({ingredients})
      }
      if(type===constants.ALL_INGREDIENTS){
        this.setState({ingredients})
      }
    })
  }
  toggle = () => {
    this.refs.leftNav.toggle();
  }
  getIngredient(id,cb){
    if(id){
      return $.get(this.props.baseURL + '/ingredient')
    }
  }
  _enableIngredient = (evt,val,name) =>{
    if(val)
      IngredientActions.addIngredient(name);
    else IngredientActions.removeIngredient(name);
  }
  // _enableIngredient = (evt,val,name) => {
  //   let ing = _.findWhere(this.state.ingredients,{name});
  //   ing.isDisabled = !val;
  //   // this.state.ingredients[name].isDisabled = val;
  //   this.setState(this.state)
  // }
  render = () => {
    let ingreds = this.state.ingredients.slice(0,100).map((ingred,i)=>{
      // ingred.key = i;
      return(
        <Checkbox
        name={ingred}
        label={ingred}
        key={i}
        defaultChecked={false}
        onCheck={(evt,val)=>{this._enableIngredient(evt,val,ingred)}}
        />
      )
    })
    return(
      <LeftNav ref="leftNav" docked={false} style={{overflowY:'scroll'}}>
      {ingreds}
      </LeftNav>
    )
  }
}

IngredientList.propTypes = {
  baseURL: (props,propName,componentName)=>{
    let propValue = props[propName]
    if(/http/.test(propValue) && propValue[propValue.length-1]!=='/'){
      return null;
    }
    else{
      throw new Error('invalid baseURL')
    }
  }
}
