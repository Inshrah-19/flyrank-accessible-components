import { useRef, useState } from 'react'

const tabs = [
	{
		id: 'profile',
		label: 'Profile',
		content: 'View and update your name, email address, and profile details.',
	},
	{
		id: 'settings',
		label: 'Settings',
		content: 'Manage your notification preferences and display settings.',
	},
	{
		id: 'security',
		label: 'Security',
		content: 'Review your password, sign-in methods, and active sessions.',
	},
]

function Tabs() {
	const [activeTab, setActiveTab] = useState(0)
	const tabRefs = useRef([])

	function selectTab(index, shouldFocus = false) {
		setActiveTab(index)

		if (shouldFocus) {
			tabRefs.current[index]?.focus()
		}
	}

	function handleTabKeyDown(event, index) {
		let nextIndex

		if (event.key === 'ArrowRight') {
			nextIndex = (index + 1) % tabs.length
		} else if (event.key === 'ArrowLeft') {
			nextIndex = (index - 1 + tabs.length) % tabs.length
		} else if (event.key === 'Home') {
			nextIndex = 0
		} else if (event.key === 'End') {
			nextIndex = tabs.length - 1
		} else {
			return
		}

		event.preventDefault()
		selectTab(nextIndex, true)
	}

	return (
		<section className="tabs-playground" aria-labelledby="tabs-heading">
			<p className="eyebrow">Accessibility playground</p>
			<h2 id="tabs-heading">Account overview</h2>
			<div className="tabs" role="tablist" aria-label="Account sections">
				{tabs.map((tab, index) => (
					<button
						key={tab.id}
						ref={(element) => {
							tabRefs.current[index] = element
						}}
						id={`${tab.id}-tab`}
						className="tab"
						type="button"
						role="tab"
						aria-selected={activeTab === index}
						aria-controls={`${tab.id}-panel`}
						tabIndex={activeTab === index ? 0 : -1}
						onClick={() => selectTab(index)}
						onKeyDown={(event) => handleTabKeyDown(event, index)}
					>
						{tab.label}
					</button>
				))}
			</div>
			{tabs.map((tab, index) => (
				<div
					key={tab.id}
					id={`${tab.id}-panel`}
					className="tab-panel"
					role="tabpanel"
					aria-labelledby={`${tab.id}-tab`}
					tabIndex={activeTab === index ? 0 : -1}
					hidden={activeTab !== index}
				>
					<h3>{tab.label}</h3>
					<p>{tab.content}</p>
				</div>
			))}
		</section>
	)
}

export default Tabs
