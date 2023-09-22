import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';
import { EditDialogComponent } from '../dialog/edit-dialog/edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  array: User[] = [];
  constructor(private userService: UserService, private dialog: MatDialog) {}
  displayedColumns: string[] = ['name', 'lastName', 'age', 'gender', 'actions'];
  dataSource = this.array;

  ngOnInit(): void {
    this.userService.users.subscribe((data) => {
      this.dataSource = data;
      console.log(this.dataSource);
    });
  }

  onDeleteUser(id: number): void {
    console.log(id);
    this.userService.deleteUser(id);
  }
  onEdit(
    id: number,
    name: string,
    lastName: string,
    age: number,
    gender: 'male' | 'female'
  ) {
    let userEdit: User = {
      id,
      name,
      lastName,
      age,
      gender,
    };
    let popup = this.dialog.open(EditDialogComponent, {
      data: userEdit,
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });
    popup.afterClosed().subscribe((e) => {
      this.userService.users.subscribe((data) => {
        this.dataSource = data;
        console.log(this.dataSource);
        this.userService.users.subscribe((data) => {
          this.dataSource = data;
          console.log(this.dataSource);
        });
      });
    });
  }
}
