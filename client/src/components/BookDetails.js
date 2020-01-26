import React, { useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { getBookQuery } from '../queries/queries'


export default function BookList({ bookId }) {
    const { loading, error, data } = useQuery(getBookQuery, {
        variables: { id: bookId }
    });

    const displayBook = () => {
        const { book } = data || {};

        return book ? 
        <div>
            <h2>{book.name}</h2>
            <p>{book.genre}</p>
            <br></br>
            <p>Author: {book.author.name}</p>
            <p>Author age: {book.author.age}</p>
            <p>All boks by this author:</p>

            <ul className="other-books">
                {book.author.books.map((book, index) => {
                    return <li key={index}>{book.name} - {book.genre}</li>
                })}
            </ul>
        </div> 
        : 
        <div>No book selected</div>
    }

    return (
        <div id="book-details">
            <p>Output book details here</p>
            {displayBook()}
        </div>
    )
}

// export default graphql(getBooksquery)(BookList);