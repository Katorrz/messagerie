import { Component } from '@angular/core';
import { User } from '../../objects/users';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  title = 'Login';
  loggedInMessage = '';
  loginUser: User = new User('', ''); // Pour stocker les informations saisies

  constructor() {
    if (this.isSessionStorageAvailable()) {
      this.initializeStorage();
    } else {
      console.warn('Session Storage n’est pas disponible.');
    }
  }

  // Vérifie si sessionStorage est disponible
  private isSessionStorageAvailable(): boolean {
    try {
      return typeof sessionStorage !== 'undefined';
    } catch {
      console.warn('Session Storage n’est pas disponible.');
      return false;
    }
  }

  // Initialise le sessionStorage avec des utilisateurs par défaut
  private initializeStorage() {
    if (sessionStorage.getItem('users') === null) {
      const defaultUsers = [
        new User('user1', 'pass1'),
        new User('user2', 'pass2'),
      ];
      sessionStorage.setItem('users', JSON.stringify(defaultUsers));
    }
  }

  // Gère la connexion
  login() {
    if (!this.isSessionStorageAvailable()) {
      this.loggedInMessage = 'Session Storage n’est pas disponible. Impossible de se connecter.';
      return;
    }

    const storedUsers = sessionStorage.getItem('users');
    if (storedUsers) {
      const users: User[] = JSON.parse(storedUsers);
      const userFound = users.some(
        (u) =>
          u.nom === this.loginUser.nom && u.password === this.loginUser.password
      );

      if (userFound) {
        this.loggedInMessage = 'Connexion réussie ! Bienvenue ' + this.loginUser.nom;
      } else {
        this.loggedInMessage = 'Nom d’utilisateur ou mot de passe incorrect.';
      }
    } else {
      this.loggedInMessage = 'Aucun utilisateur trouvé. Veuillez vous enregistrer.';
    }

    // Réinitialiser les champs de connexion
    this.loginUser = new User('', '');
  }
}