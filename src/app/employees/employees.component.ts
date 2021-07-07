import { Component, OnInit } from "@angular/core"
//import {MatToolbarModule} from "@angular/material/toolbar"

@Component({
  selector: "app-employees",
  template: `
    <div class="container">
      <mat-toolbar color=primary>
        <span class="fill-remaining-space"></span>
        <span>Angular 12 Material</span>
        <span class="fill-remaining-space"></span>
      </mat-toolbar>
      <app-employee></app-employee>
    </div>
  `,
  styles: [
  ]
})
export class EmployeesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {}

}
