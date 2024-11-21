import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ChannelsComponent } from './channels/channels.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule,HomeComponent,ChannelsComponent,ProfileComponent,LoginComponent,RegisterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'messagerie';
}
