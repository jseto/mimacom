import React, { Component } from 'react';
import { ShopController } from '../../shop/shop-controller';
import { Product } from '../product';
import { ProductCard } from './product-card';
import './product-catalog.scss'

interface ProductCatalogState {
	productBuffer: Product[]
}

interface ProductCatalogProps {
	shopController: ShopController
}

export class ProductCatalog extends Component<ProductCatalogProps, ProductCatalogState> {
	constructor( props ) {
		super( props )
		this.state = { 
			productBuffer: []
		}
	}

	async componentDidMount() {
		await this.props.shopController.init()

		this.setState({
			productBuffer: this.props.shopController.products
		})
	}

	render() {
		const { productBuffer } = this.state
		const { shopController } = this.props

		return (
			<div className="product-catalog">
				{
					productBuffer?.map( item => (
						<ProductCard key={ item.id} 
							product={ item } 
							shopController={ shopController }
						/>
					))
				}
			</div>
		)
	}
}
