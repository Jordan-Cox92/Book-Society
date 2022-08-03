import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const UserNav = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                {/* <Link className="navbar__link" to="/CompletedBooks">CompletedBooks</Link> */}
                {<Link className="navbar__link" to="/WantToRead">WantToRead</Link>}
                {/* <Link className="navbar__link" to="/Masterpieces">Masterpieces</Link> */}
                {/* <Link className="navbar__link" to="/BooksYouDespise">BooksYouDespise</Link> */}
                {/* <Link className="navbar__link" to="/SavedBookList">SavedBooksList</Link> */}
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/books">Books</Link>
            </li>
            {
                localStorage.getItem("book_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("book_user")
                            navigate("/", { replace: true })
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}