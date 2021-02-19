import { Callback, Observable } from '../libs/observer/Observable';
import { persistent, Persistent, PersistentProperty } from '../libs/persistent/persistent';
import { ClassProps } from '../libs/types/utility-types';

type PropChangeEvent<T> = Partial<ClassProps<T>>
type PropChangeCallback<T> = Callback<PropChangeEvent<T>>

export class Item extends Persistent {
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
	changeProp<P extends keyof this>( propName: P, value: this[ P ] ): boolean {
		const pName = '_' + propName;

		if ( this[ pName ] !== value ) {
			this[ pName ] = value;
			this._onChange.notify({ [ propName ]: value });
			return true;
		}

		return false;
	}

	@persistent _id: string
	@persistent _image_url: string
	@persistent _stock: number
	@persistent _productName: string
	@persistent _price: number
	@persistent _productDescription: string
	@persistentBoolean _favorite: boolean

	protected _onChange: Observable<PropChangeEvent<Item>> = new Observable<PropChangeEvent<Item>>()
}

//TODO: move persistent boolean to DataStore

/**
 * This decorator transforms a boolean value to match the database boolean format.
 * The true value is converted to literal "1" and false to "0"
 */
export function persistentBoolean( target: Persistent, property: string ) {

	const persistentProperty: PersistentProperty = {
		name: property,
		toObjectSpecial: ( value: boolean ) => value? '1' : '0',
		fromObjectSpecial: ( value: string ) => value === '1'
	}

	if ( !target[ '_persistentProperties' ] )	target[ '_persistentProperties' ]  = [];
	target[ '_persistentProperties' ].push( persistentProperty )
}
