import { useEffect, useState } from "react"

export const BooksYouDespise = () => {
    const [books, setBooks] = useState([])

    useEffect(
        () => {
            console.log("Initial state of books", books) // View the initial state of tickets
        },
        [] // When this array is empty, you are observing initial component state
    )
    return <h2>BooksYouDespise</h2>
}