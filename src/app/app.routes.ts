import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ChannelsComponent } from './channels/channels.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'channels', component: ChannelsComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: '**', component: NotFoundComponent}
];
