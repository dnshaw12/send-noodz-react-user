import React, { Component } from 'react';
import { Button, Segment} from 'semantic-ui-react';

class DishCreation extends Component {

	constructor(){
		super()

		this.state = {
			menuItemId: '',
			extraIngredients: [],
			specialInstructions: '',
			byonMenuItem: {},
			menuItems: []
		}
	}

	componentDidMount = async () => {

		const menuItemsResponse = await fetch(process.env.REACT_APP_BACKEND_URL + '/menuItems')

		const parsedResponse = await menuItemsResponse.json()

		console.log(parsedResponse);

		const regularMenuItems = parsedResponse.data.filter( item => item.name !== 'byon')
		const byonMenuItem = parsedResponse.data[parsedResponse.data.findIndex( item => item.name === 'byon')]

		this.setState({
			menuItems: regularMenuItems,
			byonMenuItem: byonMenuItem
		})


	}






	render(){
		return(

			<Segment>

				<Button name='back' onClick={this.props.handleBackClick}>go back.</Button>
				<Segment>
					<Button name='menuItem' onClick={this.handleTypeChoiceClick}>fan fave noodz.</Button>
					<Button name='byon' onClick={this.handleTypeChoiceClick}>byon.</Button>
				</Segment>
			</Segment>

		)
	}
}

export default DishCreation