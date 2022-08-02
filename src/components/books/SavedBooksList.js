// import { useEffect, useState } from "react"


// export const SavedBooksList = () => {
//     const [books, setBooks] = useState([]) //the initial state is an empty array, the current state is books, and setBooks is a function that updates state 

//     useEffect(
//        () => {
          
//            fetch(` http://localhost:8088/books`)
//            .then(response => response.json())
//            .then((bookArray) => {
//               setBooks(bookArray)

//            })

          
//        },
//        [] // When this array is empty, you are observing initial component state
//    )
//    return <>
//        <h2>Saved Books</h2>

//        <article className="savedBooks">
//            {

//                books.map(
//                    (book) => {
//                        return <section className="savedBook">
//                            <header>{book.title}</header>
//                            <footer>author: {book.author}</footer>
//                        </section>
//                   }
//               )
//           }
//        </article>
//    </>
// }    
