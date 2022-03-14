import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import { listProductDetails } from '../redux/actions/productActions';
import { connect } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';


const ProductScreen = ({ listProductDetails, productDetails }) => {

    const { id } = useParams();

    const [qty, setQty ] = useState(1);

    useEffect(() => {
        listProductDetails(id);
    }, [listProductDetails, id]);

    const navigate = useNavigate();

    const addToCartHandler = () => {
        navigate(`/cart/${id}?qty=${qty}`)
    }


    const { loading, error, product } = productDetails; 
    return (
        <>
            <Link className='btn btn-light my-3' to='/'>
                Go Back
            </Link>
            { 
                loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :           
                <Row>
                    <Col md={6}>
                        <Image src={product.image} alt={product.name} fluid />
                    </Col>
                    <Col md={3}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>{product.name}</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Description: ${product.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>

                    <Col md={3}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col>
                                            <strong>${product.price}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>
                                            {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                {product.countInStock > 0 && (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Qty</Col>
                                            <Col>
                                                <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                                                    {
                                                        [...Array(product.countInStock).keys()].map((x) => (
                                                            <option key= {x + 1} value={x + 1}>{x + 1}</option>
                                                        ))
                                                    }
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )}

                                <ListGroup.Item>
                                    <Button 
                                        className='btn-block' 
                                        type='button' 
                                        disabled={product.countInStock === 0}
                                        onClick={addToCartHandler}
                                    >Add To Cart</Button>
                                </ListGroup.Item>

                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            }

        </>
    )
}


const mapStateToProps = (state) => ({
    productDetails: state.productDetails
})

export default connect( mapStateToProps , { listProductDetails })(ProductScreen);