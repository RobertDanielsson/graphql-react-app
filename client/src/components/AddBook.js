import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

const getAuthorsQuery = gql`
    {
        authors{
            name
            id
        }
    }
`

export default function Addbook() {
    const { loading, data } = useQuery(getAuthorsQuery);

    const displayAuthors = () => {
        return loading ? <option disabled>Loading authors..</option> :
            data.authors.map((author, index) => <option key={index} value={author.id}>{author.name}</option>)
    }

    return (
        <form id="add-book">

            <div className="field">
                <label>Book name:</label>
                <input type="text" />
            </div>

            <div className="field">
                <label>Genre:</label>
                <input type="text" />
            </div>

            <div className="field">
                <label>Author:</label>
                <select>
                    <option>Select author</option>
                    {displayAuthors()}
                </select>
            </div>

            <button>+</button>

        </form>
    )
}