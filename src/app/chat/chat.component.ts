import { Component, OnInit } from '@angular/core';
import { ChatService, Message } from '../chat.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { User } from '../../objects/users';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  users: string[] = []; 
  messages: Message[] = [];
  newMessage: string = '';
  currentUser: string = '';
  selectedUser: string = ''; 

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.loadUsers(); // Charger les utilisateurs depuis le sessionStorage
    this.setCurrentUser(); // Définir l'utilisateur courant
  }

  private isSessionStorageAvailable(): boolean {
    try {
      return typeof sessionStorage !== 'undefined';
    } catch {
      console.warn('Session Storage n’est pas disponible.');
      return false;
    }
  }

  loadUsers(): void {
    if (this.isSessionStorageAvailable()) {
      const storedUsers = sessionStorage.getItem('users');
      if (storedUsers) {
        this.users = JSON.parse(storedUsers).map((user: { nom: string }) => user.nom);
      } else {
        console.warn('Aucun utilisateur trouvé dans le Session Storage.');
      }
    } else {
      console.warn('Session Storage n’est pas pris en charge.');
    }
  }

  setCurrentUser(): void {
    if (this.isSessionStorageAvailable()) {
      const storedCurrentUser = sessionStorage.getItem('currentUser');
      if (storedCurrentUser) {
        this.currentUser = storedCurrentUser;
      } else {
        console.warn('Aucun utilisateur courant défini.');
        this.currentUser = 'defaultUser'; // Valeur par défaut
      }
    } else {
      this.currentUser = 'defaultUser'; // Valeur par défaut si sessionStorage indisponible
    }
  }

  async selectUser(user: string): Promise<void> {
    this.selectedUser = user;
    this.loadMessages();
  }

  async loadMessages(): Promise<void> {
    if (this.selectedUser) {
      this.messages = await this.chatService.getMessagesBetweenUsers(
        this.currentUser,
        this.selectedUser
      );
    }
  }

  async sendMessage(): Promise<void> {
    if (this.newMessage.trim() && this.selectedUser) {
      const message: Message = {
        sender: this.currentUser,
        receiver: this.selectedUser,
        content: this.newMessage,
        timestamp: new Date(),
      };
      await this.chatService.addMessage(message);
      this.newMessage = '';
      this.loadMessages();
    }
  }
}