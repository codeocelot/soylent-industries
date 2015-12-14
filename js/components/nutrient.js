import React from 'react'
import Paper from 'material-ui/lib/paper'
import {Cell} from 'react-pure'
import constants from '../constants/constants'
import _ from 'underscore'
import NutrientStore from '../stores/nutrientStore'
import Case from 'case'

export default class Nutrient extends React.Component{
  constructor(props){
    super(props);
    this.state = {amount:0};
  }
  componentDidMount(){
    NutrientStore.listen((type,data) =>{
      if(type===constants.QUANTITY_CHANGE){
        var vals = _.toArray(data).map(x=>{return (x.nutrients[this.props.name] * x.quantity) || 0 })
        let v = vals.reduce((a,b)=>{return a+b},0)
        console.log(this.props.name,v);
        this.setState({amount:v})
      }

    })
  }
  render(){
    return(
        <tr>
          <td>{Case.title(this.props.name)}</td>
          <td>{Math.round(this.state.amount)} {this.props.units}</td>
          <td>{this.props.recommended} {this.props.units}</td>
        </tr>

    )
  }
}
