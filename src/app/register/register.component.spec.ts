import { TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { User } from '../../objects/users';
import { provideRouter } from '@angular/router';


describe('RegisterComponent', () => {
  let component: RegisterComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [provideRouter],
      declarations: [RegisterComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;

    // Préparer des utilisateurs simulés
    component.users = [
      new User('user1', 'pass1'),
      new User('user2', 'pass2'),
        ];
  });

  it('should return true if the user exists with the correct credentials', () => {
    const validUser = new User('user1', 'pass1');
    expect(component.checkUser(validUser)).toBeTrue();
  });

  it('should return false if the username exists but the password is incorrect', () => {
    const invalidPasswordUser = new User('user1', 'wrongpass');
    expect(component.checkUser(invalidPasswordUser)).toBeFalse();
  });

  it('should return false if the username does not exist', () => {
    const nonExistentUser = new User('unknown', 'pass1');
    expect(component.checkUser(nonExistentUser)).toBeFalse();
  });

  it('should add a new user if the username and password are provided and do not already exist', () => {
    component.newUser = new User('newUser', 'newPass');
    component.addUser();

    expect(component.users.length).toBe(2);
    expect(component.users[2]).toEqual(new User('newUser', 'newPass'));
    expect(component.userExistsMessage).toBe('Nouvel utilisateur ajouté avec succès.');
  });

  it('should not add a user if username or password is missing', () => {
    component.newUser = new User('', 'newPass');
    component.addUser();

    expect(component.users.length).toBe(2); // Aucun utilisateur ajouté
    expect(component.userExistsMessage).toBe('Veuillez fournir un nom et un mot de passe.');
  });

  it('should not add a user if the user already exists', () => {
    component.newUser = new User('user1', 'pass1');
    component.addUser();

    expect(component.users.length).toBe(2); // Aucun utilisateur ajouté
    expect(component.userExistsMessage).toBe('L’utilisateur existe déjà.');
  });
});
