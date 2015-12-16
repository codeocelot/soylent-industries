import React from 'react'
import Paper from 'material-ui/lib/paper'
import {Cell} from 'react-pure'
import constants from '../constants/constants'
import _ from 'underscore'
import NutrientStore from '../stores/nutrientStore'
import Case from 'case'
import FontAwesome from 'react-fontawesome'

export default class Nutrient extends React.Component{
  constructor(props){
    super(props);
    this.state = {amount:0};
  }
  componentDidMount(){
    NutrientStore.listen((type,data) =>{
      debugger;
      if(type===constants.QUANTITY_CHANGE){
        var vals = _.toArray(data).map(x=>{
          var nutr = _.findWhere(x.nutrients,{nutrdesc:this.props.nutrdesc});
          if(!nutr || !nutr.nutr_val) return 0;
          return +nutr.nutr_val * x.quantity || 0;
          // return (x.nutrients[this.props.name] * x.quantity) || 0
        })

        let v = vals.reduce((a,b)=>{return a+b},0)
        this.setState({amount:v})
      }

    })
  }
  render(){
    let isMet = this.state.amount >= this.props.recommended;
    debugger;
    return(
        <tr>
          <td>{Case.title(this.props.nutrdesc)}</td>
          <td>{Math.round(this.state.amount)} {this.props.units}</td>
          <td>
            {this.props.recommended} {this.props.units}
             {isMet?
               <FontAwesome name='check' style={{color:'green'}}/>
              :
               <FontAwesome name='times' style={{color:'red'}}/>
            }
          </td>
        </tr>

    )
  }
}
