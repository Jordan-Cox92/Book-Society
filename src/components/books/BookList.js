import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const BookList = ({ searchTermState }) => {
    const [books, setBooks] = useState([])
    const [filteredBooks, setFiltered] = useState([])
    const [savedBooks, updateSavedBooks] = useState([])
   
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

    useEffect(
        () => {
            
        }
    )






    return <>
        {
            
        }
        <h2>List of Books</h2>

        <article className="savedBooks">
            {
                filteredBooks.map(
                    (book) => {
                        return <section className="book">
                            <header>{book.title}</header>
                            <footer> {book.author}</footer>
                            <button onClick={booksSaved}>save</button>
                        </section>
                    }
                )
            }
        </article>
    </>    

                       
}