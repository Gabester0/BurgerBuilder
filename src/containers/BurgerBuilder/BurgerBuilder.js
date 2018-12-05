import React, { Component } from 'react';
import Auxilliary from '../hoc/Auxilliary/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';

import Modal from '../../components/UI/Modal/Modal';

const INGREDIENT_PRICES = {
    salad : 0.5,
    cheese : 0.4,
    meat : 1.3,
    bacon : 0.7
};

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: null
    }

componentDidMount () {
    axios.get('https://gabe-burger.firebaseio.com/ingredients.json')
    .then(response => {
        this.setState( { ingredients : response.data } );
    })
    .catch(error =>{ this.setState( { error: true } )});
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
    // this.setState( { loading: true } );
    // const order = {
    //     ingredients: this.state.ingredients,
    //     price: this.state.totalPrice,
    //     customer: {
    //         name: "Gabe Eipper",
    //         address: {
    //             street: 'testStreet Suite',
    //             country: 'US',
    //             state: 'PA',
    //             zip: 17011
    //         },
    //         email: 'test@test.com',
    //     },
    //     delivery: 'fastest'
    // }
    // axios.post('/orders.json', order)
    // .then(response => { this.setState( { loading: false , purchasing: false} );
    // } )
    // .catch(err => {
    //     console.log(err);
    //     this.setState( { loading: false , purchasing: false} );
    // });
    this.props.history.push('/checkout');
}

    render () {
        const disableInfo = {
            ...this.state.ingredients
        };
        for (let key in disableInfo){
            disableInfo[key] = disableInfo[key]<= 0
        }
        
        let orderSummary = null;
        let burger = this.state.error ? <p>Burger Ingredients Can't be Loaded!</p> : <Spinner/>; 

        if(this.state.ingredients){
            burger =  (
                    <Auxilliary>
                        <Burger ingredients={this.state.ingredients}/>
                        <BuildControls
                            ingredientAdded={this.addIngredientHandler}
                            ingredientRemoved={this.removeIngredientHandler}
                            disabled={disableInfo} 
                            purchasable={this.state.purchasable} 
                            ordered={this.purchaseHandler}
                            price={this.state.totalPrice}/>
                    </Auxilliary>
            );
            orderSummary = <OrderSummary 
                            ingredients={this.state.ingredients}
                            price={this.state.totalPrice}
                            purchaseCancelled = {this.purchaseCancelHandler}
                            purchaseContinued = {this.purchaseContinueHandler} />;
            }
            if(this.state.loading){
                orderSummary = <Spinner />;
            }
        return (
            <Auxilliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >
                    {orderSummary}
                </Modal> 
                {burger}
            </Auxilliary>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);