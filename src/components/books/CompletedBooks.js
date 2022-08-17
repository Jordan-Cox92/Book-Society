import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"





export const CompletedBooks = () => {
    const navigate = useNavigate()
    const [doneBooks, setDoneBooks] = useState([])
    const [filteredBooks, setFilteredBooks] = useState([])
    const [comments, setComments] = useState([])
    const localBookUser = localStorage.getItem("book_user")
    const bookUserObject = JSON.parse(localBookUser)
    


    //listens for when the state changes and does something
    useEffect(
        () => {
            getAllCompletedBooks()
        },
        []
    )
    //Filter through the wish books until you find that the userId associated with wish books(aka savedBooks in database) === the id of the localBookUser
    useEffect(
        () => {
            const userBooks = doneBooks.filter(book => book.userId === bookUserObject.id)
            setFilteredBooks(userBooks)
        },
        [doneBooks]
    )
    //function to get all saved books via fetch and then set those saved books in an array
    const getAllCompletedBooks = () => {
        fetch(`http://localhost:8088/completedBooks?_expand=book`)
            .then(response => response.json())
            .then((completedBooksArray) => {
                setDoneBooks(completedBooksArray)
            })
    }

    //function to delete a particular book in my savedBooks array
    const deleteCompletedBooks = (completedBook) => {
        fetch(`http://localhost:8088/completedBooks/${completedBook.id}`, {
            method: "DELETE"
        })
            .then(() => {
                getAllCompletedBooks()
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
             {return comment.userId == filteredBook.userId && comment.completedBookId == filteredBook.bookId })
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
        <h2>Completed Books</h2>

        <article className="completedBooks">
            {

                filteredBooks.map(
                    (filteredBook) => {
                        return filteredBook.userId === bookUserObject.id
                            ? <section key={filteredBook.id} className="savedBook">
                                <header>{filteredBook?.book?.title}</header>
                                <footer> {filteredBook?.book?.author}</footer>
                                <button onClick={() => navigate(`/${filteredBook.bookId}`)}>Add Comment</button>
                                <button onClick={() => deleteCompletedBooks(filteredBook)}>Delete Book</button>
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




   
    
          

          
        

            


    
       
