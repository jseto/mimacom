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
		this.items[ product.id ] = { 
			product: product,
			amount: 1
		}

		product.stock = product.stock - 1

		this._onCartEvent.notify( this.items[ product.id ] )
	}

	modifyAmount( product: Product, increment: number ) {
		if( product.stock - increment < 0 ) throw new Error( CartControllerError.OUT_OF_STOCK )

		const item = this.items[ product.id ]
		item.amount += increment
		product.stock = product.stock - increment

		if ( item.amount === 0 ) delete this.items[ product.id ]

		this._onCartEvent.notify( item )
	}

	onChange( cb: CartEventCallback ) {
		this._onCartEvent.subscribe( cb )
		return cb
	}

	removeOnChange( cb: CartEventCallback ) {
		this._onCartEvent.unsubscribe( cb )
	}

	readonly items: CartItemCollection = {}
	private _onCartEvent: Observable<CartItem> = new Observable<CartItem>()
}