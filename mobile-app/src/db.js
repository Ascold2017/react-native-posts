import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('posts.db')

export default class DB {
  static init() {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(`CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            text TEXT NOT NULL,
            img TEXT,
            date TEXT,
            booked INTEGER)
        `, [], resolve, (_, error) => reject(error.message))
      })
    })
  }

  static getPosts() {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(`SELECT * FROM posts`,
        [],
        (_, result) => resolve(result.rows._array),
        (_, error) => reject(error.message)
      )
      })
    })
  }

  static createPost({ text, img, date, booked}) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(`INSERT INTO posts (text, img, date, booked) VALUES (?, ?, ?, ?)`,
          [text, img, date, booked],
          (_, result) => resolve(result.insertId),
          (_, error) => reject(error.message)
        )
      })
    })
  }

  static updateIsBooked(isBooked, id) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(`UPDATE posts SET booked = ? WHERE id = ?`,
          [isBooked ? 1 : 0, id],
          () => resolve(true),
          (_, error) => reject(error.message)
        )
      })
    })
  }

  static deletePost(id) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(`DELETE FROM posts WHERE id = ?`,
          [id],
          () => resolve(true),
          (_, error) => reject(error.message)
        )
      })
    })
  }
}