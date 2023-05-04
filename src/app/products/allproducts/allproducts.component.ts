import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-allproducts',
  templateUrl: './allproducts.component.html',
  styleUrls: ['./allproducts.component.css']
})
export class AllproductsComponent {

  allproducts:any=[]
  searchterm:string=''
  constructor (private api:ApiService){}

  ngOnInit():void{


    this.api.getallproducts()
    .subscribe((result:any)=>{
      console.log(result);
      this.allproducts=result
    })
    // to get search term from apiservice
    this.api.searchterm.subscribe((result:any)=>{
      this.searchterm=result
      console.log(this.searchterm);
    })
    
    
  }

  addtocart(product:any){

    Object.assign(product,{quantity:1})
    console.log(product);
    
      this.api.addtocart(product)
      .subscribe((result:any)=>{
        // call cart count
        this.api.cartcount()
        alert(result)
      },
      (result:any)=>{
        alert(result.error)
      }
      )
    }

  
}
