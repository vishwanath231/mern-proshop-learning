import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector }from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../redux/actions/userActions';

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

    const navigate = useNavigate();

    useEffect(() => {
        
        if (!userInfo) {
            navigate('/login')   
        }else{
            if (!user.name) {
                dispatch(getUserDetails('profile'))
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
    </Row>
    )
}


export default ProfileScreen;