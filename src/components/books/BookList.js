import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { DropSelector } from "./Dropdown"
import "./Books.css"


export const BookList = ({ searchTermState }) => {
    const [books, setBooks] = useState([])
    const [filteredBooks, setFiltered] = useState([])
    const [savedBooks, setSavedBooks] = useState([])


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
            window.alert("Your book has been added to Want To Read!")
        })
}

const completedBook = (book) => {
    fetch(`http://localhost:8088/completedBooks`, {
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
            window.alert("Your book has been added to Completed Books!")
        })
}

const masterpieceBook = (book) => {
    fetch(`http://localhost:8088/masterpieceBooks`, {
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
            window.alert("Your book has been added to Masterpieces!")
        })
}

const despisedBook = (book) => {
    fetch(`http://localhost:8088/despisedBooks`, {
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
            window.alert("Your book has been added to Despised Books!")
        })
}



return <>
    {

    }
    <h3>List of Books</h3>

    <article className="books">
        {
            filteredBooks.map(
                (book) => {
                    return <section key={book.id} className="book">
                        <header>{book.title}</header>
                        <footer> {book.author}</footer>
                        <DropSelector
                            saveBook={saveBook} 
                            completedBook={completedBook}
                            masterpieceBook={masterpieceBook}
                            despisedBook={despisedBook}
                            book={book} />
                        {/* <button onClick={() => { saveBook(book) }}>save</button> */}
                    </section>
                }
            )
        }
    </article>
</>    

                       
}


