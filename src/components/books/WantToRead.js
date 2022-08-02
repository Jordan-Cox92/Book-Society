import { useEffect, useState } from "react"


export const WantToRead = () => {
    const [books, setBooks] = useState([]) //the initial state is an empty array, the current state is books, and setBooks is a function that updates state 
    const [wishBooks, setWishBooks] = useState([])
    const localBookUser = localStorage.getItem("book_user")
     const bookUserObject = JSON.parse(localBookUser)
    useEffect(
        () => {

            fetch(`http://localhost:8088/books`)
                .then(response => response.json())
                .then((bookArray) => {
                    setBooks(bookArray)

                })
        },
        [] // When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/savedBooks`)
                .then(response => response.json())
                .then((savedBooksArray) => {               
                    setWishBooks(savedBooksArray)
                })
        },
        [books]
    )
//Get all wishBooks by user, then display books saved by said user.
      useEffect(
          () => {
          const myBooks = books.filter(book => book.userId === bookUserObject.id)
          setWishBooks(myBooks)
          },
          [books]
      )


    return <>
        <h2>Want To Read</h2>

        <article className="savedBooks">
            {

                wishBooks.map(
                    (book) => {
                        return <section className="savedBook">
                            <header>{book.title}</header>
                            <footer>author: {book.author}</footer>
                        </section>
                    }
                )
            }
        </article>
    </>
}











