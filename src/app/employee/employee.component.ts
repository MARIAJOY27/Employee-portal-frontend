import { Component, OnInit } from '@angular/core';
import { EmpModel } from '../employee.model';
import { ApiService } from '../service/api.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  allEmployee:EmpModel[] = []
  AdminLogin:any = new Date()
  searchKey:string=""
  p: number = 1;

  constructor(private api:ApiService){}

  ngOnInit(): void {
    this.getAllEmployee()
  }

  getAllEmployee(){
     this.api.getAllEmployeeApi().subscribe({
      next:(res:any)=>{
        //console.log(res);
        this.allEmployee = res
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
     })
  }

  sortId(){
    this.allEmployee.sort((a:any,b:any)=>a.id-b.id)
  }

  sortName(){
    //localeCompare()- it returns 1(after),-1(before) and 0(string equal)
    this.allEmployee.sort((a:any,b:any)=>a.name.localeCompare(b.name))
  }

  removeEmployee(id:string){
    this.api.deleteEmployeeApi(id).subscribe({
      next:(res:any)=>{console.log(res);
        this.getAllEmployee()
      },
      error:(err:any)=>{console.log(err);
      }
    })
    
  }

  generatePdf(){
    //1) create object
    const pdf = new jsPDF()

    const head = [['UserID','Username','Email','Status']]
    const body:any=[]

    this.allEmployee.forEach((item)=>{
      if(item.id!='1'){
        if(item.status=='1'){
          body.push([item.id, item.name, item.email, 'Active'])
        }
        else{
          body.push([item.id, item.name, item.email, 'Inactive'])
        }
      }
    })
    pdf.setFontSize(16) //fontsize
    pdf.text('Employee List',10,10) //heading

     //2) call autotable
    autoTable(pdf,{head,body})

    pdf.output('dataurlnewwindow') //pdf opening in new window
    
    //3)save the document
    pdf.save('employee_table.pdf')

  }
   

   
}
