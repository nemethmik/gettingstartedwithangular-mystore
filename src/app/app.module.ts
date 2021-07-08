import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { AppComponent } from "./app.component"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { EmployeesComponent } from "./employees/employees.component"
import { EmployeeComponent } from "./employees/employee/employee.component"
import { EmployeeService } from "./shared/employee.service"
import { ReactiveFormsModule, FormsModule } from "@angular/forms"
import {MatToolbarModule} from "@angular/material/toolbar"
import {MatGridListModule} from "@angular/material/grid-list"
import {MatFormFieldModule} from "@angular/material/form-field"
import {MatInputModule} from "@angular/material/input"
import {MatIconModule} from "@angular/material/icon"
import {MatRadioModule} from "@angular/material/radio"
import {MatSelectModule} from "@angular/material/select"
import { MatCardModule } from "@angular/material/card"
import { MatDatepickerModule } from "@angular/material/datepicker"
import { MatNativeDateModule } from "@angular/material/core"
import { MatButtonModule } from "@angular/material/button"
import { MatListModule} from "@angular/material/list"
import {MatCheckboxModule} from "@angular/material/checkbox"
import { UserprofileinfoComponent } from "./userprofileinfo/userprofileinfo.component"

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    EmployeeComponent,
    UserprofileinfoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule, FormsModule,
    MatToolbarModule,MatGridListModule,MatFormFieldModule,MatInputModule,MatIconModule,MatRadioModule,MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule, MatCheckboxModule,
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
