import React, { useState } from 'react'
import { graphql } from 'react-apollo'
import { getAuthorsQuery, AddBookMutation, getBooksQuery } from '../querys/querys'
import { flowRight as compose } from 'lodash'


function AddBook(props) {

    const [bookName, setBookName] = useState('')
    const [genre, setGenre] = useState('')
    const [author, setAuthor] = useState('')

    const displayAuthors = () => {
        const data = props.getAuthorsQuery
        if (data.loading) {
            return <option>Loading</option>
        } else {
            return data.authors.map(author => {
                return <option key={author.id} value={author.id}>{author.name}</option>
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        props.AddBookMutation({
            variables: {
                name: bookName,
                genre: genre,
                authorId: author
            },
            refetchQueries: [{ query: getBooksQuery }]
        })
    }

    return (<form id="add-book" onSubmit={handleSubmit}>
        <div className="field">
            <label>Book Name:</label>
            <input onChange={(e) => { setBookName(e.target.value) }} type="text" />

        </div>

        <div className="field">
            <label>Genre:</label>
            <input onChange={(e) => { setGenre(e.target.value) }} type="text" />

        </div>

        <div className="field">
            <label>Author:</label>
            <select onChange={(e) => { setAuthor(e.target.value) }}>
                <option>Select Author</option>
                {displayAuthors()}
            </select>

        </div>

        <button>+</button>


    </form>)
}

export default compose(
    graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
    graphql(AddBookMutation, { name: 'AddBookMutation' }),
)(AddBook)