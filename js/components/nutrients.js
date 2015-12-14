import React from 'react'
import NutrientStore from '../stores/nutrientStore'
import {Cell} from 'react-pure'

export default class Nutrients extends React.Component{
  constructor(props){
    super(props);

  }
  render(){
    return(
      <Cell size='1'>
        {this.props.children}
      </Cell>
    )
  }
}
