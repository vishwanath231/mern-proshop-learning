import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Table, Form, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector }from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../redux/actions/userActions';
import { listMyOrders } from '../redux/actions/orderActions';

const ProfileScreen = () => {

    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })
    const [message, setMessage] = useState(null);


    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const { success } = userUpdateProfile;

    const orderListMy = useSelector(state => state.orderListMy);
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

    const navigate = useNavigate();

    useEffect(() => {
        
        if (!userInfo) {
            navigate('/login')   
        }else{
            if (!user.name) {
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            }else {
                setData({
                    name: user.name,
                    email: user.email,
                    password: '',
                    password2: ''
                })
            }
        }

    }, [dispatch, navigate, user, userInfo]);



    const changeHandler = e => {
        const { name, value } = e.target;

        setData({
            ...data,
            [name]: value
        })
    }

    const submitHandler = e => {
        e.preventDefault()
       
        if (data.password !== data.password2) {
            setMessage('Password do not match')
        }else{
            dispatch(updateUserProfile({
                id: user._id,
                name: data.name,
                email: data.email,
                password: data.password
            }))
        }
    }


    return (
        <Row>
        <Col md={3}>
            <h2>User Profile</h2>
            {message && <Message variant='danger'>{message}</Message>}
            {success && <Message variant='success'>Profile Updated</Message>}
            {loading ? (
            <Loader />
            ) : error ? (
            <Message variant='danger'>{error}</Message>
            ) : (
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='name'
                        placeholder='Enter name'
                        name='name'
                        value={data.name}
                        onChange={changeHandler}
                    ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        name='email'
                        value={data.email}
                        onChange={changeHandler}
                    ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        name='password'
                        value={data.password}
                        onChange={changeHandler}
                    ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='confirmPassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Confirm password'
                            name='password2'
                            value={data.password2}
                            onChange={changeHandler}
                        ></Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary'>
                        Update
                    </Button>
                </Form>
            )}
        </Col>
        <Col md={9}>
            <h2>My Orders</h2>
            {loadingOrders ? (
            <Loader />
            ) : errorOrders ? (
            <Message variant='danger'>{errorOrders}</Message>
            ) : (
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>DELIVERED</th>
                        <th></th>
                </tr>
                </thead>
                    <tbody>
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.createdAt.substring(0, 10)}</td>
                            <td>{order.totalPrice}</td>
                            <td>
                                {order.isPaid ? (
                                order.paidAt.substring(0, 10)
                                ) : (
                                <i className='fas fa-times' style={{ color: 'red' }}></i>
                                )}
                            </td>
                            <td>
                                {order.isDelivered ? (
                                order.deliveredAt.substring(0, 10)
                                ) : (
                                <i className='fas fa-times' style={{ color: 'red' }}></i>
                                )}
                            </td>
                            <td>
                                <LinkContainer to={`/order/${order._id}`}>
                                    <Button className='btn-sm' variant='light'>
                                        Details
                                    </Button>
                                </LinkContainer>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            )}
        </Col>
    </Row>
    )
}


export default ProfileScreen;