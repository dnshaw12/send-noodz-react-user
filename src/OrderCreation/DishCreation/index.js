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
			menuItemStages: ['dishChoice', 'extraIngredients', 'confirm'],
			byonStages: ['noodleChoice', 'proteinChoice', 'sauceChoice', 'extraIngredients', 'confirm']

		}
	}

	componentDidMount = async () => {

		const menuItemsResponse = await fetch(process.env.REACT_APP_BACKEND_URL + '/menuItems')

		const parsedResponse = await menuItemsResponse.json()

		console.log(parsedResponse);

		const regularMenuItems = parsedResponse.data.filter( item => item.name !== 'byon')
		const byonMenuItem = parsedResponse.data[parsedResponse.data.findIndex( item => item.name === 'byon')]

		const ingredientResponse = await fetch(process.env.REACT_APP_BACKEND_URL + '/ingredients')

		const parsedResponse2 = await ingredientResponse.json()

		const noodles = parsedResponse2.data.filter( ingredient => ingredient.type === 'noodle' && ingredient.name !== 'custom')

		const proteins = parsedResponse2.data.filter( ingredient => ingredient.type === 'protein' && ingredient.name !== 'custom')

		const sauces = parsedResponse2.data.filter( ingredient => ingredient.type === 'sauce' && ingredient.name !== 'custom')

		const normals = parsedResponse2.data.filter( ingredient => ingredient.type === 'normal' && ingredient.name !== 'custom')

		this.setState({
			menuItems: regularMenuItems,
			byonMenuItem: byonMenuItem,
			noodles: noodles,
			proteins: proteins,
			sauces: sauces,
			normals: normals
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


	render(){
		return(

			<Segment>

			<Button size='sm' name='back' onClick={this.handleBackClick}>go back.</Button>

			{ this.state.stage !== 'typeChoice' ? 

				<Button size='sm' name='back' onClick={this.handleNextClick}>next.</Button>

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
				
									// <IngredientList  />
									<div>{this.state.byonStages[this.state.stageIndex]}</div>
				
								:
				
									null}

				{this.state.byonStages[this.state.stageIndex] === 'proteinChoice' ?
				
									// <IngredientList  />
									<div>{this.state.byonStages[this.state.stageIndex]}</div>
				
								:
				
									null}

				{this.state.byonStages[this.state.stageIndex] === 'sauceChoice' ?
				
									// <IngredientList  />
									<div>{this.state.byonStages[this.state.stageIndex]}</div>
				
								:
				
									null}

				{this.state.byonStages[this.state.stageIndex] === 'extraIngredients' ?
				
									// <IngredientList  />
									<div>{this.state.byonStages[this.state.stageIndex]}</div>
				
								:
				
									null}

				{this.state.byonStages[this.state.stageIndex] === 'confirm' ?
				
									// <DishConfirmation  />
									<div>{this.state.byonStages[this.state.stageIndex]}</div>
				
								:
				
									null}

				</div>

			:

				null

			}




			</Segment>

		)
	}
}

export default DishCreation