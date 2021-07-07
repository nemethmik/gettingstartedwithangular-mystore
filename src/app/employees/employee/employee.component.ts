import { Component, OnInit } from "@angular/core"
import { FormControl, FormGroup, Validators } from "@angular/forms"
import { EmployeeService, TEmployee} from "src/app/shared/employee.service"

@Component({
  selector: "app-employee",
  template: `
  <div style="margin: 5px;">
    <form [formGroup]=fg>
          <input type=hidden formControlName=$key />
          <p>
            <mat-form-field appearance="fill" style="background-color: aquamarine;">
              <mat-label>Full Name <mat-icon>favorite</mat-icon></mat-label>
              <input [formControl]=fc.fullName matInput placeholder="Enter your full name">
              <mat-icon matSuffix>face</mat-icon>
              <mat-error>Mandatory value</mat-error>
              <mat-hint>Remember to enter your full name since it is mandatory</mat-hint>
            </mat-form-field>
          </p>
          <p>
            <mat-form-field appearance="fill">
              <mat-label>Your Email Address</mat-label>
              <input [formControl]=fc.email matInput placeholder="Email">
              <mat-icon matSuffix>email</mat-icon>
              <mat-error>Invalid email format</mat-error> 
            </mat-form-field>
          </p>
          <p>
            <mat-form-field appearance="fill">
              <mat-label>Mobile Phone Number</mat-label>
              <input [formControl]=fc.mobile matInput placeholder="Mobile phone number*">
              <mat-icon matSuffix>phone</mat-icon>
              <!-- errors.minLength is not working, unfortunately -->
              <mat-error *ngIf="!fc.mobile.errors?.required">Minimum 8 digits required</mat-error>
              <mat-error *ngIf="fc.mobile.errors?.required">You must add your phone number</mat-error>
              <mat-hint>Remember to enter your phone number</mat-hint>
            </mat-form-field>
          </p>
          <p>
            <mat-form-field appearance="fill">
              <mat-label>City of Residence</mat-label>
              <input [formControl]=fc.city matInput placeholder="City">
              <mat-icon matSuffix>sentiment_very_satisfied</mat-icon>
            </mat-form-field>
          </p>
          <p>
            <mat-radio-group [formControl]=fc.gender>
              <mat-radio-button value={{service.genderType.male}} style="margin: 5px;">Male</mat-radio-button>
              <mat-radio-button value={{service.genderType.female}} style="margin: 5px;">Female</mat-radio-button>
            </mat-radio-group>
          </p>
          <p>
            <mat-form-field appearance="fill">
              <mat-select [formControl]=fc.department placeholder="Department Name">
                <mat-option>None</mat-option>
                <ng-container *ngFor="let d of service.departments">
                  <mat-option value={{d.id}}>{{d.description}}</mat-option>
                </ng-container>                  
              </mat-select>
            </mat-form-field>
          </p>
          <p>
            <mat-form-field appearance="fill">
              <input formControlName=hireDate matInput placeholder="Hire Date" [matDatepicker]=picker>
              <mat-datepicker-toggle matSuffix [for]=picker></mat-datepicker-toggle>
              <mat-datepicker #picker></mat-datepicker>
            </mat-form-field>
          <p>
            <mat-checkbox formControlName=isPermanent>Permanent Employment</mat-checkbox>
          <p>
          <button mat-raised-button color="primary" type="submit" [disabled]="fg.invalid" (click)=onSave()>Save</button>
          <button mat-raised-button color="warn" (click)=onClear() style="margin: 5px;">Clear</button>
    </form>
  </div>


`,
  styles: [
    
  ]
})
export class EmployeeComponent implements OnInit {
  fg: FormGroup
  fc: {
    $key: FormControl,
    fullName: FormControl,
    email: FormControl,
    mobile: FormControl,
    city: FormControl,
    gender: FormControl,
    department: FormControl,
    hireDate: FormControl,
    isPermanent: FormControl,
  }
  constructor(public service:EmployeeService) {
    this.fc = {
      $key: new FormControl(service.employeeData.$key),
      fullName: new FormControl(service.employeeData.fullName,Validators.required),
      email: new FormControl(service.employeeData.email,Validators.email),
      mobile: new FormControl(service.employeeData.mobile,[Validators.required,Validators.minLength(8)]),
      city: new FormControl(service.employeeData.city),
      gender: new FormControl(service.employeeData.gender),
      department: new FormControl(service.employeeData.department),
      hireDate: new FormControl(service.employeeData.hireDate),
      isPermanent: new FormControl(service.employeeData.isPermanent),
    }
    this.fg = new FormGroup(this.fc)
  }
  ngOnInit(): void {
  }
  onClear() {
    this.fg.reset()
    console.log("employeeData on reset",this.service.employeeData)
    this.fg.setValue(this.service.employeeData)
  }
  onSave() {
    console.log("Saved values", this.fg.value)
  }
}
