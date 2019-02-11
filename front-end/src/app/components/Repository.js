import React from 'react'

const Repository = props => {
	console.log(props)
	return props.none ? (
		<h2>No repositories found</h2>
	) : (
		<div className="single-repository">
			<div className="repository-info">
				<h3 className="repository-title">
					{props.owner} / {props.name}
				</h3>
				<p className="repository-description">{props.description}</p>
				<p className="repository-stars">
					<img
						src="https://s3-sa-east-1.amazonaws.com/myhostedfiles.raulf/Images/svg-icons/star.svg"
						className="star-icon"
					/>
					{props.stars} stars
				</p>
			</div>
			<button className="star-button">star</button>
		</div>
	)
}

export default Repository
