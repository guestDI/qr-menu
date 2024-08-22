import { NextPage } from "next"
import Image from "next/image"
import React from "react"
import Button from "../components/Button/Button"
import SettingsIcon from "../inline-img/svg/settings.svg"

const Admin: NextPage = () => {
	return (
		<div className="main-container">
			<div className="header">
				<div className="logo">
					<Image src="/logo_2.png" alt="Logo"
								 width={60} height={60} />
				</div>
				<span>Digital menu</span>
			</div>
			<div className="content">
				<aside>
					<ul>
						<li>My Menu</li>
						<li>QR Codes</li>
						<li>Place details</li>
						<li>Staff</li>
					</ul>
					<div className="profile-btn-container">
						<Button onClick={() => {}} className="profile-btn">
							<Image src={SettingsIcon} alt="Settings" width={20} height={20} /> Profile</Button>
					</div>
				</aside>
				<main>
					Main content
				</main>
			</div>
		</div>
	)
}

export default Admin
