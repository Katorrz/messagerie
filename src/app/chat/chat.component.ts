import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { Firestore } from '@angular/fire/firestore';
import { collection, addDoc, getDocs } from 'firebase/firestore';


@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  private firestore = inject(Firestore); // Injection de Firestore
  messages: any[] = []; // Tableau pour stocker les messages
  newMessage: string = ''; // Variable pour le nouveau message

  // Implémentation de la méthode ngOnInit
  ngOnInit(): void {
    // Cette méthode est appelée lorsque le composant est initialisé
    this.loadMessages();
  }

  // Envoyer un message
  async sendMessage(message: string) {
    if (message.trim() === '') {
      return; // Ne rien faire si le message est vide
    }

    try {
      const messagesCollection = collection(this.firestore, 'messages');
      await addDoc(messagesCollection, {
        content: message,
        timestamp: new Date(),
      });
      console.log('Message envoyé avec succès');
      this.newMessage = ''; // Réinitialiser le champ après envoi du message
      this.loadMessages();  // Recharger les messages après l'envoi
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message :', error);
    }
  }

  // Charger les messages
  async loadMessages() {
    try {
      const messagesCollection = collection(this.firestore, 'messages');
      const querySnapshot = await getDocs(messagesCollection);
      this.messages = []; // Réinitialiser les messages avant de charger les nouveaux
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        this.messages.push({
          content: data['content'], //pas sur de ces 2 la
          timestamp: data['timestamp'],
        });
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des messages :', error);
    }
  }
}
2. 
