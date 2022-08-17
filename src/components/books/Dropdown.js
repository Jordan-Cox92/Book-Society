import React, { useState } from 'react';
import {UncontrolledDropdown, 
   
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export const DropSelector = ({ saveBook, completedBook, masterpieceBook, despisedBook, book }) => {
    return (
        <div className="d-flex p-5">
            <UncontrolledDropdown className="me-2" direction="down">
                <DropdownToggle caret color="danger" >Dropdown</DropdownToggle>
                <DropdownMenu className='book-dropdown' >
                    <DropdownItem onClick={
                        (evt)=>{
                            completedBook(book)
                        }
                    }>
                        Completed Books</DropdownItem>
                    <DropdownItem onClick={
                        (evt)=>{
                            masterpieceBook(book)
                        }
                    } >Masterpieces</DropdownItem>
                    <DropdownItem onClick={
                        (evt)=>{
                            despisedBook(book)
                        }
                    }>Books You Despise</DropdownItem>
                    <DropdownItem onClick={
                        (evt)=>{
                            saveBook(book)
                        }
                          
                    }>Want to Read</DropdownItem>




                    
                </DropdownMenu>
            </UncontrolledDropdown>
        </div>
    );
}
