import React from 'react'
import $ from 'jquery'
import {Checkbox, LeftNav} from 'material-ui'

export default class IngredientList extends React.Component{
  constructor(props){
    super(props);
    this.state = {ingredients:[
      {
        name:'People',
        // nutrients:{calories:100,vitaminA:10,protein:40,sugar:20},
        // unit:'people',
        // min:0,
        // max:20,
        // default:2,
        // isDisabled:false,
      },
      {name:'Oat Powder'}
    ]}
    // $.get(this.props.baseURL+'/ingredient/all',data=>{
    //   debugger;
    //   console.log('new ingredients',data);
    //   data=data.map(el=>{return {name:el}})
    //   // data = data.slice(0,100);
    //   // debugger;
    //   this.setState({ingredients:data}) })
  }
  toggle = () => {
    this.refs.leftNav.toggle();
  }
  getIngredient(id,cb){
    if(id){
      return $.get(this.props.baseURL + '/ingredient')
    }
  }
  render = () => {
    let ingreds = this.state.ingredients.map((ingred,i)=>{
      // ingred.key = i;
      console.log('menu item: ',i)
      return(
        <Checkbox
        name={ingred.name}
        label={ingred.name}
        key={i}
        defaultChecked={!ingred.isDisabled}
        onCheck={(evt,val)=>{this._enableIngredient(evt,val,ingred.name)}}
        />
      )
    })
    return(
      <LeftNav ref="leftNav" docked={false}>
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
