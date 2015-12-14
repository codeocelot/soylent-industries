import React from 'react'
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();
import Ingredient from './ingredient'
import Nutrient from './nutrient'
import {Cell} from 'react-pure'
import _ from 'underscore'
import AppBar from 'material-ui/lib/app-bar'
import LeftNav from 'material-ui/lib/left-nav'
import MenuItem from 'material-ui/lib/menu/menu-item'
import Checkbox from 'material-ui/lib/checkbox'

import {Container,Table} from 'elemental'

import FontAwesome from 'react-fontawesome'

// import {Table,TableBody,TableFooter,TableHeader,TableHeaderColumn,TableRow,TableRowColumn} from 'material-ui/lib/table'
// import Table from 'material-ui/lib/table/table'
// import TableBody from 'material-ui/lib/table/table-body'
// import Card from 'material-ui/lib/card/card'
// import CardActions from 'material-ui/lib/card/card-actions'
// import CardTitle from 'material-ui/lib/card/card-title'
// import CardText from 'material-ui/lib/card/card-text'
// import CardExpandable from 'material-ui/lib/card/card-expandable'

export default class App extends React.Component{
  constructor(props){
    super(props)
    this.refs = this.refs || {};
    this.a = 'asdf'
    this.state = {
      ingredients:[
        {
          name:'People',
          nutrients:{calories:100,vitaminA:10,protein:40},
          unit:'people',
          min:0,
          max:20,
          default:2,
          isDisabled:false,
        },
        {
          name:'Maltodextrin',
          nutrients:{calories:20,vitaminA:0,protein:7},
          unit:'cups',
          min:0,
          max:20,
          default:5,
          isDisabled:false,

        },
        {
          name:'Rice Starch',
          nutrients:{calories:50,vitaminA:20,protein:8},
          unit:'cups',
          min:0,
          max:20,
          default:1,
          isDisabled:true,

        },
        {
          name:'Oat Powder',
          nutrients:{calories:45,vitaminA:34,protein:9},
          units:'grams',
          min:0,
          max:200,
          default:100,
          isDisabled:false,
        }
      ],
      nutrients:[
        {name:'calories',recommended:2000,units:'kcal'},
        {name:'vitaminA',recommended:400,units:'mg'},
        {name:'protein',recommended:500,units:'g'}
      ]
    }
  }
  makeIngredients = () => {
    return this.state.ingredients.filter(x=>{return !x.isDisabled}).map(indegredient=>{return(<Ingredient {...indegredient } />)})
  }
  makeNutrients = () =>{
    return this.state.nutrients.map(n=>{
      return(<Nutrient {...n}/>)
    })
  }
  _enableIngredient = (evt,val,name) => {
    let ing = _.findWhere(this.state.ingredients,{name});
    ing.isDisabled = !val;
    // this.state.ingredients[name].isDisabled = val;
    this.setState(this.state)
  }
  _makeMenu = () => {
    return this.state.ingredients.map((ingred,i)=>{
      console.log('menu item: ',i)
      return(
        <Checkbox
          name={ingred.name}
          label={ingred.name}
          defaultChecked={!ingred.isDisabled}
          onCheck={(evt,val)=>{this._enableIngredient(evt,val,ingred.name)}}
          />
      )
    })
  }
  _openSidebar = (evt) => {
    console.log('what',evt)
    this.refs.leftNav.toggle();
  }

  render = () => {
    let ingreds = this.makeIngredients();
    let nutrients = this.makeNutrients();
    let menu = this._makeMenu();
    // let tableOptions = {
    //   fixedHeader: true,
    //   fixedFooter: true,
    //   stripedRows: false,
    //   showRowHover: true,
    //   selectable: true,
    //   multiSelectable: false,
    //   enableSelectAll: false,
    //   deselectOnClickaway: true,
    //   height: '300px',
    // };
    console.log('refs are: ', this.refs)
    return(
      <div>
        <AppBar title={['Soylent Industries',<FontAwesome name='rocket'/>]} onLeftIconButtonTouchTap={this._openSidebar} />
        <LeftNav ref="leftNav" docked={false}>
          {menu}
        </LeftNav>
        <Container>
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
          <Cell size="1">
            {ingreds}
          </Cell>
        </Container>
      </div>
    )
  }
}
