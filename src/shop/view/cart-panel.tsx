import React, { Component } from 'react';
import { ProductCard } from '../../products/view/product-card';
import { CartEventCallback } from '../cart-controller';
import { ShopController } from '../shop-controller';
import { ShoppingCartCard } from './shopping-cart-card';

interface CartPanelProps {
	shopController: ShopController
}

export class CartPanel extends Component<CartPanelProps> {
	componentDidMount() {
		const { cart } = this.props.shopController

		this.cartChangeCallback = cart.onChange( event =>{
			this.setState({})
		})
	}

	componentWillUnmount() {
		this.props.shopController.cart.removeOnChange( this.cartChangeCallback )
	}

	render() {
		const { cart } = this.props.shopController

		return (
			<div className="cart-panel">
				<h2>Cart</h2>
				{
					Object.values( cart.items ).map( item => (
						<ShoppingCartCard key={ item.product.id }
							item={ item } 
							shopController = { this.props.shopController } 
						/>
					))
				}
			</div>
		)
	}

	private cartChangeCallback: CartEventCallback
}