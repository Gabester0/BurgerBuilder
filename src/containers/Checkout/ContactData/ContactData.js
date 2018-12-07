import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {

    state = {
        name: "",
        email: "",
        address: {
            street: "",
            postalCode: ""
        },
        loading: false
    }

orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);
     this.setState( { loading: true } );
     const order = {
         ingredients: this.props.ingredients,
         price: this.props.price,
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
     .then(response => { this.setState( { loading: false} );
     this.props.history.push('/');
     } )
     .catch(err => {
         console.log(err);
         this.setState( { loading: false} );
     });
    }

    render(){
        let form = ( <form>
            <input className={classes.Input} type="text" name="name" placeholder="Your name"></input>
            <input className={classes.Input} type="email" name="email" placeholder="Your email"></input>
            <input className={classes.Input} type="text" name="address" placeholder="Your address"></input>
            <input className={classes.Input} type="text" name="postalCode" placeholder="Your postal code"></input>
            <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>);
        if(this.state.loading){
            form = <Spinner/>;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact info</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;