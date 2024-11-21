import { Component, OnInit } from '@angular/core';
import { User } from '../../objects/users';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule,NgIf],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  currentUser: User = new User('', ''); // L'utilisateur courant
  users: User[] = []; // Liste des utilisateurs
  newName: string = ''; // Nouveau nom de l'utilisateur
  currentPassword: string = ''; // Mot de passe actuel pour la vérification
  newPassword: string = ''; // Nouveau mot de passe
  message: string = ''; // Message d'erreur ou succès

  constructor() {}

  ngOnInit(): void {
    this.loadCurrentUser();
    this.loadUsers(); // Charger la liste des utilisateurs
  }

  // Charger l'utilisateur courant depuis le sessionStorage
  loadCurrentUser(): void {
    if (this.isSessionStorageAvailable()) {
      const storedCurrentUser = sessionStorage.getItem('currentUser');
      if (storedCurrentUser) {
        this.currentUser = JSON.parse(storedCurrentUser);
      } else {
        console.warn('Aucun utilisateur courant trouvé.');
      }
    }
  }

  // Charger la liste des utilisateurs depuis le sessionStorage
  loadUsers(): void {
    if (this.isSessionStorageAvailable()) {
      const storedUsers = sessionStorage.getItem('users');
      if (storedUsers) {
        this.users = JSON.parse(storedUsers);
      } else {
        console.warn('Aucun utilisateur trouvé dans le Session Storage.');
      }
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


  changeName(): void {
    if (this.newName.trim()) {
      // Sauvegarde de l'ancien nom pour la recherche dans users
      const oldName = this.currentUser.nom;
  
      // Mettre à jour currentUser
      this.currentUser.nom = this.newName;
  
      // Mettre à jour la liste des utilisateurs
      const userIndex = this.users.findIndex(user => user.nom === oldName);
      if (userIndex !== -1) {
        this.users[userIndex].nom = this.newName; // Mettre à jour le nom dans la liste users
      }
  
      // Sauvegarder currentUser et users dans sessionStorage
      sessionStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      sessionStorage.setItem('users', JSON.stringify(this.users));
  
      this.message = 'Le nom a été mis à jour avec succès.';
      this.newName = ''; // Réinitialiser le champ
    } else {
      this.message = 'Veuillez entrer un nouveau nom.';
    }
  }
  

  // Changer le mot de passe
  changePassword(): void {
    if (!this.currentPassword || !this.newPassword) {
      this.message = 'Veuillez entrer le mot de passe actuel et le nouveau mot de passe.';
      return;
    }
  
    if (this.currentPassword !== this.currentUser.password) {
      this.message = 'Le mot de passe actuel est incorrect.';
      return;
    }
  
    // Mise à jour du mot de passe dans currentUser et dans la liste des utilisateurs
    this.currentUser.password = this.newPassword;
  
    // Mettre à jour le mot de passe dans la liste users
    const userIndex = this.users.findIndex(user => user.nom === this.currentUser.nom);
    if (userIndex !== -1) {
      this.users[userIndex].password = this.newPassword;
    }
  
    // Sauvegarder currentUser et users dans sessionStorage
    sessionStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    sessionStorage.setItem('users', JSON.stringify(this.users));
  
    this.message = 'Le mot de passe a été mis à jour avec succès.';
    this.currentPassword = ''; // Réinitialiser les champs
    this.newPassword = ''; // Réinitialiser les champs
  }
  
}
