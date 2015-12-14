import React from 'react'
import Slider from 'material-ui/lib/slider'
import Paper from 'material-ui/lib/paper'
import {Cell} from 'react-pure'
import NutrientActions from '../actions/nutrientActions'
import NutrientStore from '../stores/nutrientStore'

export default class Ingredient extends React.Component{
  constructor(props){
    super(props);
    this.state = {amount:0}
    // this.state.amount = 0;
  }
  componentDidMount(){
    NutrientActions.registerIngredient(this.props.name,this.props.nutrients)

  }
  scaleAmount = (value) =>{
    return this.props.min + (this.props.max - this.props.min)*value;
  }
  unscaleAmount = (value) => {
    return (value-this.props.min)/(this.props.max - this.props.min)
  }
  handleSlider = (evt,value) => {
    console.log(value);
    let adjAmt = this.scaleAmount(value);
    NutrientActions.quantityChange(this.props.name,this.props.nutrients,adjAmt);
    this.setState({amount:value})
  }
  render(){
    return(
      <Cell size='1/3'>
      <Paper className="cell">
        <span>Ingredient: {this.props.name}</span>
        <p>Quantity: {this.scaleAmount(this.state.amount).toFixed(1)} {this.props.unit}</p>
        <Slider ref="slider" onChange={this.handleSlider} description={`Min: ${this.props.min} Max: ${this.props.max}`} name="amount" defaultValue={this.unscaleAmount(this.props.default)}/>
      </Paper>
      </Cell>
    )
  }
}
