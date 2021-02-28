import React from "react"
import { render } from "react-dom";
import { RestStore } from './data-store/rest-store';
import { DataStore } from './data-store/data-store';
import { MainPanel } from './main/main-panel';
import { ShopController } from './shop/shop-controller';

const shopController = new ShopController()
DataStore.registerStoreFactory( ()=> new RestStore() )

render(<MainPanel shopController={ shopController }/>, document.getElementsByTagName('mimacom')[0]);
