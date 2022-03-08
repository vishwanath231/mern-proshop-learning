import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../redux/actions/cartActions';

const PaymentScreen = ({ cart, savePaymentMethod }) => {

    const { shippingAddress } = cart;

    const navigate = useNavigate();

    if (!shippingAddress.address) {
       navigate('/login/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

  
    const submitHandler = (e) => {
      e.preventDefault()

      savePaymentMethod(paymentMethod)
      navigate('/placeorder')
    }


    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='PayPal or Credit Card'
                            id='PayPal'
                            name='paymentMethod'
                            value='PayPal'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                        {/* <Form.Check
                        type='radio'
                        label='Stripe'
                        id='Stripe'
                        name='paymentMethod'
                        value='Stripe'
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check> */}
                    </Col>
                </Form.Group>

                <Button type='submit' variant='primary' className='my-3'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

const mapStateToProps = (state) => ({
    cart: state.cart
})

export default connect(mapStateToProps, { savePaymentMethod })(PaymentScreen);