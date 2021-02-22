import React from "react"
import { render } from "react-dom";
import { ProductCatalog } from './products/view/product-catalog';
import { RestStore } from './data-store/rest-store';
import { Store } from './data-store/store';

Store.registerStoreFactory( ()=> new RestStore() )

export const MainPanel = () => (
	<div>
		<h1>Mimacom</h1>
		<ProductCatalog />
	</div>
)

render(<MainPanel />, document.getElementsByTagName('mimacom')[0]);
