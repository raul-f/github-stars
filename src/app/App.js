import React from 'react'
import ReactDOM from 'react-dom'
import Search from './components/Search'
import anime from 'animejs'

class App extends React.Component {
	constructor() {
		super()
		this.state = {}
	}

	handleSearchInput = event => {}

	handleTransition = () => {
		const timeline = anime.timeline({
			easing: 'easeInOutQuad',
			duration: '400',
		})
		timeline.add({
			targets: '.search-box',
			top: '30px',
			height: '64px',
			width: '1102px',
		})
		timeline.add(
			{
				targets: '.input-box',
				right: '96px',
			},
			0
		)
		timeline.add(
			{
				targets: '.search-field',
				boxShadow: '0px 0px 0px 0px rgba(255,255,255,0)',
				borderBottom: '1px solid #BABABA',
				height: '27px',
				width: '774px',
				padding: '0',
			},
			0
		)
		timeline.add(
			{
				targets: '.logo',
				left: '0px',
				top: 64 - 43,
				height: '43px',
			},
			0
		)
		timeline.add(
			{
				targets: '.search-icon',
				right: '0px',
			},
			0
		)
	}

	render() {
		return (
			<div className="app" id="app">
				<Search
					search={this.handleSearchInput}
					transition={this.handleTransition}
				/>
			</div>
		)
	}
}

export default App
