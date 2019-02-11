import React from 'react'
import Repository from './Repository'
import Profile from './Profile'

const UserProfile = props => {
	return (
		<div className="user-box">
			<Profile data={props.data} />
			<main className="repositories">
				{props.data.starredRepositories.edges ? (
					props.data.starredRepositories.edges.map((item, index) => {
						return (
							<Repository
								description={item.node.description}
								key={item.node.id}
								name={item.node.name}
								owner={item.node.owner.login}
								stars={item.node.stargazers.totalCount}
								url={item.node.url}
							/>
						)
					})
				) : (
					<Repository none={true} />
				)}
			</main>
		</div>
	)
}

export default UserProfile
