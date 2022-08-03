import { useEffect, useState } from "react"




export const WantToRead = () => {
    const [books, setBooks] = useState([]) 
    const [wishBooks, setWishBooks] = useState([])
    const [filteredBooks, setFilteredBooks] = useState([])
    const localBookUser = localStorage.getItem("book_user")
    const bookUserObject = JSON.parse(localBookUser)
    const [savedBooks, setSavedBooks] = useState([])
    // useEffect(
    //     () => {

    //         fetch(`http://localhost:8088/books`)
    //             .then(response => response.json())
    //             .then((bookArray) => {
    //                 setBooks(bookArray)

    //             })
    //     },
    //     [] // When this array is empty, you are observing initial component state
    // )
//observes state.  When state changes, 
    useEffect(
        () => {
            getAllSavedBooks()
        },
        []
    )
    //Filter through the wish books until you find that the userId associated with wish books(aka savedBooks in database) === the id of the localBookUser
    useEffect(
        () => {
            const userBooks = wishBooks.filter(book => book.userId === bookUserObject.id)
            setFilteredBooks(userBooks)
        },
        [wishBooks]
    )
//function to get all saved books via fetch and then set those saved books in an array
    const getAllSavedBooks = () => {
        fetch(`http://localhost:8088/savedBooks?_expand=book`)
        .then(response => response.json())
        .then((savedBooksArray) => {
            setWishBooks(savedBooksArray)
        })
    }

//function to delete a particular book in my savedBooks array
    const deleteSavedBooks = (savedBook) => {
        fetch(`http://localhost:8088/savedBooks/${savedBook.id}`, {
            method: "DELETE"
        })
            .then(() => {
                getAllSavedBooks()
            })


    }






    return <>
        <h2>Want To Read</h2>

        <article className="savedBooks">
            {

                filteredBooks.map(
                    (filteredBook) => {
                        return filteredBook.userId === bookUserObject.id ? <section className="savedBook">
                            <header>{filteredBook?.book?.title}</header>
                            <footer> {filteredBook?.book?.author}</footer>
                            <button onClick={() => deleteSavedBooks(filteredBook)}>Delete</button>

                        </section>
                            : ""
                    }
                )
            }
        </article>
    </>
}











