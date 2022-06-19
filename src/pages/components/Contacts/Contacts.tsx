import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { SocialContacts, SocialNetwork } from "../../../types"
import { getSocialIcon } from "./helpers"
import styles from "./styles.module.css"

interface SocialContactsProps {
	contacts: SocialContacts
}

const Contacts: React.FC<SocialContactsProps> = ({ contacts }) => {
	const social_contact = contacts.map(
		(contact: Record<SocialNetwork, string>, index: number) => {
			const key = Object.keys(contact)[0] as SocialNetwork

			const icon = getSocialIcon(key)
			const link = contact[key]

			return (
				<a key={`${index}`} href={`${link}`}>
					<FontAwesomeIcon
						icon={icon}
						style={{ fontSize: 20, color: "orange" }}
					/>
				</a>
			)
		}
	)

	return <div className={styles.contacts_section__social}>{social_contact}</div>
}

export default Contacts
