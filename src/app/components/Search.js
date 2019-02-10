import React from 'react'

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
					onFocus={props.transition}
					onChange={props.search}
				/>
				<i className="fas fa-search search-icon" />
			</div>
		</div>
	)
}

export default Search
