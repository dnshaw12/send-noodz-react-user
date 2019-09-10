import React, { Component } from 'react';
import { Button, Segment, Icon } from 'semantic-ui-react';
import Collapsible from 'react-collapsible';

class MenuItem extends Component {

	constructor(){
		super()

		this.state = {
			open: false
		}
	}

	toggleCollapisble = () => {
		this.setState({
			open: !this.state.open
		})
	}


	render(){

		const icon = this.state.open ? <Icon className='collapsibleArrow' name='angle up' /> : <Icon className='collapsibleArrow' name='angle down' />

		return(

			<Segment>
			<Collapsible onOpen={this.toggleCollapisble} onClose={this.toggleCollapisble} id={this.props.item._id} trigger={this.props.item.name}>
				{icon}
				<ul>
					<li>noodle: {this.props.item.noodleType.name}</li>
					<li>protein: {this.props.item.protein.name}</li>
					<li>sauce: {this.props.item.sauce.name}</li>
					<li>ingredients: {this.props.baseIngredients}</li>
				</ul>
				<Button id={this.props.item._id} onClick={this.props.selectMenuItem}>select</Button>
			</Collapsible>
			</Segment>

		)
	}
}


export default MenuItem