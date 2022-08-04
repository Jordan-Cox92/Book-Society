import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"





export const WantToRead = () => {
    const navigate = useNavigate()
    const [wishBooks, setWishBooks] = useState([])
    const [filteredBooks, setFilteredBooks] = useState([])
    const [comments, setComments] = useState([])
    const localBookUser = localStorage.getItem("book_user")
    const bookUserObject = JSON.parse(localBookUser)
    


    //listens for when the state changes and does something
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

    const getAllComments = () => {
        fetch(`http://localhost:8088/comments`)
            .then(response => response.json())
            .then((commentsArray) => {
                setComments(commentsArray)
            })
    }

    useEffect(
        () => {
            getAllComments()
        }
    )

    const displayComments = (filteredBook) => {
       
        return <>{comments.filter((comment)=> 
            {return comment.userId == filteredBook.userId && comment.savedBookId == filteredBook.bookId })
            .map((comment)=>{return<li key={comment.id}>{comment.content}</li>})}</>
    }

    return <>
        <h2>Want To Read</h2>

        <article className="savedBooks">
            {

                filteredBooks.map(
                    (filteredBook) => {
                        return filteredBook.userId === bookUserObject.id
                            ? <section key={filteredBook.id} className="savedBook">
                                <header>{filteredBook?.book?.title}</header>
                                <footer> {filteredBook?.book?.author}</footer>
                                <button onClick={() => navigate(`/${filteredBook.bookId}`)}>Add Comment</button>
                                <button onClick={() => deleteSavedBooks(filteredBook)}>Delete</button>
                                <footer> <ul>{displayComments(filteredBook)}</ul></footer>
                            </section>
                            : ""
                    }
                )
            }
        </article>
    </>
}











