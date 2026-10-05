import db from '../data/db.json'

export default defineEventHandler(() => {
  return db
})