import React from 'react'

const Login = () => {
	return (
		<div className="login-box">
			<h1 className="logo">
				Github<span className="logo-stars">Stars</span>
			</h1>
			<p className="login-info">
				Before proceeding,{' '}
				<a className="login-link" href="/auth/github">
					log in with GitHub <i className="fab fa-github" />
				</a>
			</p>
		</div>
	)
}

export default Login
