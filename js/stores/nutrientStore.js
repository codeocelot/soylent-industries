import Reflux from 'reflux'
import NutrientActions from '../actions/nutrientActions'
import constants from '../constants/constants'
import $ from 'jquery'

export default Reflux.createStore({
  init(){
    this.nutrientMix = {};
    this.listenToMany(NutrientActions);
  },
  onQuantityChange(name,nutrients,quantity){
    this.nutrientMix[name] = {nutrients,quantity};
    delete this.nutrientMix['name']
    this.trigger(constants.QUANTITY_CHANGE,this.nutrientMix);
  },
  onRegisterIngredient(nutrient){
    this.nutrientMix[nutrient.name] = nutrient;
    this.trigger(constants.QUANTITY_CHANGE,this.nutrientMix)
  },
  // showIngredient(name){
  //   $.get(`http://localhost:3000/ingredient/${name}`,
  //   ingredient=>{
  //     this.nutrientMix[nutrient.name] = nutrient;
  //     this.trigger(constants.NEW_INGREDIENT,this.nutrientMix)
  //   })
  // }

})
