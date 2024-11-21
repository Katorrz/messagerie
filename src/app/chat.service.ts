import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, query, where } from '@angular/fire/firestore';
import { inject } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private firestore = inject(Firestore); // Injecte Firestore dans votre service

  constructor() {}

  // Exemple d'ajout d'un message à Firestore
  async sendMessage(chatId: string, message: string, sender: string) {
    const messagesCollection = collection(this.firestore, 'chats', chatId, 'messages');
    try {
      await addDoc(messagesCollection, {
        message: message,
        sender: sender,
        timestamp: new Date()
      });
      console.log('Message envoyé avec succès');
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message: ', error);
    }
  }

  // Exemple de récupération des messages d'une discussion
  async getMessages(chatId: string) {
    const messagesCollection = collection(this.firestore, 'chats', chatId, 'messages');
    const q = query(messagesCollection);
    const querySnapshot = await getDocs(q);
    const messages: any[] = [];
    querySnapshot.forEach((doc) => {
      messages.push(doc.data());
    });
    return messages;
  }
}
