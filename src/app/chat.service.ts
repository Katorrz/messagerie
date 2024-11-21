import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { User } from '../objects/users';

export interface Message {
  id?: number;
  sender: string;
  receiver: string;
  content: string;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root',
})
export class ChatService extends Dexie {
  messages!: Table<Message, number>;
  users!: Table<User, string>; // Table pour stocker les utilisateurs

  constructor() {
    super('ChatDatabase');
    this.version(1).stores({
      messages: '++id,sender,receiver,timestamp',
      users: 'nom', // Indexation sur le champ `nom`
    });
  }

  async addUser(user: User): Promise<void> {
    await this.users.add(user);
  }

  async getAllUsers(): Promise<User[]> {
    return this.users.toArray();
  }

  async getMessagesBetweenUsers(user1: string, user2: string): Promise<Message[]> {
    return this.messages
      .where('sender')
      .equals(user1)
      .or('receiver')
      .equals(user2)
      .toArray();
  }

  async addMessage(message: Message): Promise<number> {
    return this.messages.add(message);
  }
}
