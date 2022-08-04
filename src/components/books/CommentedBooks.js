import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const CommentForm = () => {
    const navigate = useNavigate()
    const {bookId} = useParams()
    const [comment, update] = useState({
        content: ""
    })

    const localBookUser = localStorage.getItem("book_user")
    const bookUserObject = JSON.parse(localBookUser)

    const saveButtonClick = (event) => {
        event.preventDefault()

        const commentToSendToAPI = {
            savedBookId: bookId,
            userId: bookUserObject.id,
            content: comment.content
        }

        return fetch(`http://localhost:8088/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(commentToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/WantToRead")
            })
    }

    return (
        <form className="commentForm">
            <h2 className="commentForm__title">New Comment</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description"></label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Leave a comment here"
                        value={comment.content}
                        onChange={
                            (evt) => {
                                const copy = { ...comment }
                                copy.content = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>

            <button
                onClick={(clickEvent) => saveButtonClick(clickEvent)}
                className="btn btn-primary">
                Submit Comment
            </button>
        </form>
    )
}