import { Route, Routes } from "react-router-dom"
import { Authorized } from "./views/Authorized"
import { ApplicationViews } from "./views/ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"

//Routes render the appropriate user interface when the current location matches the route's paths.
//Path is a prop on the Route component that describes the pathname that the route should match
//When a path is matched a React component should be rendered so that there's a change in the user interface
//Component prop defines the react element that will be returned by the Route when the path is matched.

export const BookSociety = () => {
	return <Routes> 
		<Route path="/login" element={<Login />} />
		<Route path="/register" element={<Register />} />

		<Route path="*" element={
			<Authorized>
				<>
					{ <NavBar /> }
                    <ApplicationViews/>
                    </>
				
			</Authorized>

		} />
	</Routes>
}




