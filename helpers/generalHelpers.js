import { db, QueryTypes } from "../config/database/database.js"

const select = async (fn, plain = false) => {
    return await db.query(fn, {
        plain: plain,
        type: QueryTypes.SELECT,
    })
}

export {
    select
}
