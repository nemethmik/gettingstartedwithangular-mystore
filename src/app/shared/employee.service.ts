import { Injectable } from "@angular/core"

enum TGender {male = "M", female = "F"}
type TDepartmentId = string
export type TEmployee = {
  $key: number,
  fullName: string,
  email: string,
  mobile: string,
  city: string,
  gender: TGender,
  department: TDepartmentId,
  hireDate: Date | string,
  isPermanent: boolean,
}

@Injectable({
  providedIn: "root"
})
export class EmployeeService {
  genderType = {male:TGender.male,female:TGender.female}
  departments :{id:TDepartmentId, description:string}[] = [{id:"1",description:"Sales"},{id:"2",description:"Purchasing"},{id:"3",description:"R&D"}]
  employeeData:TEmployee = {
    $key: 1,
    fullName: "",
    email: "",
    mobile: "",
    city: "Budapest",
    gender: TGender.female,
    department: this.departments[0].id,
    hireDate: "",
    isPermanent: false,
  }
  constructor() { }
}
