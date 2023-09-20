import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';
// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

const users: User[] = [
  { id: 1, name: 'Tom', lastName: 'McDonalds', age: 65, gender: 'male' },
  { id: 2, name: 'Alice', lastName: 'Smith', age: 28, gender: 'female' },
  { id: 3, name: 'Bob', lastName: 'Johnson', age: 42, gender: 'male' },
  { id: 4, name: 'Charlie', lastName: 'Brown', age: 35, gender: 'male' },
  { id: 5, name: 'David', lastName: 'Davis', age: 53, gender: 'male' },
  { id: 6, name: 'Eve', lastName: 'Lee', age: 45, gender: 'female' },
  { id: 7, name: 'Frank', lastName: 'Wilson', age: 61, gender: 'male' },
  { id: 8, name: 'Grace', lastName: 'Miller', age: 29, gender: 'female' },
  { id: 9, name: 'Hannah', lastName: 'Anderson', age: 37, gender: 'female' },
  { id: 10, name: 'Isaac', lastName: 'Taylor', age: 24, gender: 'male' },
];
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  array: User[] = [];
  constructor(private userService: UserService) {}
  displayedColumns: string[] = ['name', 'lastName', 'age', 'gender', 'actions'];
  dataSource = this.array;

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.users.subscribe((data) => {
      this.dataSource = data;
      console.log(this.dataSource);
    });
  }
  onDeleteUser(id: number): void {
    console.log(id);
    this.userService.deleteUser(id);
  }
}
