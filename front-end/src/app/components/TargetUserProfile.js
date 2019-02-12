import React from 'react'
import Repository from './target-user-profile/Repository'
import Profile from './target-user-profile/Profile'

const TargetUserProfile = props => {
	return (
		<div className="target-user-box">
			<Profile data={props.data} />
			<main className="repositories">
				{props.data.starredRepositories.edges ? (
					props.data.starredRepositories.edges.map((item, index) => {
						return (
							<Repository
								primaryUserRepos={props.primaryUserData.starredRepositories.map(
									item => {
										return item.id
									}
								)}
								primaryUserId={props.primaryUserData.id}
								starHandler={props.starHandler}
								id={item.node.id}
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

export default TargetUserProfile
