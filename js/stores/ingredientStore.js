import Reflux from 'reflux';
import ingredientActions from '../actions/ingredientActions'
import constants from '../constants/constants';
import $ from 'jquery'
import _ from 'underscore'

export default Reflux.createStore({
  init(){
    this.ingredients = [];
    this.listenToMany(ingredientActions);
    this.getList();
  },
  getList(){
    $.get('http://localhost:3000/ingredient/all',ingredients=>{
      this.allIngredients = ingredients;
      this.trigger(constants.ALL_INGREDIENTS,this.allIngredients);
    })
  },
  onAddIngredient(name){
    $.get(`http://localhost:3000/ingredient/${name}`,
      ingredient=>{
        if(this.ingredients.indexOf(ingredient) === -1){
          ingredient.isDisabled = false;
          this.ingredients.push(ingredient);
          this.trigger(constants.NEW_INGREDIENT,this.ingredients)
        }
      }
    )
  },
  onRemoveIngredient(name){
    let ingrd = _.findWhere(this.ingredients,{name});
    let i = this.ingredients.indexOf(ingrd);
    delete this.ingredients[i];
    this.trigger(constants.UPDATE_INGREDIENTS,this.ingredients)
  }
})
