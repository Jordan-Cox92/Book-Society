import { useState } from "react"
import { BookList } from "./BookList"
import { BookSearch } from "./BookSearch"

//parent component that allows sibling components of BookList and BookSearch to speak to one another
export const BookContainer = () => {
    const [searchTerms, setSearchTerms] = useState("") 

    return <>
        <BookSearch setterFunction={setSearchTerms} />
        <BookList searchTermState={searchTerms} />
    </>
}