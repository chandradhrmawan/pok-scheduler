import axios from 'axios';

const getAllBooks = async () => {
    try {
        let response = await axios.get('https://openlibrary.org/subjects/love.json');
        return response ? response : []
    } catch (err) {
        throw new Error(err.message);
    }
}

const getDetailBooks = async (id) => {
    try {
        let dataBooks = await getAllBooks()
        let detailBooks = dataBooks['data']['works'].find(row => row['cover_id'] == id)
        return detailBooks ? { isFound: true, data: detailBooks } : { isFound: false }
    } catch (err) {
        throw new Error(err.message);
    }
}

export { getAllBooks, getDetailBooks }