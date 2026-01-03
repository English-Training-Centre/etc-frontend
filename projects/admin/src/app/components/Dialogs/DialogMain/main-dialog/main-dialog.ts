import { Component } from '@angular/core';
import { DeleteAnyDialog } from "../delete-any-dialog/delete-any-dialog";
import { CreateEmployeesDialog } from "../../HumanResources/create-employees-dialog/create-employees-dialog";

@Component({
  selector: 'app-main-dialog',
  imports: [DeleteAnyDialog, CreateEmployeesDialog],
  templateUrl: './main-dialog.html',
  styleUrl: './main-dialog.scss',
})
export class MainDialog {

}
