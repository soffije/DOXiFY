import Dexie from 'dexie'
import avatarSettings from '../utils/defaultAvatarSetting'

const DB_NAME = 'Doxify-database'
const DB_VERSION = 2

class FriendsDB extends Dexie {
  constructor() {
    super(DB_NAME)
    this.version(DB_VERSION).stores({
      friends:
        '&address, name, lastMessage, numberOfUnreadMessages, avatarSettings',
      chatHistory: '&++id, sender, recipient, message, timestamp',
    })
  }

  async getAllFriends() {
    try {
      return await this.table('friends').toArray()
    } catch (error) {
      console.error('Error getting friends from IndexedDB', error)
      throw error
    }
  }

  async getFriend(address) {
    try {
      const friend = await this.table('friends').get(address.toLowerCase())
      if (!friend)
        return {
          name: 'Unknown',
          lastMessage: '',
          numberOfUnreadMessages: 0,
          avatarSettings,
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

  async addChatMessage(sender, recipient, message) {
    try {
      const timestamp = Date.now()
      await this.table('chatHistory').add({
        sender,
        recipient,
        message,
        timestamp,
      })
    } catch (error) {
      console.error('Error adding chat message to IndexedDB', error)
      throw error
    }
  }

  async getChatHistory(sender, recipient) {
    try {
      return await this.table('chatHistory')
        .where('[sender+recipient]')
        .equals([sender, recipient])
        .toArray()
    } catch (error) {
      console.error('Error getting chat history from IndexedDB', error)
      throw error
    }
  }
}

export const db = new FriendsDB()
