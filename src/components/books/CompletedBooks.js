import { useEffect, useState } from "react"

export const CompletedBooks = () => {
    const [books, setBooks] = useState([])

    useEffect(
        () => {
            console.log("Initial state of books", books) // View the initial state of tickets
        },
        [] // When this array is empty, you are observing initial component state
    )
    return <h2>Completed Books</h2>
}
