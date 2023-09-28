import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css'],
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {}
  onClose() {
    this.dialogRef.close();
  }
  onConfirm() {
    this.userService.deleteUser(this.data);
    this.dialogRef.close();
  }
}
