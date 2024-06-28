import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ApiService } from '../service/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selected : Date | null = new Date()
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions = {}

  status:boolean= true
  editStatus:boolean = true
  totalEmployee:number = 0
  adminDetails:any = {}

  profileImage:string = "https://cdn-icons-png.flaticon.com/512/4974/4974985.png"

  constructor(private api:ApiService){
    this.chartOptions={
      
        chart: {
            type: 'pie'
        },
        title: {
            text: 'Project Completion'
        },
        tooltip: {
            valueSuffix: '%'
        },
        plotOptions: {
            series: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: [{
                    enabled: true,
                    distance: 20
                }, {
                    enabled: true,
                    distance: -40,
                    format: '{point.percentage:.1f}%',
                    style: {
                        fontSize: '1.2em',
                        textOutline: 'none',
                        opacity: 0.7
                    },
                    filter: {
                        operator: '>',
                        property: 'percentage',
                        value: 10
                    }
                }]
            }
        },
        credits:{
          enabled:false
        },
        series: [
            {
                name: 'Percentage',
                colorByPoint: true,
                data: [
                    {
                        name: 'Project Fair',
                        y: 55.02
                    },
                    {
                        name: 'Media Player',
                        sliced: true,
                        selected: true,
                        y: 26.71
                    },
                    {
                        name: 'Redux E-Cart',
                        y: 1.09
                    },
                    {
                        name: 'Redux-Counter Application',
                        y: 15.5
                    },
                    {
                        name: 'BMI Calculator',
                        y: 1.68
                    }
                ]
            }
        ]
    
    
    }
  }

  ngOnInit(): void {
      this.getTotalEmployee()
      this.api.loginApi().subscribe({
        next:(res:any)=>{console.log(res);
            this.adminDetails = res
            if(res.picture){
                this.profileImage=res.picture
            }
        },
        error:(err:any)=>{console.log(err);
        }
      })
  }

  getEditStatus(){
    this.editStatus = false
  }

  getTotalEmployee(){
    this.api.getAllEmployeeApi().subscribe({
        next:(res:any)=>{
            console.log(res);
            this.totalEmployee = res.length-1
            
        },
        error:(err:any)=>{
            console.log(err);
            
        }
    })
  }


  getFile(event:any){
    console.log(event.target.files[0]);
    
    //create an object for fileReader class
    const file = new FileReader()
    //convert file into url
    file.readAsDataURL(event.target.files[0])
    //to get the url
    file.onload = (event:any)=>{
        this.profileImage = event.target.result
        //to add a new key value pair as : picture = this.profileImage
        this.adminDetails.picture = this.profileImage
    }
  }

  reset(){
    this.api.loginApi().subscribe({
        next:(res:any)=>{console.log(res);
            this.adminDetails = res
            this.editStatus = true
            if(res.picture){
                this.profileImage=res.picture
            }
            else{
                this.profileImage="https://cdn-icons-png.flaticon.com/512/4974/4974985.png"
            }
        },
        error:(err:any)=>{console.log(err);
        }
    })
  }

  updateAdmin(){
    this.api.updateAdminDetailsApi(this.adminDetails).subscribe({
        next:(res:any)=>{
            console.log(res);
            this.adminDetails=res
            this.profileImage=res.picture
            Swal.fire({
                title:'Wow',
                text:"Profile updated successfully",
                icon:'success'
            })
            this.editStatus = true
        },
        error:(err:any)=>{
            console.log(err);
            
        }
    })
  }

  changeStatus(){
    this.status = !this.status
  }


}
