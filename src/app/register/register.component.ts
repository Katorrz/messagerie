import { Component } from '@angular/core';
import { User } from '../../objects/users';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  users: User[] = [];
  newUser: User = new User('', '');
  userExistsMessage = '';

  constructor() {
    this.loadUsers(); // Charger les utilisateurs depuis le Session Storage au démarrage
  }

  addUser() {
    if (!this.newUser.nom || !this.newUser.password) {
      this.userExistsMessage = 'Veuillez fournir un nom et un mot de passe.';
      return;
    }

    if (this.checkUser(this.newUser)) {
      this.userExistsMessage = 'L’utilisateur existe déjà.';
    } else {
      this.users.push(new User(this.newUser.nom, this.newUser.password));
      this.saveUsers(); // Sauvegarder dans le Session Storage
      this.userExistsMessage = 'Nouvel utilisateur ajouté avec succès.';
      this.newUser = new User('', ''); // Réinitialiser les champs
    }
  }

  checkUser(user: User): boolean {
    return this.users.some(
      (u) => u.nom === user.nom && u.password === user.password
    );
  }

  saveUsers() {
    // Sauvegarde les utilisateurs dans le Session Storage
    sessionStorage.setItem('users', JSON.stringify(this.users));
  }

  loadUsers() {
    if (this.isSessionStorageAvailable()) {
      const usersData = sessionStorage.getItem('users');
      if (usersData) {
        this.users = JSON.parse(usersData).map(
          (user: any) => new User(user.nom, user.password)
        );
      } else {
        // Si aucun utilisateur n'est stocké, initialiser avec des utilisateurs par défaut
        this.users = [new User('user1', 'pass1'), new User('user2', 'pass2')];
        this.saveUsers(); // Sauvegarder les utilisateurs par défaut
      }
    }
  }
  private isSessionStorageAvailable(): boolean {
    try {
      return typeof sessionStorage !== 'undefined';
    } catch {
      console.warn('Session Storage n’est pas disponible.');
      return false;
    }
  }
}
