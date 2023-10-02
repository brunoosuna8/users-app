import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../components/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  arrayUsers: User[] = [];
  arrayObs: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  constructor(private http: HttpClient) {
    this.getUsersFromJSON().subscribe((users) => {
      this.arrayUsers = users;
      console.log(this.arrayUsers);
      this.arrayObs.next(this.arrayUsers);
    });
  }

  getUsersFromJSON(): Observable<User[]> {
    return this.http.get<User[]>('./assets/data/allUsers.json');
  }
  get users() {
    return this.arrayObs.asObservable();
  }
  deleteUser(id: number): void {
    let filteredArray = this.arrayUsers.filter((e) => e.Id !== id);
    this.arrayUsers = filteredArray;
    this.arrayObs.next(this.arrayUsers);
  }
  updateUser(userUpdated: User) {
    let index = this.arrayUsers.findIndex((e) => e.Id === userUpdated.Id);
    this.arrayUsers[index] = userUpdated;
    this.arrayObs.next([...this.arrayUsers]);
  }
  addUser(newUser: User) {
    this.arrayUsers.unshift(newUser);
    this.arrayObs.next([...this.arrayUsers]);
  }
}
