import React from "react"
import { render } from "react-dom";

export const MainPanel = () => (
	<div>
		<h1>Mimacom</h1>
	</div>
)

render(<MainPanel />, document.getElementsByTagName('mimacom')[0]);
