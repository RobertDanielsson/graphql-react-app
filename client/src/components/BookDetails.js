import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { getBookQuery } from '../queries/queries'


export default function BookList({ bookId }) {
    const { loading, error, data } = useQuery(getBookQuery, {
        variables: { id: bookId }
    });
    
    if(!loading){
        console.log(data);
    }

    if(error){
        return <div>
            <p>Failed to fetch from database</p>
        </div>
    }

    const displayBookDetails = () => {
        const { book } = data || {};

        return book ? 
        <div>
            <h2>{book.name}</h2>
            <p>{book.genre}</p>
            <br></br>
            <p>Author: {book.author.name}</p>
            <p>Author age: {book.author.age}</p>
            <p>All books by this author:</p>

            <ul className="other-books">
                {book.author.books.map((currentBook, index) => {
                    console.log(currentBook)
                    return <li key={index}>{currentBook.name} - {currentBook.genre}</li>
                })}
            </ul>
        </div> 
        : 
        <div>No book selected</div>
    }

    return (
        <div id="book-details">
            <p>Output book details here</p>
            {displayBookDetails()}
        </div>
    )
}

// export default graphql(getBooksquery)(BookList);