import React, { Component } from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import '../App.css';
import {ProductConsumer} from '../context';
import PropTypes from 'prop-types';

export default class Product extends Component {

    render() {
        const {id, title, img, price, inCart} = this.props.product;
        return (
            <ProductWrapper  className='col-9 mx-auto col-md-6 col-lg-3 my-3'>
            <ProductConsumer>
            {value => (   
                <div className='card' onClick={() => {
                                // value.addToCart(id);
                                value.openModal(id);
                            }} >
      
                        <div className='img-container p-5'>
                            <img src={img} alt='product' className='card-img-top'/>

                        </div>


                        <div className='card-footer d-flex justify-content-between'>
                            <p className='align-self-center mb-0'>
                                {title}
                            </p>
                            <h6 className='text-blue font-italic mb-0'>
                                <span className='mr-1'>${price}</span>
                            </h6>
                        </div>
                </div>
                )}
                </ ProductConsumer>
            </ProductWrapper>

        )
    } 

}


Product.propTypes = {  // This is to show of any errors of types that occur within the app.
    product: PropTypes.shape({
        id:PropTypes.number,
        img: PropTypes.string,
        title: PropTypes.string,
        price: PropTypes.number,
        inCart: PropTypes.bool
    }).isRequired
}


const ProductWrapper = styled.div`
    .card{
        position: relative;
        cursor: pointer;
    }
    .card-footer{
        background: transparent;
        border-top: transparent;
        background:rgba(247, 247,247);
    }
    
    .img-container {
        position: relative;
        overflow:hidden;
    }
    .card-img-top {
        transition: all 0.2s linear;
    }
    .img-container:hover .card-img-top {
        transform: scale(1.08);
    }

`;