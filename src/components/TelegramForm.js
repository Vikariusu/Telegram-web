import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import { config } from '../Constants'
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const characterLimit = 300;

class TelegramForm extends Component {
    state = {
        message: ''
    }

    onInputChange = (e) => {
        const value = e.target.value;
        const inputName = e.target.name;
        this.setState(() => ({ [inputName]: value }));
    }

    // handleSubmit = async () => {
    //     // handle submitting the form
    //     const url = "http://localhost:3000/telegrams";

    //     const rawResponse = await fetch(url, {
    //         method: "POST",
    //         headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(this.state),
    //     });
    //     const content = await rawResponse.json();

    //     console.log(content);
    // }

    handleToken = async (token) => {
        const product = {
            name: 'Telegram',
            price: 2.5,
            description: 'a telegram'
        };
        // new
        const telegram = {
          message: this.state.message
        }

        // telegram added
        const body = { token, product, telegram };
        console.log(body)
        const url = `${config.url.API_URL}/checkout`;

        const rawResponse = await fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        const content = await rawResponse.json();

        const { status } = content;

        if (status === 'success') {
          toast('Success! Check email for details',
          { type: 'success'})

          // redirect to the Confirmation page
          // TODO: store the last telegram in localStorage
          this.props.history.push({
            pathname: '/confirmation',
            message: telegram.message
          })
        } else {
            toast('Something went wrong', {
                type: 'error'
            })
        }
    }

    render() {
        const charsLeft = characterLimit - this.state.message.length;

        return (
          <div>
            <form>
              <label htmlFor="message">Message</label>
              <textarea onChange={this.onInputChange} name="message" />
              <p>Characters left: 
                <span className={charsLeft > 0 ? 'chars-green' : 'chars-red'}>{charsLeft}</span>
              </p>
            </form>
              <StripeCheckout
                stripeKey="pk_test_JVMoB5wKqBGDEaxya5HSd0gg00zDywCZMr"
                token={this.handleToken}
                billingAddress
                shippingAddress
                amount={250}
                name="telegram"
              >
              <button disabled={charsLeft < 0}>
                Send Telegram
              </button>
              </StripeCheckout>
          </div>
        );
    }
}

export default withRouter(TelegramForm);