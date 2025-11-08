import { dbAll, dbGet, dbInsert } from '../db/db'
import { Post } from '../db/table_types/post'

class PostRepository {
    getAllPosts() {
        const posts = dbAll('SELECT * FROM posts ORDER BY created_at DESC')

        return posts
    }

    createNewPost(data?: {
        parentId?: number
        operation?: string
        value: number
    }) {
        const { operation, parentId, value } = data
        let result = value

        if (parentId) {
            const parent = dbGet('SELECT * FROM posts WHERE id = ?', [
                parentId,
            ]) as Post

            if (parent)
                switch (operation) {
                    case '+':
                        result = parent.result + value
                        break
                    case '-':
                        result = parent.result - value
                        break
                    case '*':
                        result = parent.result * value
                        break
                    case '/':
                        result = parent.result / value
                        break
                }
        }

        const insert = dbInsert(
            'INSERT INTO posts (parent_id, user_id, operation, operand, result) VALUES (?, ?, ?, ?, ?)',
            [parentId ?? null, 1, operation, value, result]
        ) as { lastInsertRowid: number }

        const post = dbGet('SELECT * FROM posts WHERE id = ?', [
            insert.lastInsertRowid,
        ])

        return post
    }
}

const postRepository = new PostRepository()
export default postRepository
