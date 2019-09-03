import React, { Component } from 'react';
import { Button, Segment} from 'semantic-ui-react';
import Collapsible from 'react-collapsible';

class DishCreation extends Component {

	constructor(){
		super()

		this.state = {
			menuItemId: '',
			extraIngredients: [],
			specialInstructions: '',
			byonMenuItem: {},
			menuItems: [],
			stage: 'typeChoice',
			stageIndex: 0,
			menuItemStages: ['dishChoice', 'extraIngredients', 'confirm'],
			byonStage: ['noodleChoice', 'proteinChoice', 'extraIngredients', 'sauceChoice', 'confirm']

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

	handleTypeChoiceClick = (e) => {

		this.setState({
			stage: e.target.name
		})

	}

	handleBackClick = () => {

		if (this.state.stageIndex === 0 && this.state.stage === 'typeChoice' ) {
			this.props.handleBackClick()
		} else if (this.state.stageIndex > 0 ) {
			this.setState({
				stageIndex: this.state.stageIndex - 1
			})
		} else {
			this.setState({
				stage: 'typeChoice'
			})
		}
	}




	render(){
		return(

			<Segment>

			<Button size='sm' name='back' onClick={this.handleBackClick}>go back.</Button>

			{ this.state.stage === 'typeChoice' ? 

				<Segment>
					<Button name='menuItem' onClick={this.handleTypeChoiceClick}>fan fave noodz.</Button>
					<Button name='byon' onClick={this.handleTypeChoiceClick}>byon.</Button>
				</Segment>

				:

				null

			}




			</Segment>

		)
	}
}

export default DishCreation