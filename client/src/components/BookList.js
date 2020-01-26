import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { getBooksQuery } from '../queries/queries'

// components
import BookDetails from './BookDetails';

export default function BookList() {
    const { loading, data } = useQuery(getBooksQuery);
    const [bookId, setBookId] = useState(null);

    const displayBooks = () => {
        
        return loading ? <li>Loading..</li> :
            data.books.map((book, index) => <li key={index} onClick={() => setBookId(book.id)}>{book.name}</li>)
    }

    return (
        <div>
            <ul id="book-list">
                {displayBooks()}
            </ul>
            <BookDetails bookId={bookId}></BookDetails>
        </div>
    )
}

// export default graphql(getBooksquery)(BookList);