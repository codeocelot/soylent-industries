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

export default class App extends React.Component{
  constructor(props){
    super(props)
    this.refs = this.refs || {};
    this.a = 'asdf'
    this.state = {ingredients:[
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
    ]}
  }
  makeIngredients = () => {
    return this.state.ingredients.filter(x=>{return !x.isDisabled}).map(indegredient=>{return(<Ingredient {...indegredient } />)})
  }
  makeNutrients = () =>{
    return ['calories','vitaminA','protein'].map(n=>{
      return(<Nutrient name={n}/>)
    })
  }
  _enableIngredient = (evt,val) => {
    console.log(evt,val)
  }
  _makeMenu = () => {
    return this.state.ingredients.map((ingred,i)=>{
      console.log('menu item: ',i)
      return(
        <MenuItem index={i} onItemTouchTap={this._enableIngredient}>
          <input type="checkbox"/>
          {ingred.name}
        </MenuItem>)
      // if(ingred.isDisabled){
      //   return(<MenuItem index={i}>{ingred.name}</MenuItem>)
      // } else {
      //   return(
      //     <MenuItem index={i} checked={true}>
      //       <input type="checkbox" onClick={this._enableIngredient} value={ingred.isDisabled}>{ingred.name}</input>
      //
      //     </MenuItem>)
      // }
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
    console.log('refs are: ', this.refs)
    return(
      <div>
        <AppBar title="Soylent Industries" onLeftIconButtonTouchTap={this._openSidebar}/>
        <Cell size="1">
          <LeftNav ref="leftNav" docked={false}>
            {menu}
          </LeftNav>
        </Cell>
        <Cell size="1">

          {nutrients}
        </Cell>
        <Cell size="1">
          {ingreds}
        </Cell>

      </div>
    )
  }
}
