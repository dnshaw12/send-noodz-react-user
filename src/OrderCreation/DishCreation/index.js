import React, { Component } from 'react';
import { Button, Segment} from 'semantic-ui-react';
import Collapsible from 'react-collapsible';

import MenuItemList from './MenuItemList'
import IngredientList from './IngredientList'
import ConfirmDish from './ConfirmDish'

class DishCreation extends Component {

	constructor(){
		super()

		this.state = {
			menuItemId: '',
			extraIngredients: [],
			specialInstructions: '',
			byonMenuItem: {},
			menuItems: [],
			noodles: [],
			proteins: [],
			sauces: [],
			normals: [],
			stage: 'typeChoice',
			stageIndex: 0,
			menuItemStages: ['dishChoice', 'extraIngredients', 'confirm','addAnotherPrompt'],
			byonStages: ['noodleChoice', 'proteinChoice', 'sauceChoice', 'extraIngredients', 'confirm','addAnotherPrompt']

		}
	}

	componentDidMount = async () => {

		console.log(this.props);


		this.setState({
			menuItems: this.props.menuItems,
			byonMenuItem: this.props.byonMenuItem,
			noodles: this.props.noodles,
			proteins: this.props.proteins,
			sauces: this.props.sauces,
			normals: this.props.normals
		})



	}

	handleTypeChoiceClick = (e) => {

		if (e.target.name === 'byon') {
			this.setState({
				menuItemId:this.state.byonMenuItem._id,
			})
		}

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
				stage: 'typeChoice',
				menuItemId: '',
				extraIngredients: [],
				specialInstructions: '',
			})
		}
	}

	handleNextClick = () => {

		this.setState({
				stageIndex: this.state.stageIndex + 1
		})
	}

	selectMenuItem = (e) => {
		console.log(e.target.id);

		this.setState({
			menuItemId: e.target.id,
			stageIndex: this.state.stageIndex + 1
		})
	}

	handleIngredientSelection = (id, exists) => {
		let ingredients = this.state.extraIngredients

		console.log(ingredients);

		if (exists) {

			ingredients = ingredients.filter( ingredient => ingredient !== id)

			console.log(ingredients, 'after filter');


		} else {
			ingredients.push(id)
		}


		this.setState({
			extraIngredients: ingredients
		})
	}

	createDish = async () => {
		
		try {
			console.log(this.state, 'state on dish creation');



			const newDishResponse = await fetch(process.env.REACT_APP_BACKEND_URL + '/dishes/',{
				method: 'POST',
	        	credentials: 'include',
	        	body: JSON.stringify(this.state),
	        	headers: {
	         	'Content-Type': 'application/json'
       		}
			})

			const parsedResponse = await newDishResponse.json()

			console.log(newDishResponse.status, parsedResponse);

			if (newDishResponse.status === 201) {

				this.props.addDish(parsedResponse.data)

				this.setState({
					menuItemId: '',
					extraIngredients: [],
					specialInstructions: '',
					stageIndex: this.state.stageIndex + 1
				})
			}
			
		} catch(err){
		  console.log(err);
		}
	}

	updateSpecialInstructions = e => {
		console.log(this.state.specialInstructions);
		this.setState({
			specialInstructions: e.target.value
		})
	}

	startNewDish = () => {
		this.setState({
			stageIndex: 0,
			stage: 'typeChoice'
		})
	}

	reviewOrder = () => {

		console.log('reviewOrder');
		this.setState({
			menuItemId: '',
			extraIngredients: [],
			specialInstructions: '',
			stageIndex: 0
		})

		this.props.reviewOrder()
	}


	render(){
		return(

			<Segment>

			{ this.state.stage === 'byon' && this.state.byonStages[this.state.stageIndex] !== 'addAnotherPrompt' || this.state.stage === 'menuItem' && this.state.menuItemStages[this.state.stageIndex] !== 'addAnotherPrompt' ?

				<div>

					<Button onClick={this.handleBackClick}>go back.</Button>

					{ this.state.stage !== 'typeChoice' ? 

						<Button onClick={this.handleNextClick}>next.</Button>

					:

						null


					}
				</div>
			:

				null
			}


			{ this.state.stage === 'typeChoice' ? 

				<Segment>
					<Button name='menuItem' onClick={this.handleTypeChoiceClick}>fan fave noodz.</Button>
					<Button name='byon' onClick={this.handleTypeChoiceClick}>byon.</Button>
				</Segment>

				:

				null

			}

			{ this.state.stage === 'menuItem' ? 

				// MENU ITEM PATHS GO HERE

				<div>

					{this.state.menuItemStages[this.state.stageIndex] === 'dishChoice' ?
					
						<MenuItemList 
							menuItems={this.state.menuItems} 
							selectMenuItem={this.selectMenuItem}
						/>
	
					:
	
						null}

					{this.state.menuItemStages[this.state.stageIndex] === 'extraIngredients' ?
					
						<IngredientList  
							ingredients={this.state.normals}
							currentMenuItemIngredients={this.state.menuItems[this.state.menuItems.findIndex( item => item._id === this.state.menuItemId)].baseIngredients}
							handleIngredientSelection={this.handleIngredientSelection}
							extraIngredients={this.state.extraIngredients}
						/>
	
					:
	
						null}

					{this.state.menuItemStages[this.state.stageIndex] === 'confirm' ?
					
						<ConfirmDish  
							extraIngredients={this.state.extraIngredients}
							currentMenuItem={this.state.menuItems[this.state.menuItems.findIndex( item => item._id === this.state.menuItemId)]}
							ingredients={this.state.normals.concat(this.state.noodles).concat(this.state.proteins).concat(this.state.sauces)}
							createDish={this.createDish}
							updateSpecialInstructions={this.updateSpecialInstructions}
							specialInstructions={this.state.specialInstructions}
						/>
	
					:
	
						null}

				</div>

			:

				null

			}

			{ this.state.stage === 'byon' ? 

				// BYON PATHS GO HERE

				<div>

				{this.state.byonStages[this.state.stageIndex] === 'noodleChoice' ?
				
					<IngredientList  
						ingredients={this.state.noodles}
						currentMenuItemIngredients={this.state.byonMenuItem.baseIngredients}
						handleIngredientSelection={this.handleIngredientSelection}
						extraIngredients={this.state.extraIngredients}
					/>

				:

					null}

				{this.state.byonStages[this.state.stageIndex] === 'proteinChoice' ?
				
					<IngredientList  
						ingredients={this.state.proteins}
						currentMenuItemIngredients={this.state.byonMenuItem.baseIngredients}
						handleIngredientSelection={this.handleIngredientSelection}
						extraIngredients={this.state.extraIngredients}
					/>

				:

					null}

				{this.state.byonStages[this.state.stageIndex] === 'sauceChoice' ?
				
					<IngredientList  
						ingredients={this.state.sauces}
						currentMenuItemIngredients={this.state.byonMenuItem.baseIngredients}
						handleIngredientSelection={this.handleIngredientSelection}
						extraIngredients={this.state.extraIngredients}
					/>

				:

					null}

				{this.state.byonStages[this.state.stageIndex] === 'extraIngredients' ?
				
					<IngredientList  
						ingredients={this.state.normals}
						currentMenuItemIngredients={this.state.byonMenuItem.baseIngredients}
						handleIngredientSelection={this.handleIngredientSelection}
						extraIngredients={this.state.extraIngredients}
					/>

				:

					null}

				{this.state.byonStages[this.state.stageIndex] === 'confirm' ?
				
					<ConfirmDish  
						extraIngredients={this.state.extraIngredients}
						currentMenuItem={this.state.byonMenuItem}
						ingredients={this.state.normals.concat(this.state.noodles).concat(this.state.proteins).concat(this.state.sauces)}
						createDish={this.createDish}
						updateSpecialInstructions={this.updateSpecialInstructions}
						specialInstructions={this.state.specialInstructions}
					/>

				:

					null}

				</div>

			:

				null

			}

			{this.state.stage === 'byon' && this.state.byonStages[this.state.stageIndex] === 'addAnotherPrompt' || this.state.stage === 'menuItem' && this.state.menuItemStages[this.state.stageIndex] === 'addAnotherPrompt' ?
					
				<Segment>
					<Button onClick={this.startNewDish}>add more noodz.</Button>
					<Button onClick={this.reviewOrder}>review noodz order.</Button>
				</Segment>

			:

				null}

			{ this.state.stage === 'byon' && this.state.byonStages[this.state.stageIndex] !== 'addAnotherPrompt' || this.state.stage === 'menuItem' && this.state.menuItemStages[this.state.stageIndex] !== 'addAnotherPrompt' ?

				<Button onClick={this.reviewOrder}>review my noodz order.</Button>

			:

				null
			}



			</Segment>

		)
	}
}

export default DishCreation