import React from "react"

export type SocialNetwork = "twitter" | "instagram" | "facebook" | "linkedIn"

export type SocialContacts = Array<Record<SocialNetwork, string>>

export type CustomEvent = { preventDefault: () => void; target: { value: React.SetStateAction<string>; }; }

export interface EntityBox {
	imgUri: string
	title: string
	description: string
}
