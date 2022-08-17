import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"





export const Masterpieces = () => {
    const navigate = useNavigate()
    const [adoredBooks, setAdoredBooks] = useState([])
    const [filteredBooks, setFilteredBooks] = useState([])
    const [comments, setComments] = useState([])
    const localBookUser = localStorage.getItem("book_user")
    const bookUserObject = JSON.parse(localBookUser)
    


    //listens for when the state changes and does something
    useEffect(
        () => {
            getAllMasterpieceBooks()
        },
        []
    )
    //Filter through the wish books until you find that the userId associated with wish books(aka savedBooks in database) === the id of the localBookUser
    useEffect(
        () => {
            const userBooks = adoredBooks.filter(book => book.userId === bookUserObject.id)
            setFilteredBooks(userBooks)
        },
        [adoredBooks]
    )
    //function to get all saved books via fetch and then set those saved books in an array
    const getAllMasterpieceBooks = () => {
        fetch(`http://localhost:8088/masterpieceBooks?_expand=book`)
            .then(response => response.json())
            .then((masterpieceBooksArray) => {
                setAdoredBooks(masterpieceBooksArray)
            })
    }

    //function to delete a particular book in my savedBooks array
    const deleteMasterpieceBooks = (masterpieceBook) => {
        fetch(`http://localhost:8088/masterpieceBooks/${masterpieceBook.id}`, {
            method: "DELETE"
        })
            .then(() => {
                getAllMasterpieceBooks()
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
             {return comment.userId == filteredBook.userId && comment.masterpieceBookId == filteredBook.bookId })
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
        <h2>Masterpieces</h2>

        <article className="masterpieceBooks">
            {

                filteredBooks.map(
                    (filteredBook) => {
                        return filteredBook.userId === bookUserObject.id
                            ? <section key={filteredBook.id} className="savedBook">
                                <header>{filteredBook?.book?.title}</header>
                                <footer> {filteredBook?.book?.author}</footer>
                                <button onClick={() => navigate(`/${filteredBook.bookId}`)}>Add Comment</button>
                                <button onClick={() => deleteMasterpieceBooks(filteredBook)}>Delete Book</button>
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