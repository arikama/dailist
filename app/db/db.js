import SQLite from 'react-native-sqlite-storage'
import { app } from 'dl/constants'

SQLite.DEBUG(true)
SQLite.enablePromise(true)

let instance

export const close = async () => {
  if (!instance) {
    return Promise.reject(new Error('no db instance to close'))
  }

  return instance.close()
    .then(() => {
      instance = null
    })
}

const open = async () => {
  if (instance) {
    return instance
  }

  return SQLite.openDatabase({
    location: 'default',
    name: app.DB_NAME
  })
    .then((db) => {
      instance = db
    })
    .then(() => {
      instance.executeSql(`
        CREATE TABLE IF NOT EXISTS stuff (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          item TEXT NOT NULL,
          date_created TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
          date_done TEXT,
          date_archived TEXT,
          date_deleted TEXT
        );
      `)
    })
    .then(() => {
      return instance
    })
}

// CREATE

export const createStuff = async (item) => {
  return open()
    .then((db) => {
      return db.executeSql(`
        INSERT INTO stuff (item) VALUES (?);
      `, [item])
    })
}

// READ

export const readStuff = async () => {
  return open()
    .then((db) => {
      return db.executeSql(`
        SELECT id, item, date_created, date_done, date_archived, date_deleted
        FROM stuff
        ORDER BY date_created DESC;
      `)
    })
    .then(([result]) => {
      const stuff = []

      for (let i = 0; i < result.rows.length; i++) {
        stuff.push(result.rows.item(i))
      }

      return stuff
    })
}

// UPDATE

export const updateStuffDateDeleted = async (id) => {
  return open()
    .then((db) => {
      return db.executeSql(`
        UPDATE stuff SET date_deleted = CURRENT_TIMESTAMP WHERE id = ?;
      `, [id])
    })
}

export const updateStuffDateDeletedToNull = async (id) => {
  return open()
    .then((db) => {
      return db.executeSql(`
        UPDATE stuff SET date_deleted = NULL WHERE id = ?;
      `, [id])
    })
}

export const updateStuffDateDone = async (id) => {
  return open()
    .then((db) => {
      return db.executeSql(`
        UPDATE stuff SET date_done = CURRENT_TIMESTAMP WHERE id = ?;
      `, [id])
    })
}

export const updateStuffDateDoneToNull = async (id) => {
  return open()
    .then((db) => {
      return db.executeSql(`
        UPDATE stuff SET date_done = NULL WHERE id = ?;
      `, [id])
    })
}
