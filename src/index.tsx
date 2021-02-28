import React, { useEffect, useState } from "react"
import { render } from "react-dom";
import { RestStore } from './data-store/rest-store';
import { DataStore } from './data-store/data-store';
import { ShopController } from './shop/shop-controller';
import { CartPanel } from './shop/view/cart-panel';
import { ProductCatalog } from './shop/view/product-catalog';

DataStore.registerStoreFactory( ()=> new RestStore() )


export const MainPanel = () => {
	const shopController = new ShopController()

	return (
		<div>
			<h1>Mimacom</h1>
			<ProductCatalog shopController={shopController}/>
			<CartPanel shopController={ shopController }/>
		</div>
	)
}

render(<MainPanel />, document.getElementsByTagName('mimacom')[0]);
