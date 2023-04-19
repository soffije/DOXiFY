import Dexie from 'dexie'
import avatarSettingsObj from '../utils/defoultAvatarSetting'

const DB_NAME = 'Doxify-database'
const DB_VERSION = 1

class FriendsDB extends Dexie {
  constructor() {
    super(DB_NAME)
    this.version(DB_VERSION).stores({
      friends:
        '&address, name, lastMessage, numberOfUnreadMessages, avatarSettingsObj',
    })
  }

  async getAllFriends() {
    try {
      const friends = await this.table('friends').toArray()
      console.log(friends)
      return friends
    } catch (error) {
      console.error('Error getting friends from IndexedDB', error)
      throw error
    }
  }

  async getFriend(address) {
    try {
      const friend = await this.table('friends').get(address.toLowerCase())
      if (!friend) {
        return {
          name: 'Unknown',
          lastMessage: '',
          numberOfUnreadMessages: 0,
          avatarSettingsObj,
        }
      }
      return friend
    } catch (error) {
      console.error('Error getting friend from IndexedDB', error)
      throw error
    }
  }

  async addFriend(friend) {
    try {
      await this.table('friends').put(friend)
    } catch (error) {
      console.error('Error adding friend to IndexedDB', error)
      throw error
    }
  }

  async deleteFriend(address) {
    try {
      await this.table('friends').delete(address.toLowerCase())
    } catch (error) {
      console.error('Error deleting friend from IndexedDB', error)
      throw error
    }
  }
}

export const db = new FriendsDB()
