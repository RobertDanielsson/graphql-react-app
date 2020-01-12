import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

const getBooksQuery = gql`
    {
        books{
         name
         id
        }
    }
`;

export default function BookList() {
    const { loading, data } = useQuery(getBooksQuery);

    const displayBooks = () => {
        return loading ? <li>Loading..</li> : 
        data.books.map((book, index) => <li key={index}>{book.name}</li>)
    }

    return (
        <div>
            <ul id="book-list">
                {displayBooks()}
            </ul>
        </div>
    )
}

// export default graphql(getBooksquery)(BookList);