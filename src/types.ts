export type SocialNetwork = "twitter" | "instagram" | "facebook" | "linkedIn";

export type SocialContacts = Array<Record<SocialNetwork, string>>;

export interface EntityBox {
	imgUri: string;
	title: string;
	description: string;
}
