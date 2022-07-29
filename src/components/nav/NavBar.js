import { UserNav } from "./UserNav"
import { EmployeeNav } from "./EmployeeNav"
import "./NavBar.css"

export const NavBar = () => {
    const localBookUser = localStorage.getItem("book_user")
    const bookUserObject = JSON.parse(localBookUser)

	if (bookUserObject.staff) {
		// Return employee views
		return <EmployeeNav/>
	}
	else {
		//Return user views
		return <UserNav/>
	}
}













