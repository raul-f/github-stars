import React, { useState } from 'react'
import Repository from './target-user-profile/Repository'
import Profile from './target-user-profile/Profile'

const TargetUserProfile = props => {
	const [selectedLanguage, setSelectedLanguage] = useState('none')

	let languages = []
	let repositories = props.data.starredRepositories.edges

	// build languages array
	props.data.starredRepositories.edges.map((value, index) => {
		value.node.languages.edges.map(({ node }, index) => {
			if (!languages.includes(node.name)) {
				languages.push(node.name)
			}
		})
	})

	// filter repositories for selected language
	if (selectedLanguage !== 'none') {
		repositories = repositories.filter(value => {
			for (const entry of value.node.languages.edges) {
				if (entry.node.name === selectedLanguage) {
					return true
				}
			}
			return false
		})
	}

	return (
		<div className="target-user-box">
			<Profile data={props.data} />
			<main className="repositories">
				<select
					className="language-filter"
					onChange={event => {
						setSelectedLanguage(event.target.value)
					}}
					defaultValue="none"
				>
					<option value="none">Filter by language</option>
					{languages.map((value, index) => {
						return (
							<option value={value} key={value}>
								{value}
							</option>
						)
					})}
				</select>
				{repositories.length ? (
					repositories.map((item, index) => {
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
