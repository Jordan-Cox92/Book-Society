import { useEffect, useState } from "react"


export const WantToRead = () => {
    const [books, setBooks] = useState([]) //the initial state is an empty array, the current state is books, and setBooks is a function that updates state 
    const [wishBooks, setWishBooks] = useState([])
    const [filteredBooks, setFilteredBooks] = useState([])
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
            fetch(`http://localhost:8088/savedBooks?_expand=book`)
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
          const userBooks = wishBooks.filter(book => book.userId === bookUserObject.id)
          setFilteredBooks(userBooks)
          },
          [wishBooks]
      )


    return <>
        <h2>Want To Read</h2>

        <article className="savedBooks">
            {

                filteredBooks.map(
                    (filteredBook) => {
                   return     filteredBook.userId === bookUserObject.id ?  <section className="savedBook">
                            <header>{filteredBook?.book?.title}</header>
                             <footer> {filteredBook?.book?.author}</footer> 
                        </section>
                        : ""
                    }
                )
            }
        </article>
    </>
}











