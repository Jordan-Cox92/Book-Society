import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const BookList = ({ searchTermState }) => {
    const [books, setBooks] = useState([])
    const [filteredBooks, setFiltered] = useState([])
   
   
    const navigate = useNavigate()

    const localBookUser = localStorage.getItem("book_user")
    const bookUserObject = JSON.parse(localBookUser)

    useEffect(
        () => {
            const searchedBooks = books.filter(book => {
                return book.title.toLowerCase().startsWith(searchTermState.toLowerCase())
            })
            setFiltered(searchedBooks)
        },
        [ searchTermState ]
    )



    useEffect(
        () => {
            fetch(' http://localhost:8088/books')
                .then(response => response.json())
                .then((bookArray) => {
                    setBooks(bookArray)

                })
        },
        [] // When this array is empty, you are observing initial component state
    )

  
    const saveBook = (book) => {
        fetch(` http://localhost:8088/savedBooks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"bookId": book.id, "userId": bookUserObject.id, "author": book.author, "title": book.title})
        })
            .then(response => response.json())
            .then(() => {
                navigate("/WantToRead")
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
                            <button onClick={()=> {saveBook(book)}}>save</button>
                        </section>
                    }
                )
            }
        </article>
    </>    

                       
}


