import React from 'react'
import Slider from 'material-ui/lib/slider'
import Paper from 'material-ui/lib/paper'
import {Cell} from 'react-pure'
import NutrientActions from '../actions/nutrientActions'
import NutrientStore from '../stores/nutrientStore'

export default class Ingredient extends React.Component{
  constructor(props){
    super(props);

  }
  componentDidMount(){
    NutrientActions.registerIngredient(this.props.name,this.props.nutrients)
    // NutrientStore.listen(
    //   mix=>{
    //     mix[this.props.name] = mix[this.props.name] || {};
    //     let val = mix[this.props.name].val || 0;
    //     this.setState({
    //       value : val
    //     })
    //   }
    // )
  }
  handleSlider = (evt,value) => {
    console.log(value);
    NutrientActions.quantityChange(this.props.name,this.props.nutrients,value)
  }
  render(){
    return(
      <Cell size='1/3' className="cell">
      <Paper>
        <span>Ingredient: {this.props.name}</span>
        <Slider ref="slider" onChange={this.handleSlider} name="amount"/>
      </Paper>
      </Cell>
    )
  }
}
