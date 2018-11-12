import React, { Component } from 'react';
import Auxilliary from '../hoc/Auxilliary/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';

import Modal from '../../components/UI/Modal/Modal';

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
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }

updatePurchaseState (ingredients){
    const sum = Object.keys(ingredients)
    .map(igKey =>{
        return ingredients[igKey]
    })
    .reduce((sum, el)=>{
        return sum + el;
    }, 0);
    this.setState({purchasable: sum > 0});
}

addIngredientHandler = (type) =>{

    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;
    const priceAddtn = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddtn;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
    this.updatePurchaseState(updatedIngredients);
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
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDdctn;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
    this.updatePurchaseState(updatedIngredients);
}

purchaseHandler = ()=>{
this.setState({purchasing: true});
}

purchaseCancelHandler = () => {
    this.setState({purchasing : false});
}

purchaseContinueHandler = () =>{
    const order = {
        ingredients: this.state.ingredients,
        price: this.state.totalPrice,
        customer: {
            name: "Gabe Eipper",
            address: {
                street: 'testStreet Suite',
                country: 'US',
                state: 'PA',
                zip: 17011
            },
            email: 'test@test.com',
        },
        delivery: 'fastest'
    }
    axios.post('/orders.json', order)
    .then(response => console.log(response))
    .catch(err => console.log(err));
    //alert('You continue!');
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
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >
                    <OrderSummary 
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice}
                    purchaseCancelled = {this.purchaseCancelHandler}
                    purchaseContinued = {this.purchaseContinueHandler} />    
                </Modal> 

                <Burger ingredients={this.state.ingredients}/>e
                <BuildControls
                ingredientAdded={this.addIngredientHandler}  
                ingredientRemoved={this.removeIngredientHandler}   
                disabled={disableInfo} 
                purchasable={this.state.purchasable} 
                ordered={this.purchaseHandler}
                price={this.state.totalPrice}/> 
            </Auxilliary>
        );
    }
}

export default BurgerBuilder;