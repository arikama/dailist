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

export const init = async () => {
  return SQLite.openDatabase({
    location: 'default',
    name: app.DB_NAME
  })
    .then((db) => {
      instance = db
    })
}
