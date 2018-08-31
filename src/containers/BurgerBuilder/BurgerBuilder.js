import React, { Component } from 'react';
import Auxilliary from '../hoc/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad : 0.5,
    cheese : 0.4,
    meat : 1.3,
    bacon : 0.7
};

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            meat: 0,
            bacon: 0,
            cheese: 0
        },
        totalPrice: 4
    }

addIngredientHandler = (type) =>{

    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;
    const priceAddtn = INGREDIENT_PRICES[type];
    const oldPrice = this.state.ingredients.totalPrice;
    const newPrice = oldPrice + priceAddtn;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
}

removeIngredientHandler = (type) =>{
    const oldCount = this.state.ingredients[type];
    if(oldCount <= 0){
        return;
    }
    const updatedCount = oldCount -1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;
    const priceDdctn = INGREDIENT_PRICES[type];
    const oldPrice = this.state.ingredients.totalPrice;
    const newPrice = oldPrice - priceDdctn;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients})

}

    render () {
        const disableInfo = {
            ...this.state.ingredients
        };
        for (let key in disableInfo){
            disableInfo[key] = disableInfo[key]<= 0
        }
        return (
            <Auxilliary>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                ingredientAdded={this.addIngredientHandler}  
                ingredientRemoved={this.removeIngredientHandler}   
                disabled={disableInfo}  /> 
            </Auxilliary>
        );
    }
}

export default BurgerBuilder;