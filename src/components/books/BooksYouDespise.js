import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"





export const DespisedBooks = () => {
    const navigate = useNavigate()
    const [garbageBooks, setGarbageBooks] = useState([])
    const [filteredBooks, setFilteredBooks] = useState([])
    const [comments, setComments] = useState([])
    const localBookUser = localStorage.getItem("book_user")
    const bookUserObject = JSON.parse(localBookUser)
    


    //listens for when the state changes and does something
    useEffect(
        () => {
            getAllDespisedBooks()
        },
        []
    )
    //Filter through the wish books until you find that the userId associated with wish books(aka savedBooks in database) === the id of the localBookUser
    useEffect(
        () => {
            const userBooks = garbageBooks.filter(book => book.userId === bookUserObject.id)
            setFilteredBooks(userBooks)
        },
        [garbageBooks]
    )
    //function to get all saved books via fetch and then set those saved books in an array
    const getAllDespisedBooks = () => {
        fetch(`http://localhost:8088/despisedBooks?_expand=book`)
            .then(response => response.json())
            .then((despisedBooksArray) => {
                setGarbageBooks(despisedBooksArray)
            })
    }

    //function to delete a particular book in my savedBooks array
    const deleteDespisedBooks = (despisedBook) => {
        fetch(`http://localhost:8088/despisedBooks/${despisedBook.id}`, {
            method: "DELETE"
        })
            .then(() => {
                getAllDespisedBooks()
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
        },
        []
    )

     const displayComments = (filteredBook) => {
       
         return <>{comments.filter((comment)=> 
             {return comment.userId == filteredBook.userId && comment.despisedBookId == filteredBook.bookId })
            .map((comment)=>{return<li key={comment.id}>{comment.content}</li>})}</>
     }

     const deleteComments = (id) => {
         fetch(`http://localhost:8088/comments/${id}`, {
            method: "DELETE"
        })
            .then(() => {
                 getAllComments()
             })

     }
      

     
   
    return <>
        <h2>Despised Books</h2>

        <article className="despisedBooks">
            {

                filteredBooks.map(
                    (filteredBook) => {
                        return filteredBook.userId === bookUserObject.id
                            ? <section key={filteredBook.id} className="despisedBook">
                                <header>{filteredBook?.book?.title}</header>
                                <footer> {filteredBook?.book?.author}</footer>
                                <button onClick={() => navigate(`/${filteredBook.bookId}`)}>Add Comment</button>
                                <button onClick={() => deleteDespisedBooks(filteredBook)}>Delete Book</button>
                                <footer> <ul>{displayComments(filteredBook)}</ul></footer>
                                <button onClick={() => deleteComments(comments.id)}>Delete Comment</button>

                            </section>
                            : ""
                    }
                )
            }
        </article>
    </>
}