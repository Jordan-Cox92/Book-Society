import { useEffect, useState } from "react"


export const CompletedBooks = () => {
    const [books, setBooks] = useState([]) //the initial state is an empty array, the current state is books, and setBooks is a function that updates state 

    useEffect(
        () => {
            fetch(`http://localhost:8088/savedBooks`)
            .then(response => response.json())
            .then((bookArray) => {
                setBooks(bookArray)

            })

            
        },
        [] // When this array is empty, you are observing initial component state
    )
    return <>
        <h2>Completed Books</h2>

        <article className="savedBooks">
            {

                books.map(
                    (savedBook) => {
                        return <section className="savedBook">
                            <header>{savedBook.bookId}</header>
                            <footer>author: {savedBook.bookId}</footer>
                        </section>
                    }
                )
            }
        </article>
    </>
}    
    
          

          
        

            


    
       
