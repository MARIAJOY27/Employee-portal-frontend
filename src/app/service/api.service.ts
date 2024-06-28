import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  serverUrl = `https://employee-portal-backend-23s2.onrender.com`

  //1) create object for BehaviorSubject
  shareData = new BehaviorSubject(false)


  constructor(private http:HttpClient) { }
  //2)function to update BehaviorSubject
  updateData(data:any){
     this.shareData.next(data)
  }

   //api to login
   loginApi(){
    return this.http.get(`${this.serverUrl}/employee/1`)
   }

   //api to add employee
   addEmployeeApi(reqBody:any){
    return this.http.post(`${this.serverUrl}/employee`,reqBody)
   }

   //api to get all employee details
   getAllEmployeeApi(){
    return this.http.get(`${this.serverUrl}/employee`)
   }

   //api to delete employee
   deleteEmployeeApi(id:string){
    return this.http.delete(`${this.serverUrl}/employee/${id}`)
   }

   //get a particular employee
   getAEmployeeApi(id:any){
    return this.http.get(`${this.serverUrl}/employee/${id}`)
   }

   //api to update employee details
   updateEmpDetailsApi(id:any,body:any){
    return this.http.put(`${this.serverUrl}/employee/${id}`,body)
   }

   //api to update admin details
   updateAdminDetailsApi(body:any){
    return this.http.put(`${this.serverUrl}/employee/1`,body)
   }

}
