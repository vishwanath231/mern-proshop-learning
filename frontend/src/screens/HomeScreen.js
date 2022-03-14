import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listProducts } from '../redux/actions/productActions';
import { connect } from 'react-redux';

const HomeScreen = ({ listProducts, productList }) => {

    useEffect(() => {
        listProducts();
    }, [listProducts]);

    const { loading, error, products } = productList;

    return (
        <>
           
           <h1>Latest Products</h1>
            {   loading ? <Loader /> : 
                error ? <Message variant='danger'>{error}</Message> : 
                <Row>
                    {products.map((product) => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row> 
            }
        </>
    )
}

const mapStateToProps = (state) => ({
    productList: state.productList
})

export default connect(mapStateToProps, { listProducts })(HomeScreen);