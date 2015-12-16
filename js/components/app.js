import React from 'react'
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

import Ingredient from './ingredient'
import Nutrient from './nutrient'
import ActiveIngredientList from './activeIngredientList'

import {Cell} from 'react-pure'
import _ from 'underscore'
import AppBar from 'material-ui/lib/app-bar'
import LeftNav from 'material-ui/lib/left-nav'
import MenuItem from 'material-ui/lib/menu/menu-item'
import Checkbox from 'material-ui/lib/checkbox'

import {Container,Table} from 'elemental'

import FontAwesome from 'react-fontawesome'

import IngredientList from './ingredientList'

import $ from 'jquery'
import constants from '../constants/constants'

import IngredientStore from '../stores/ingredientStore'

const MyRawTheme = require('../themes/theme');
const ThemeManager = require('material-ui/lib/styles/theme-manager');
// const ThemeDecorator = require('material-ui/lib/styles/theme-decorator');

export default class App extends React.Component{
  constructor(props){
    super(props)
    this.refs = this.refs || {};
    this.a = 'asdf'
    this.state = {
      ingredients:[
        {
          name:'People',
          nutrients:{calories:100,vitaminA:10,protein:40,sugar:20},
          unit:'people',
          min:0,
          max:20,
          default:2,
          isDisabled:false,
        },
        {
          name:'Maltodextrin',
          nutrients:{calories:20,vitaminA:0,protein:7,sugar:5},
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
          name:'Oat Flour',
          nutrients:{calories:3.4,fatCalories:0.63,satCalories:0.135,protein:0.15,carbohydrates:0.15,fibre:0,solFibre:0,sugar:42.57,vitaminA:34,protein:9},
          unit:'grams',
          min:0,
          max:200,
          default:70,
          isDisabled:false,
        },
      ],
      nutrients:[
        {name:'calories',recommended:2000,units:'kcal'},
        {name:'vitaminA',recommended:400,units:'mg'},
        {name:'protein',recommended:500,units:'g'},
        {name:'fatCalories',recommended:700,units:'kcal'},
        {name:'satCalories',recommended:200,units:'kcal'},
        {name:'carbohydrates',recommended:500,units:'g'},
        {name:'fibre',recommended:50,units:'g'},
        {name:'solFibre',recommended:30,units:'g'},
        {name:'sugar',recommended:0,units:'g'}
      ]
    };

  }


  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(MyRawTheme),
    };
  }

  makeIngredients = () => {
    return this.state.ingredients.filter(x=>{return !x.isDisabled}).map((indegredient,i)=>{return(<Ingredient {...indegredient } key={i} />)})
  }
  makeNutrients = () =>{
    return this.state.nutrients.map((n,i)=>{
      return(<Nutrient {...n} key={i}/>)
    })
  }

  _makeMenu = () => {
    return this.state.ingredients.map((ingred,i)=>{
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
  }
  _openSidebar = (evt) => {
    console.log('what',evt)
    // this.refs.leftNav.toggle();
    this.refs.ingredientList.toggle();
  }

  render = () => {
    let ingreds = this.makeIngredients();
    let nutrients = this.makeNutrients();
    let menu = this._makeMenu();

    console.log('refs are: ', this.refs)
    return(
      <div>
        <AppBar title={['Soylent Industries ',<FontAwesome name='rocket'/>]} onLeftIconButtonTouchTap={this._openSidebar} key="icon" style={{textAlign:'center'}} />
        <LeftNav ref="leftNav" docked={false}>
          {menu}
        </LeftNav>
        <IngredientList ref="ingredientList" baseURL="http://localhost:3000"/>
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
            {/*{ingreds}*/}
            <ActiveIngredientList/>
          </Cell>
        </Container>
      </div>
    )
  }
}

App.childContextTypes = {
    muiTheme: React.PropTypes.object,
  }
