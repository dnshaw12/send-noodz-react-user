import React, { Component } from 'react';
import { Button, Segment, Icon } from 'semantic-ui-react';

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

		this.setState({
			menuItemId: e.target.id,
			stageIndex: this.state.stageIndex + 1
		})
	}

	handleIngredientSelection = (id, exists) => {
		let ingredients = this.state.extraIngredients

		if (exists) {

			ingredients = ingredients.filter( ingredient => ingredient !== id)

		} else {
			ingredients.push(id)
		}


		this.setState({
			extraIngredients: ingredients
		})
	}

	createDish = async () => {
		
		try {

			const newDishResponse = await fetch(process.env.REACT_APP_BACKEND_URL + '/dishes/',{
				method: 'POST',
	        	credentials: 'include',
	        	body: JSON.stringify(this.state),
	        	headers: {
	         	'Content-Type': 'application/json'
       		}
			})

			const parsedResponse = await newDishResponse.json()

			if (newDishResponse.status === 201) {

				this.props.addDish(parsedResponse.data._id)

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

			<Segment className='outerSegment'>

			{ (this.state.stage === 'byon' && this.state.byonStages[this.state.stageIndex] !== 'addAnotherPrompt') || (this.state.stage === 'menuItem' && this.state.menuItemStages[this.state.stageIndex] !== 'addAnotherPrompt') ?

					<Button className='nextButton' onClick={this.handleNextClick}>next.</Button>
			:

				null
			}


			{ this.state.stage === 'typeChoice' ? 

				<Segment className='outerSegment'>
					<Button className='backButton' onClick={this.handleBackClick}><Icon name='angle left' size='large'/></Button>
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
					
						<Segment className='fullSegment'>
							<Button className='backButton' onClick={this.handleBackClick}><Icon name='angle left' size='large'/></Button>
							<div className='spacer' />
							<MenuItemList 
								menuItems={this.state.menuItems} 
								selectMenuItem={this.selectMenuItem}
								handleBackClick={this.handleBackClick}
							/>

						</Segment>
	
					:
	
						null}

					{this.state.menuItemStages[this.state.stageIndex] === 'extraIngredients' ?
					
						<IngredientList  
							ingredients={this.state.normals}
							currentMenuItemIngredients={this.state.menuItems[this.state.menuItems.findIndex( item => item._id === this.state.menuItemId)].baseIngredients}
							handleIngredientSelection={this.handleIngredientSelection}
							extraIngredients={this.state.extraIngredients}
							handleBackClick={this.handleBackClick}
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
							handleBackClick={this.handleBackClick}
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
						handleBackClick={this.handleBackClick}
					/>

				:

					null}

				{this.state.byonStages[this.state.stageIndex] === 'proteinChoice' ?
				
					<IngredientList  
						ingredients={this.state.proteins}
						currentMenuItemIngredients={this.state.byonMenuItem.baseIngredients}
						handleIngredientSelection={this.handleIngredientSelection}
						extraIngredients={this.state.extraIngredients}
						handleBackClick={this.handleBackClick}
					/>

				:

					null}

				{this.state.byonStages[this.state.stageIndex] === 'sauceChoice' ?
				
					<IngredientList  
						ingredients={this.state.sauces}
						currentMenuItemIngredients={this.state.byonMenuItem.baseIngredients}
						handleIngredientSelection={this.handleIngredientSelection}
						extraIngredients={this.state.extraIngredients}
						handleBackClick={this.handleBackClick}
					/>

				:

					null}

				{this.state.byonStages[this.state.stageIndex] === 'extraIngredients' ?
				
					<IngredientList  
						ingredients={this.state.normals}
						currentMenuItemIngredients={this.state.byonMenuItem.baseIngredients}
						handleIngredientSelection={this.handleIngredientSelection}
						extraIngredients={this.state.extraIngredients}
						handleBackClick={this.handleBackClick}
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
						handleBackClick={this.handleBackClick}
					/>

				:

					null}

				</div>

			:

				null

			}

			{(this.state.stage === 'byon' && this.state.byonStages[this.state.stageIndex] === 'addAnotherPrompt') || (this.state.stage === 'menuItem' && this.state.menuItemStages[this.state.stageIndex] === 'addAnotherPrompt') ?
					
				<Segment className='outerSegment'>
					<Button onClick={this.startNewDish}>add more noodz.</Button>
					<Button onClick={this.reviewOrder}>review noodz order.</Button>
				</Segment>

			:

				null}

			<footer >

			{ ((this.state.stage === 'byon' && this.state.byonStages[this.state.stageIndex] !== 'addAnotherPrompt') || 
				(this.state.stage === 'menuItem' && this.state.menuItemStages[this.state.stageIndex] !== 'addAnotherPrompt' && this.props.totalDishes)) 
				&& this.props.totalDishes

				?

				<Button className="reviewButton" onClick={this.reviewOrder}>review my noodz order.</Button>

			:

				<h2>send noodz.</h2>
			}

			</footer>



			</Segment>

		)
	}
}

export default DishCreation