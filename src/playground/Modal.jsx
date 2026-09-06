import { useEffect, useRef, useState } from 'react'

const focusableSelector =
	'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

function Modal() {
	const [isOpen, setIsOpen] = useState(false)
	const openButtonRef = useRef(null)
	const dialogRef = useRef(null)
	const closeButtonRef = useRef(null)
	const wasOpenRef = useRef(false)

	useEffect(() => {
		if (!isOpen) {
			if (wasOpenRef.current) {
				openButtonRef.current?.focus()
				wasOpenRef.current = false
			}
			return undefined
		}

		wasOpenRef.current = true
		closeButtonRef.current?.focus()

		const previousOverflow = document.body.style.overflow
		document.body.style.overflow = 'hidden'

		return () => {
			document.body.style.overflow = previousOverflow
		}
	}, [isOpen])

	function handleDialogKeyDown(event) {
		if (event.key === 'Escape') {
			event.preventDefault()
			setIsOpen(false)
			return
		}

		if (event.key !== 'Tab') {
			return
		}

		const focusableElements = dialogRef.current?.querySelectorAll(focusableSelector)
		if (!focusableElements?.length) {
			event.preventDefault()
			return
		}

		const firstElement = focusableElements[0]
		const lastElement = focusableElements[focusableElements.length - 1]

		if (event.shiftKey && document.activeElement === firstElement) {
			event.preventDefault()
			lastElement.focus()
		} else if (!event.shiftKey && document.activeElement === lastElement) {
			event.preventDefault()
			firstElement.focus()
		}
	}

	return (
		<>
			<main className="playground" aria-hidden={isOpen} inert={isOpen}>
				<p className="eyebrow">Accessibility playground</p>
				<h1>Modal dialog</h1>
				<p className="intro">
					Open the dialog to test focus placement, keyboard navigation, and focus
					restoration.
				</p>
				<button
					ref={openButtonRef}
					className="primary-button"
					type="button"
					onClick={() => setIsOpen(true)}
				>
					Open Modal
				</button>
			</main>

			{isOpen && (
				<div className="modal-backdrop">
					<div
						ref={dialogRef}
						className="modal-dialog"
						role="dialog"
						aria-modal="true"
						aria-labelledby="modal-title"
						onKeyDown={handleDialogKeyDown}
					>
						<button
							ref={closeButtonRef}
							className="close-button"
							type="button"
							aria-label="Close modal"
							onClick={() => setIsOpen(false)}
						>
							<span aria-hidden="true">&times;</span>
						</button>
						<p className="eyebrow">A focused moment</p>
						<h2 id="modal-title">Welcome to the modal</h2>
						<p>
							This dialog keeps keyboard focus inside until you close it. Your
							place on the page will be restored afterward.
						</p>
						<button
							className="secondary-button"
							type="button"
							onClick={() => setIsOpen(false)}
						>
							Done
						</button>
					</div>
				</div>
			)}
		</>
	)
}

export default Modal
