import React, { Component } from 'react';
import { Button, Segment} from 'semantic-ui-react';

class OrderCreation extends Component {

	constructor(props){
		super(props)

		this.state = {
			userId: '',
			delivery: true,
			dishes: [],
			addr1: '', 
			addr2: '', 
			city: '', 
			state: '', 
			zip: '',
			stage: 0,
			stages: ['initiation', 'dishCreation']

		}
	}

	componentDidMount = () => {

		if (this.props.loggedIn) {
			this.setState({
				...this.props,
				...this.props.address
			})

		} else {
			this.props.history.push('/login')
		}
	}

	handleDeliveryClick = (e) => {

		if (e.currentTarget.name === 'delivery') {
			this.setState({
				delivery: true
			})
		} else {
			this.setState({
				delivery: false
			})
		}

		this.setState({
			stage: this.state.stage + 1
		})


	}

	handleBackClick = () => {

			this.setState({
				stage: this.state.stage - 1
			})	
	}

	render(){
		return(
			<div>

			{this.state.stages[this.state.stage] === 'initiation' ? 

				<Segment>
					<Button name='delivery' onClick={this.handleDeliveryClick}>delivery.</Button>
					<Button name='pickup' onClick={this.handleDeliveryClick}>pick up.</Button>
				</Segment>
				:
				null
			}

			{this.state.stages[this.state.stage] === 'dishCreation' ? 
				<Segment>

					<Button name='back' onClick={this.handleBackClick}>go back.</Button>
					<Segment>
						<Button name='menuItem' onClick={this.handleTypeChoiceClick}>fan fave noodz.</Button>
						<Button name='byon' onClick={this.handleTypeChoiceClick}>byon.</Button>
					</Segment>
				</Segment>
				:
				null
			}
			</div>
		)
	}
}

export default OrderCreation