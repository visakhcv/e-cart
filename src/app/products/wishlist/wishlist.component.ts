import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {

  allproducts:any=[]

  constructor (private api:ApiService){}

  ngOnInit() : void{
    this.api.getwishlist()
    .subscribe((result:any)=>{
      console.log(result);
      this.allproducts=result
    },(result:any)=>{
      console.log(result.error);
      
    })
  }

  removeitem(id:any){
    this.api.removewishlist(id)
    .subscribe((result:any)=>{
      this.allproducts=result
    },(result:any)=>{
      console.log(result.error);
      
    })
  }

  addtocart(product:any){

    Object.assign(product,{quantity:1})
    console.log(product);
    
      this.api.addtocart(product)
      .subscribe((result:any)=>{
        // call cart count
        this.api.cartcount()
        this.removeitem(product.id)
        alert(result)
      },
      (result:any)=>{
        alert(result.error)
      }
      )
    }

}
