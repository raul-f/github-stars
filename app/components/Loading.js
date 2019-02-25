import React from 'react'

const Loading = () => {
	return (
		<div className="login-box">
			<h1 className="logo">
				Github<span className="logo-stars">Stars</span>
			</h1>
			<i className="fas fa-spinner fa-spin" style={{ fontSize: 35 }} />
		</div>
	)
}

export default Loading
