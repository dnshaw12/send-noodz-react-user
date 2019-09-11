import React, { Component } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import socketIOClient from 'socket.io-client'

const socket = socketIOClient(process.env.REACT_APP_BACKEND_URL)



class UserMenu extends Component {
	constructor(){
		super()

		this.state = {
			menuOpen: false,
			orderUpdates: false,
			currentPage: '',
		}
	}

	componentDidMount(){

		socket.on('status update: ' + this.props.userId, data => {
			console.log('header socket hit');

			if (this.state.currentPage !== 'order-status') {
				this.setState({
					orderUpdates: true
				})

			}
		})
			

	}

	handleClick = (e, { name }) => {


		if (name === 'order-status') {
			this.setState({
				orderUpdates: false
			})
		}

		this.setState({
			currentPage: name
		})

		this.props.history.push(`/${name}`)
	}

	render(){

		const updateIcon = this.state.orderUpdates ? <Icon name="heart" color='red' className='heartIcon'/> : null

		return(
			<header>
				{this.props.loggedIn ? 
					<Menu verticle="true">
						<Menu.Item
								name=''
								onClick={this.handleClick}
							>
								place order.
						</Menu.Item>
						<Menu.Item
							name='order-status'
							onClick={this.handleClick}
						>
							{updateIcon}
							order status.
						</Menu.Item>

						<Menu.Item
							name='past-orders'
							onClick={this.handleClick}
						>
							past orders.
						</Menu.Item>

						<Menu.Item
							name='logout'
							onClick={this.props.logout}
						>
							logout.
						</Menu.Item>

					</Menu>
					:
					<Menu verticle="true">
						<Menu.Item
							name='login'
							onClick={this.handleClick}
						>
							login.
						</Menu.Item>

						<Menu.Item
							name='sign-up'
							onClick={this.handleClick}
						>
							sign up.
						</Menu.Item>

					</Menu>

				}
			</header>
		)
	}
}

export default withRouter(UserMenu)