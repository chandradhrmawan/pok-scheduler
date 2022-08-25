import { emptyMessage, errorMessage, statusCode, successMessage } from "../helpers/statusHelpers.js"
import { getAllBooks } from "../services/bookServices.js";

const getMultiBooksByGenre = async (req, res) => {
    try {
        let genres = JSON.parse(req.query.genre)
        let booksData = await getAllBooks()

        if (booksData.length == 0) return res.status(statusCode.success).json(emptyMessage([]))
        let listAllBooks = booksData['data']['works'];

        genres = genres.map(e => e.toLowerCase())

        for (let i = 0; i < listAllBooks.length; i++) {
            for (let j = 0; j < listAllBooks[i]['subject'].length; j++) {
                listAllBooks[i]['subject'][j] = listAllBooks[i]['subject'][j].toLowerCase()
            }
        }

        let filteredBooks = []

        if (genres.length > 0) {
            listAllBooks.map(row => {
                let found = row['subject'].filter(item => genres.includes(item))
                if (found.length > 0) {
                    filteredBooks.push({
                        cover_id: row['cover_id'],
                        title: row['title'],
                        author: row['authors'],
                        edition_count: row['edition_count'],
                        cover_edition_key: row['edition_count']
                    })
                }
            })
        } else {
            listAllBooks.map(row => {
                filteredBooks.push({
                    cover_id: row['cover_id'],
                    title: row['title'],
                    author: row['authors'],
                    edition_count: row['edition_count'],
                    cover_edition_key: row['edition_count']
                })
            })
        }

        res.status(statusCode.success).json(successMessage(filteredBooks))
    } catch (err) {
        res.status(statusCode.bad).json(errorMessage(err.message))
    }
};

const getBooksByGenre = async (req, res) => {
    try {
        let genre = req.query.genre
        let booksData = await getAllBooks()

        if (booksData.length == 0) return res.status(statusCode.success).json(emptyMessage([]))
        let listAllBooks = booksData['data']['works'];

        for (let i = 0; i < listAllBooks.length; i++) {
            for (let j = 0; j < listAllBooks[i]['subject'].length; j++) {
                listAllBooks[i]['subject'][j] = listAllBooks[i]['subject'][j].toLowerCase()
            }
        }

        let filteredBooks = []

        if (genre) {
            listAllBooks.map(row => {
                if (row['subject'].includes(genre.toLowerCase())) {
                    filteredBooks.push({
                        cover_id: row['cover_id'],
                        title: row['title'],
                        author: row['authors'],
                        edition_count: row['edition_count'],
                        cover_edition_key: row['edition_count']
                    })
                }
            })
        } else {
            listAllBooks.map(row => {
                filteredBooks.push({
                    cover_id: row['cover_id'],
                    title: row['title'],
                    author: row['authors'],
                    edition_count: row['edition_count'],
                    cover_edition_key: row['edition_count']
                })
            })
        }

        res.status(statusCode.success).json(successMessage(filteredBooks))
    } catch (err) {
        res.status(statusCode.bad).json(errorMessage(err.message))
    }
}

export {
    getMultiBooksByGenre,
    getBooksByGenre
}