import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingAddress } from '../redux/actions/cartActions';

const ShippingScreen = ({ cart, saveShippingAddress }) => {

    const { shippingAddress } = cart;

    const [data, setData] = useState({
        address: shippingAddress.address,
        city: shippingAddress.city,
        postalCode: shippingAddress.postalCode,
        country: shippingAddress.country
    });


    const changeHandler = e => {
        const { name, value } = e.target;

        setData({
            ...data,
            [name]: value
        })
    }

    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault()
        
        saveShippingAddress(data);
        navigate('/payment')
    }


    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter address'
                        value={data.address}
                        required
                        name='address'
                        onChange={changeHandler}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter city'
                        value={data.city}
                        required
                        name='city'
                        onChange={changeHandler}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='postalCode'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter postal code'
                        value={data.postalCode}
                        required
                        name='postalCode'
                        onChange={changeHandler}
                ></Form.Control>
                </Form.Group>

                <Form.Group controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter country'
                        value={data.country}
                        required
                        name='country'
                        onChange={changeHandler}
                    ></Form.Control>
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

export default connect(mapStateToProps, { saveShippingAddress })(ShippingScreen);