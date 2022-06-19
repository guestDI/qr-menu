import {
	faFacebook,
	faInstagram,
	faLinkedin,
	faTwitter,
} from "@fortawesome/free-brands-svg-icons"
import { SocialNetwork } from "../../../types"

export const socialIconsMap = {
	facebook: faFacebook,
	instagram: faInstagram,
	linkedIn: faLinkedin,
	twitter: faTwitter,
}

export const getSocialIcon = (socialNetwork: SocialNetwork) => {
	return socialIconsMap[socialNetwork]
}
