import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';
import { EditDialogComponent } from '../dialog/edit-dialog/edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AddDialogComponent } from '../dialog/add-dialog/add-dialog.component';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  array: User[] = [];
  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private dialog2: MatDialog
  ) {}
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
  onEdit(element?: any) {
    if (element) {
      let userEdit: User = {
        id: element.id,
        name: element.name,
        lastName: element.lastName,
        age: element.age,
        gender: element.gender,
      };
      let popup = this.dialog.open(EditDialogComponent, {
        data: userEdit,
        enterAnimationDuration: '300ms',
        exitAnimationDuration: '300ms',
        autoFocus: false,
      });
    } else {
      this.dialog.open(EditDialogComponent, {
        enterAnimationDuration: '300ms',
        exitAnimationDuration: '300ms',
        autoFocus: true,
      });
    }

    // popup.afterClosed().subscribe((e) => {
    //   this.userService.users.subscribe((data) => {
    //     this.dataSource = data;
    //     console.log(this.dataSource);
    //     this.userService.users.subscribe((data) => {
    //       this.dataSource = data;
    //       console.log(this.dataSource);
    //     });
    //   });
    // });
  }
  onAdd() {
    this.dialog2.open(AddDialogComponent, {
      width: '500px',
      height: '500px',
    });
  }
}
