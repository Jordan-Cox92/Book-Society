import { Outlet, Route, Routes } from "react-router-dom"
import { WantToRead } from "../books/WantToRead"
import { CompletedBooks } from "../books/CompletedBooks"
import { Masterpieces } from "../books/Masterpieces"
import { DespisedBooks } from "../books/BooksYouDespise"
import { BookContainer } from "../books/BookContainer"
import { CommentForm } from "../books/CommentedBooks"




export const ApplicationViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    { <h1>Welcome to the Book Society!</h1> }


                    { <h2>A place where you can commune with your books!</h2> }

                  

                    

                 

                   







                    <Outlet />
                </>
            }>


                {<Route path="/CompletedBooks" element={ <CompletedBooks /> } />  }
                <Route path="/WantToRead" element={<WantToRead />} />
                <Route path="/:bookId" element={<CommentForm />} />
                { <Route path="/Masterpieces" element={ <Masterpieces /> } />  }
                { <Route path="/DespisedBooks" element={ <DespisedBooks /> } />  }
                <Route path="/books" element={<BookContainer />} />



            </Route>
        </Routes>
    )
}