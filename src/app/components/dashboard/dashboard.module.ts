import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { HomeComponent } from '../home/home.component';
import { UsersComponent } from '../users/users.component';
import { ReportsComponent } from '../reports/reports.component';
import { EditDialogComponent } from '../dialog/edit-dialog/edit-dialog.component';
import { FormsModule } from '@angular/forms';
import { AddDialogComponent } from '../dialog/add-dialog/add-dialog.component';
@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    HomeComponent,
    UsersComponent,
    ReportsComponent,
    EditDialogComponent,
    AddDialogComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule, SharedModule, FormsModule],
})
export class DashboardModule {}
