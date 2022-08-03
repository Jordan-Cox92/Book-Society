import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const BookList = ({ searchTermState }) => {
    const [books, setBooks] = useState([])//
    const [filteredBooks, setFiltered] = useState([])
    const [savedBooks, setSavedBooks] = useState([])


    const navigate = useNavigate()

    const localBookUser = localStorage.getItem("book_user")
    const bookUserObject = JSON.parse(localBookUser)//data received from web server turned from string into an object

    useEffect(
        () => {
            const searchedBooks = books.filter(book => {
                return book.title.toLowerCase().startsWith(searchTermState.toLowerCase())
            })
            setFiltered(searchedBooks)
        },
        [searchTermState]
    )



    const getAllBooks = () => {
        fetch(' http://localhost:8088/books')
            .then(response => response.json())
            .then((bookArray) => {
                setBooks(bookArray)
            })
    }
        
    useEffect(
        () => {getAllBooks()},
        []
    )
    
    const getAllSavedBooks = () => {
        fetch(' http://localhost:8088/savedBooks')
            .then(response => response.json())
            .then((savedBookArray) => {
                setSavedBooks(savedBookArray)
            })
    }
        
    useEffect(
        () => {getAllSavedBooks()},
        []
    )


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
            navigate("/")
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


