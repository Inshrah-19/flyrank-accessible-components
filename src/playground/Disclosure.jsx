import { useState } from 'react'

function Disclosure() {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<section className="disclosure-playground" aria-labelledby="disclosure-heading">
			<p className="eyebrow">Accessibility playground</p>
			<h2 id="disclosure-heading">Account details</h2>
			<button
				className="disclosure-trigger"
				type="button"
				aria-expanded={isOpen}
				aria-controls="account-settings-content"
				onClick={() => setIsOpen((open) => !open)}
			>
				Account Settings
				<span aria-hidden="true">{isOpen ? '−' : '+'}</span>
			</button>
			<div
				id="account-settings-content"
				className="disclosure-content"
				hidden={!isOpen}
			>
				<ul>
					<li>Email</li>
					<li>Notifications</li>
					<li>Language</li>
				</ul>
			</div>
		</section>
	)
}

export default Disclosure
