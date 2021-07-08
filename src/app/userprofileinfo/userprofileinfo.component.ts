import { Component, OnInit } from "@angular/core"
import { FormBuilder } from "@angular/forms"

@Component({
  selector: "app-userprofileinfo",
  template: `
  <form [formGroup]="form" style="margin: 10px; width:500px;">
    <mat-card>
      <mat-card-header>
        <mat-card-title>User Profile Information</mat-card-title>
      </mat-card-header>
      <mat-card-content>
          <div>
            <mat-form-field style="width: 100%;">
              <input formControlName="firstName" matInput placeholder="First name">
            </mat-form-field>
          </div>
          <div>
            <mat-form-field style="width: 100%;">
              <input  formControlName="lastName" matInput placeholder="Last name">
            </mat-form-field>
          </div>
          <div>
            <mat-form-field style="width: 100%;">
              <textarea  formControlName="address" matInput placeholder="Address"></textarea>
            </mat-form-field>
          </div>
          <div>
            <mat-form-field style="width: 100%;" appearance="fill">
                <mat-label>Select DOB</mat-label>
                <input  formControlName="dateOfBirth" matInput [matDatepicker]="picker">
                <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
                <mat-datepicker #picker></mat-datepicker>
            </mat-form-field>                  
          </div>
          <div>
              <mat-radio-group  formControlName="gender" class="margin-left">
                  <mat-radio-button value="male" style="margin: 5px;"> Male </mat-radio-button>
                  <mat-radio-button value="female"> Female </mat-radio-button>
              </mat-radio-group>
          </div>
      </mat-card-content>
      <mat-card-actions>
        <button (click)="saveForm()" mat-raised-button color="primary">Save</button>
      </mat-card-actions>
    </mat-card>
  </form>    
  `,
  styles: [
  ]
})
export class UserprofileinfoComponent implements OnInit {
  constructor(private fb:FormBuilder) { }
  form = this.fb.group({
    firstName:[""],
    lastName:[""],
    address:[""],
    dateOfBirth:[""],
    gender:["male"]   
  })
  ngOnInit(): void {
  }
  saveForm(){console.log("User Info:", this.form.value)}
}
