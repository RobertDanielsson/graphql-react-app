import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries'

export default function Addbook() {
    const [name, setName] = useState("");
    const [genre, setGenre] = useState("");
    const [authorId, setAuthorId] = useState(null);

    const { loading, data } = useQuery(getAuthorsQuery);

    const [saveBook, { error }] = useMutation(addBookMutation, {
        variables: { name, genre, authorId }, refetchQueries: [{query: getBooksQuery}]
    });

    const displayAuthors = () => {
        return loading ? <option disabled>Loading authors..</option> :
            data.authors.map((author, index) => <option key={index} value={author.id}>{author.name}</option>)
    }

    const submitForm = (e) => {
        e.preventDefault();

        saveBook({ 
            variables: { 
                name: name, 
                genre: genre, 
                authorId: authorId 
            } 
        });
    }

    if (error) {
        console.log(error);
    }

    return (
        <form id="add-book" onSubmit={submitForm}>

            <div className="field">
                <label>Book name:</label>
                <input type="text" onChange={e => setName(e.target.value)} />
            </div>

            <div className="field">
                <label>Genre:</label>
                <input type="text" onChange={e => setGenre(e.target.value)} />
            </div>

            <div className="field">
                <label>Author:</label>
                <select onChange={e => setAuthorId(e.target.value)}>
                    <option>Select author</option>
                    {displayAuthors()}
                </select>
            </div>

            <button>+</button>

        </form>
    )
}