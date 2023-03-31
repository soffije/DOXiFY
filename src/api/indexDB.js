const DB_NAME = 'my-database'
const DB_VERSION = 1
const STORE_NAME = 'users'

export async function getAllUsers() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onupgradeneeded = function (event) {
      const upgradeDb = event.target.result
      upgradeDb.createObjectStore(STORE_NAME)
    }

    request.onsuccess = function () {
      const db = request.result
      const tx = db.transaction(STORE_NAME, 'readonly')
      const store = tx.objectStore(STORE_NAME)

      const requestGetAll = store.getAll()

      requestGetAll.onsuccess = function () {
        const users = requestGetAll.result
        resolve(users)
      }

      requestGetAll.onerror = function (event) {
        console.error('Error getting users from IndexedDB', event.target.error)
        reject(event.target.error)
      }

      tx.onerror = function (event) {
        console.error('Error getting users from IndexedDB', event.target.error)
        reject(event.target.error)
      }

      db.close()
    }

    request.onerror = function (event) {
      console.error('Error opening IndexedDB database', event.target.error)
      reject(event.target.error)
    }
  })
}

export async function getUser(address) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onupgradeneeded = function (event) {
      const upgradeDb = event.target.result
      upgradeDb.createObjectStore(STORE_NAME)
    }

    request.onsuccess = function () {
      const db = request.result
      const tx = db.transaction(STORE_NAME, 'readonly')
      const store = tx.objectStore(STORE_NAME)

      const requestGet = store.get(address)

      requestGet.onsuccess = function () {
        const user = requestGet.result
        if (!user) {
          resolve({
            name: 'Unknown',
            lastMessage: '',
            numberOfUnreadMessages: 0,
          })
        } else {
          resolve(user)
        }
      }

      requestGet.onerror = function (event) {
        console.error('Error getting user from IndexedDB', event.target.error)
        reject(event.target.error)
      }

      tx.onerror = function (event) {
        console.error('Error getting user from IndexedDB', event.target.error)
        reject(event.target.error)
      }

      db.close()
    }

    request.onerror = function (event) {
      console.error('Error opening IndexedDB database', event.target.error)
      reject(event.target.error)
    }
  })
}
export async function addUser(user) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onupgradeneeded = function (event) {
      const upgradeDb = event.target.result
      upgradeDb.createObjectStore(STORE_NAME)
    }

    request.onsuccess = function () {
      const db = request.result
      const tx = db.transaction(STORE_NAME, 'readwrite')
      const store = tx.objectStore(STORE_NAME)

      const requestAdd = store.add(user, user.address)

      requestAdd.onsuccess = function () {
        resolve()
      }

      requestAdd.onerror = function (event) {
        console.error('Error adding friend to IndexedDB', event.target.error)
        reject(event.target.error)
      }

      tx.onerror = function (event) {
        console.error('Error adding friend to IndexedDB', event.target.error)
        reject(event.target.error)
      }

      db.close()
    }

    request.onerror = function (event) {
      console.error('Error opening IndexedDB database', event.target.error)
      reject(event.target.error)
    }
  })
}
export async function deleteUser(user) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onupgradeneeded = function (event) {
      const upgradeDb = event.target.result
      upgradeDb.createObjectStore(STORE_NAME)
    }

    request.onsuccess = function () {
      const db = request.result
      const tx = db.transaction(STORE_NAME, 'readwrite')
      const store = tx.objectStore(STORE_NAME)

      const requestDelete = store.delete(user.address)

      requestDelete.onsuccess = function () {
        resolve()
      }

      requestDelete.onerror = function (event) {
        console.error('Error deleting user from IndexedDB', event.target.error)
        reject(event.target.error)
      }

      tx.onerror = function (event) {
        console.error('Error deleting user from IndexedDB', event.target.error)
        reject(event.target.error)
      }

      db.close()
    }

    request.onerror = function (event) {
      console.error('Error opening IndexedDB database', event.target.error)
      reject(event.target.error)
    }
  })
}
