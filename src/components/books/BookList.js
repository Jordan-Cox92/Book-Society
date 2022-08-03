import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const BookList = ({ searchTermState }) => {
    const [books, setBooks] = useState([])//books as initial state, and setBooks as function to change initial state
    const [filteredBooks, setFiltered] = useState([])//filteredBooks is init state, and setFiltered is function to change initial state
    const [savedBooks, setSavedBooks] = useState([])//same


    const navigate = useNavigate()

    const localBookUser = localStorage.getItem("book_user")
    const bookUserObject = JSON.parse(localBookUser)//data received from web server turned from string into an object

    useEffect(
        () => {
            const searchedBooks = books.filter(book => {
                return book.title.toLowerCase().startsWith(searchTermState.toLowerCase())//filtering through the searched books
            })
            setFiltered(searchedBooks)
        },
        [searchTermState]
    )


//function to fetch all the books from the database and set them to the bookArray
    const getAllBooks = () => {
        fetch(' http://localhost:8088/books')
            .then(response => response.json())
            .then((bookArray) => {
                setBooks(bookArray)
            })
    }
   //observes state.  When state changes, the function is invoked.     
    useEffect(
        () => {getAllBooks()},
        []
    )
    //function to fetch all my saved books and then set them to the savedBookArray
    const getAllSavedBooks = () => {
        fetch(' http://localhost:8088/savedBooks')
            .then(response => response.json())
            .then((savedBookArray) => {
                setSavedBooks(savedBookArray)
            })
    }
   //observes state.  When state changes, the function is invoked.     
    useEffect(
        () => {getAllSavedBooks()},
        []
    )

    



//function to update the savedbooks if button is clicked on
const saveBook = (book) => {
    fetch(`http://localhost:8088/savedBooks`, {
        method: "POST", // used to send data to a server to create/update a resource.
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "bookId": book.id, "userId": bookUserObject.id })//converting object into a string - when sending data to a web server, the data has to be a string
    })
        .then(response => response.json())
        .then(() => {
            //navigate("/")
            getAllBooks()
            window.alert("Your book has been saved!")
        })
}





return <>
    {

    }
    <h2>List of Books</h2>

    <article className="books">
        {
            filteredBooks.map(
                (book) => {
                    return <section className="book">
                        <header>{book.title}</header>
                        <footer> {book.author}</footer>
                        <button onClick={() => { saveBook(book) }}>save</button>
                    </section>
                }
            )
        }
    </article>
</>    

                       
}


