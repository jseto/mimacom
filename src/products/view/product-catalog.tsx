import React, { Component } from 'react';
import { Store } from '../../data-store/store';
import { Product } from '../product';
import { ProductCard } from './product-card';
import './product-catalog.scss'

interface ProductCatalogState {
	currentPage: number
	itemsPerPage: number
	productBuffer: Product[]
}

export class ProductCatalog extends Component<{}, ProductCatalogState> {
	constructor( props ) {
		super( props )
		this.state = { 
			currentPage: 1,
			itemsPerPage: 10,
			productBuffer: []
		}
	}

	async componentDidMount() {
		this.setState({
			productBuffer: [ 
				...await Store.instance.getItems( this.state.currentPage ),
				...await Store.instance.getItems( this.state.currentPage + 1 ),
				...await Store.instance.getItems( this.state.currentPage + 2 )
			]
		})
	}

	private async loadMoreProducts() {
		const products = await Store.instance.getItems( this.state.currentPage + 1 )

		this.setState( prevState => ({
			productBuffer: prevState.productBuffer.concat( products ).slice( this.state.itemsPerPage )
		}))
	}

	render() {
		const { productBuffer } = this.state

		return (
			<div className="product-catalog">
				{
					productBuffer?.map( item => (
						<ProductCard key={ item.id} product={ item } />
					))
				}
			</div>
		)
	}

	// private productBuffer: Product[]	//TODO: convert to a linked link to easily get rid of previous products
}
