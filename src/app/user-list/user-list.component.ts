import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  users = [
    { nom: 'user1' },
    { nom: 'user2' },
    { nom: 'user3' }
  ];

  constructor(private router: Router) {}

  // Lorsqu'un utilisateur est sélectionné, rediriger vers la page de discussion
  startChat(user: string): void {
    this.router.navigate(['/chat', user]); // La route pour la discussion
  }
}
