import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';
import { EditDialogComponent } from '../dialog/edit-dialog/edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '../dialog/confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  array: User[] = [];
  constructor(private userService: UserService, private dialog: MatDialog) {}
  displayedColumns: string[] = ['name', 'lastName', 'age', 'gender', 'actions'];
  dataSource = new MatTableDataSource<User>(this.array);
  ngOnInit(): void {
    this.userService.users.subscribe((data) => {
      this.dataSource.data = data;
      console.log(this.dataSource);
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  onDeleteUser(id: number): void {
    // console.log(id);
    // this.userService.deleteUser(id);
    this.dialog.open(ConfirmDialogComponent, { data: id });
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
      this.dialog.open(EditDialogComponent, {
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
  }
}
