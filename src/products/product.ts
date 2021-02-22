import { Callback, Observable } from '../libs/observer/observable';
import { persistent, Persistent, PersistentProperty } from '../libs/persistent/persistent';
import { ClassProps } from '../libs/types/utility-types';
import { persistentBoolean } from '../data-store/store';

export type PropChangeEvent<T> = Partial<ClassProps<T>>
export type PropChangeCallback<T> = Callback<PropChangeEvent<T>>

export class Product extends Persistent {
	get id() {
		return this._id
	}

	get image_url() {
		return this._image_url
	}

	set stock( value: number ) {
		this.changeProp('stock', value )	
	}

	get stock() {
		return this._stock
	}

	get productName() {
		return this._productName
	}

	get price() {
		return this._price
	}

	get productDescription() {
		return this._productDescription
	}

	set favorite( value: boolean ) {
		this.changeProp( 'favorite', value )
	}

	get favorite() {
		return this._favorite
	}

	/**
	 * Registers a listener to observe property changes on this Item
	 *  
	 * @param cb the listener callback. As a parameter, it takes an object 
	 * containing the changed property as key and the changed value as value
	 */
	onChange( cb: PropChangeCallback<this> ) {
		this._onChange.subscribe( cb )
		return cb
	}

	/**
	 * Removes a listener from the notification list
	 *  
	 * @param cb the listener callback
	 */
	removeOnChange( cb: PropChangeCallback<this> ) {
		this._onChange.unsubscribe( cb )
	}

	/**
	 * Changes the property value and notifies the listeners about the change
	 * 
	 * @param propName the name of the property value. The string is type guarded
	 * 									and therefore only existing property values are accepted
	 * @param value the new value to assing to the property
	 */
	private changeProp<P extends keyof this>( propName: P, value: this[ P ] ): boolean {
		const pName = '_' + propName;

		if ( this[ pName ] !== value ) {
			this[ pName ] = value;
			this._onChange.notify({ [ propName ]: value });
			return true;
		}

		return false;
	}

	@persistent private _id: string
	@persistent private _image_url: string
	@persistent private _stock: number
	@persistent private _productName: string
	@persistent private _price: number
	@persistent private _productDescription: string
	@persistentBoolean private _favorite: boolean

	protected _onChange: Observable<PropChangeEvent<Product>> = new Observable<PropChangeEvent<Product>>()
}
