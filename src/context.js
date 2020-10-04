import React, { Component } from 'react';
import {book_data, detailProduct} from './book_data';
//import {detailProduct} from './data';


const ProductContext = React.createContext(); 
//context object that comes with 2 components:
//Provider -provides all info
//Consumer -to use info


class ProductProvider extends Component {
    //React Context API

    state={ //the state that holds all of the information of products, added to cart etc.
        products: [],
        productsByHighest: [],
        productsByLowest: [],
        productsByCoreBooks: [],
        detailProduct: detailProduct,
        cart: [],
        modalOpen: false,
        modalProduct: detailProduct,
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0
    }

    componentDidMount() {
        //Every time the web page loads, a full copy of all of the store products are made so that the og data is untouched
        this.setProducts();
        this.sortProducts();
    }

    setProducts = () => { 
        //This allows to have a full copy of the data 
        //that is to be changed, without mutating the og. copy
        let tempProducts = [];
        book_data.forEach(item => {
            const singleItem = {...item};
            tempProducts = [...tempProducts, singleItem];
        })
        this.setState((()=> {
            return {products: tempProducts};
        }))
    };


    sortProducts = () => {
        let book_products = [];
        book_data.forEach(item => {
            const singleItem = {...item};
            book_products = [...book_products, singleItem];
        })

        let highestToLowPrice = this.getHighestToLowest(book_products);
        let lowestToHighPrice = this.getLowestToHighest(book_products);
        let coreBooks = this.getCoreBooks(book_products);

        this.setState((()=> {
            return {productsByHighest: highestToLowPrice, productsByLowest: lowestToHighPrice, 
                productsByCoreBooks: coreBooks};
        }))
    };

    getHighestToLowest = (book_products) => { //return list of sorted products 
        let sorted_list = [...book_products];

        function compare( a, b ) {
            if ( a.price > b.price ){
              return -1;
            }
            if ( a.price < b.price ){
              return 1;
            }
            return 0;
          }

        sorted_list.sort( compare );

        return sorted_list;
    }

    getLowestToHighest = (book_products) => { //return list of sorted products 
        let sorted_list = [...book_products];

        function compare( a, b ) {
            if ( a.price < b.price ){
              return -1;
            }
            if ( a.price > b.price ){
              return 1;
            }
            return 0;
          }

        sorted_list.sort( compare );

        return sorted_list;
    }

    getCoreBooks = (book_products) => { //return list of sorted products 
        let result = [];

        book_products.forEach( item => { //this is how you traverse through an array of objects.
            if(item.category === 'core') result.push(item)
        })

        return result;

    }


    getItem = (id) => { //Identifies and returns the specified product by its id
        const product = this.state.products.find(item => item.id === id); 
        return product;
    };

    handleDetail = (id) => { //gets the specified product and getting its detail page set up
        const product = this.getItem(id);
        this.closeModal()
        this.setState(() => {
            return {detailProduct: product}
        })
    };

    addToCart = (id) => { //Adds the selected product into the cart arr so it appears on the shopping cart.
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;
        this.setState(()=> {
            return {products: tempProducts, cart:[...this.state.cart, product]};
        },
        () =>{this.addTotals()}
        )

    };


    openModal = id => { //opens a modal page in the products page
        const product = this.getItem(id);
        this.setState(() => {
            return {modalProduct: product, modalOpen: true};
        });
    };

    closeModal = () => { //closes the modal page in the products page
        this.setState( () => {
            return {modalOpen:false};
        })
    }

    increment = (id) => { //increases the quantity of an item added in the cart by 1
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item=> item.id===id);

        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];

        product.count = product.count +1;
        product.total = product.count * product.price;

        this.setState(() =>{return{cart:[...tempCart]}},()=>{this.addTotals()})
    
    }

    decrement = (id) =>{ //decreases the quantity of an item added in the cart by 1
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item=> item.id===id);

        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];

        product.count = product.count -1;
        if(product.count === 0) {
            this.removeItem(id)
        } else {
            product.total = product.count * product.price;
            this.setState(() =>{return{cart:[...tempCart]}},()=>{this.addTotals()})

        }

    
    }


    removeItem = (id) =>{ //Connected to a button that removes an item from the cart
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];

        tempCart = tempCart.filter(item => item.id !== id);

        const index = tempProducts.indexOf(this.getItem(id));
        let removedProduct = tempProducts[index];
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;

        this.setState(()=> {
            return {
                cart: [...tempCart],
                products: [...tempProducts]
            }
        }, ()=> {
            this.addTotals();
        })
    }

    clearCart = () =>{ //Clears the cart of any products that might have been stored, while clearing up the state and its totals
        this.setState( () => {
            return {cart:[]};
        }, ()=> {
           this.setProducts();
           this.addTotals();
        })
    }

    addTotals = () =>{ //Calculates the totaled money from the amount of products and the tax applied
        let subtotal = 0;
        this.state.cart.map(item => {
            subtotal += item.total;
        })
        const tempTax = subtotal *0.1;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subtotal + tax;

        this.setState(() => {
            return {
                cartSubTotal:subtotal, 
                cartTax:tax,
                cartTotal:total
            }
        })
    }


    render() { //should sit on top of the whole application so it could be accessed. -->index.js
        return (
            <ProductContext.Provider value={{
                ...this.state, 
                handleDetail: this.handleDetail,
                addToCart: this.addToCart,
                openModal: this.openModal,
                closeModal:this.closeModal,
                increment: this.increment,
                decrement: this.decrement, 
                removeItem: this.removeItem,
                clearCart: this.clearCart,
                sortProducts: this.sortProducts

            }}> 
                {this.props.children}
            </ProductContext.Provider>
        )

    } 

}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer};