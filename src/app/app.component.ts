import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { Firestore } from '@angular/fire/firestore';
import { collection, addDoc, getDocs } from 'firebase/firestore';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, NotFoundComponent, RouterModule, LoginComponent, ChatComponent, RegisterComponent, ProfileComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'Messagerie Firebase';
  
  private firestore = inject(Firestore); // Injection de Firestore

  constructor() {}

  // Ajouter un message à Firestore
  async addMessage(message: string) {
    try {
      const messagesCollection = collection(this.firestore, 'messages');
      await addDoc(messagesCollection, {
        content: message,
        timestamp: new Date(),
      });
      console.log('Message ajouté avec succès');
    } catch (error) {
      console.error('Erreur lors de l\'ajout du message :', error);
    }
  }

  // Charger les messages depuis Firestore
  async loadMessages() {
    try {
      const messagesCollection = collection(this.firestore, 'messages');
      const querySnapshot = await getDocs(messagesCollection);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des messages :', error);
    }
  }
  
  // Effacer tout le stockage de session (si nécessaire)
  public deleteAll() {
    sessionStorage.clear();
  }
}
