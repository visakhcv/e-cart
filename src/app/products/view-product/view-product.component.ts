import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent {
  productid:string=''
  products:any
  constructor (private viewactivatedroute:ActivatedRoute,private api :ApiService) {}

  ngOnInit() : void{
    this.viewactivatedroute.params
    .subscribe((data:any)=>{
      console.log(data);
      this.productid=data.id
    })
    // call view product
    this.api.viewproduct(this.productid)
    .subscribe((result:any)=>{
      console.log(result);
      this.products=result
    },(result:any)=>{
      alert(result.error);
    })
  }

  addwishlist(){
    const {id,title,price,image} =this.products
    this.api.addtowishlist(id,title,price,image)
    .subscribe((result:any)=>{
      alert(result)
    },(result:any)=>{
      alert(result.error)
    }
    )
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
