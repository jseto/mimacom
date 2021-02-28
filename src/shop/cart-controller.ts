import { DataStore } from '../data-store/data-store';
import { Callback, Observable } from '../libs/observer/observable';
import { Product } from '../products/product';

export interface CartItem {
	product: Product
	amount: number
}

interface CartItemCollection {
	[ id: string ]: CartItem
}

export type CartEventCallback = Callback<CartItem>

const CartControllerError = {
	OUT_OF_STOCK: 'Out of stock'
}

export class CartController {

	add( product: Product ) {
		if ( this.itemCollection[ product.id ] ) {
			this.itemCollection[ product.id ].amount++
		}
		else {
			this.itemCollection[ product.id ] = { 
				product: product,
				amount: 1
			}
		}
		
		product.stock = product.stock - 1

		this._onCartEvent.notify( this.itemCollection[ product.id ] )
	}

	modifyAmount( product: Product, increment: number ) {
		if( product.stock - increment < 0 ) throw new Error( CartControllerError.OUT_OF_STOCK )

		const item = this.itemCollection[ product.id ]
		item.amount += increment
		product.stock = product.stock - increment

		if ( item.amount === 0 ) delete this.itemCollection[ product.id ]

		this._onCartEvent.notify( item )
	}

	checkOut() {
		this.items.forEach( item =>{
			console.log( item.product.stock )
			DataStore.instance.updateItem( item.product )
		})
		this._itemCollection = {}
		this._onCartEvent.notify( null )
	}

	onChange( cb: CartEventCallback ) {
		this._onCartEvent.subscribe( cb )
		return cb
	}

	removeOnChange( cb: CartEventCallback ) {
		this._onCartEvent.unsubscribe( cb )
	}

	get items() {
		return Object.values( this.itemCollection )
	}

	get itemCollection() {
		return this._itemCollection
	}

	private _itemCollection: CartItemCollection = {}
	private _onCartEvent: Observable<CartItem> = new Observable<CartItem>()
}