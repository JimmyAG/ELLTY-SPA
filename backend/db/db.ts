/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from './init'

export function dbGet(sql: string, params: unknown[] = []): unknown {
    return db.prepare(sql).get(params)
}

export function dbAll(sql: string, params: unknown[] = []): unknown[] {
    return db.prepare(sql).all(params)
}

export function dbInsert(sql: string, params: unknown[] = []): unknown {
    return db.prepare(sql).run(params)
}

export default db
