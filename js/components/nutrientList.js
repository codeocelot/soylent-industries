import React from 'react'
import NutrientStore from '../stores/nutrientStore'
import {Cell} from 'react-pure'
import {Table} from 'elemental'
import Nutrient from './nutrient'
import constants from '../constants/constants'

export default class NutrientList extends React.Component{
  constructor(props){
    super(props);
    this.state = {nutrients:[]}
  }
  componentDidMount = () =>{
    NutrientStore.listen((type,data)=>{
      switch(type){
        case constants.ALL_NUTRIENTS:
          this.setState({nutrients:data})
          break;
      }
    })
  }
  render(){
    let nutrients = this.state.nutrients.map((n,i)=>{
      return(<Nutrient {...n} key={i}/>)
    })
    return(
      <Table style={{width:"100%"}}>
        <colgroup>
          <col width="70%" />
          <col width=""/>
          <col width="15%"/>
        </colgroup>
        <thead>
          <tr>
            <th>Nutrient</th>
            <th>Quantity</th>
            <th>Recommended Amount</th>
          </tr>
        </thead>
        <tbody>
          {nutrients}
        </tbody>
      </Table>
    )
  }
}
