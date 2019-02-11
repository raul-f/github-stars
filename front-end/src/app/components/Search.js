import React from 'react'
import anime from 'animejs'

const transition = () => {
	const height = 1024
	const width = 1440
	const timeline = anime.timeline({
		easing: 'easeInOutQuad',
		duration: '400',
	})
	timeline.add(
		{
			targets: '.search-box',
			top: (50 / height) * window.innerHeight,
			height: (64 / height) * window.innerHeight,
			width: (1102 / width) * window.innerWidth,
		},
		0
	)
	timeline.add(
		{
			targets: '.input-box',
			right: (96 / width) * window.innerWidth,
		},
		0
	)
	timeline.add(
		{
			targets: '.search-field',
			boxShadow: '0px 0px 0px 0px rgba(255,255,255,0)',
			borderBottom: '1px solid #BABABA',
			height: (40 / height) * window.innerHeight,
			width: (774 / width) * window.innerWidth,
			padding: 0,
		},
		0
	)
	timeline.add(
		{
			targets: '.logo',
			left: '0px',
			top: (10 / height) * window.innerHeight,
			height: (43 / height) * window.innerHeight,
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

const Search = props => {
	return (
		<div className="search-box">
			<h1 className="logo">
				Github<span className="logo-stars">Stars</span>
			</h1>
			<div className="input-box">
				<input
					type="text"
					className="search-field"
					placeholder="Type in the GitHub username..."
					onFocus={() => {
						transition()
					}}
					onChange={props.search}
				/>
				<i className="fas fa-search search-icon" />
			</div>
		</div>
	)
}

export default Search
