import { useState } from "react"
import { BookList } from "./BookList"
import { BookSearch } from "./BookSearch"

export const BookContainer = () => {
    const [searchTerms, setSearchTerms] = useState("") // two sibling components cannot talk to each other - this is parent

    return <>
        <BookSearch setterFunction={setSearchTerms} />
        <BookList searchTermState={searchTerms} />
    </>
}