import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // to hold search term
  searchterm= new BehaviorSubject('')
  // to hold cart count
  cartitemcount = new BehaviorSubject(0)

  base_url='https://e-cart-server-bkf6.onrender.com'
  constructor(private http:HttpClient) { 
    this.cartcount()
  }

  // get all products
  getallproducts(){
    return this.http.get(`${this.base_url}/products/allproducts`)
  }

  viewproduct(id:any){
    return this.http.get(`${this.base_url}/products/view-product/${id}`)
  }

  addtowishlist(id:any,title:any,price:any,image:any){
    const body={
      id,title,price,image
    }
    return this.http.post(`${this.base_url}/wishlist/add-product`,body)
  }

  getwishlist(){
    return this.http.get(`${this.base_url}/wishlist/get-items`)
  }

  removewishlist(id:any){
    return this.http.delete(`${this.base_url}/wishlist/remove-wishlist-item/${id}`)
  }

  addtocart(product:any){
    const body={
      id:product.id,
      title:product.title,
      image:product.image,
      price:product.price,
      quantity:product.quantity
    }
  return this.http.post(`${this.base_url}/cart/addtocart`,body)  
  }

  getcart(){
    return this.http.get(`${this.base_url}/cart/cartitems`)
  }

  // cartcount
  cartcount(){
    this.getcart().subscribe((result:any)=>{
      this.cartitemcount.next(result.length)
    })
  }

  removecart(id:any){
    return this.http.delete(`${this.base_url}/cart/deletecartitem/${id}`)
  }

  emptycart(){
    return this.http.delete(`${this.base_url}/cart/emptycart`)
  }

  incartitem(id:any){
    return this.http.get(`${this.base_url}/cart/incrementitem/${id}`)
  }

  decartitem(id:any){
    return this.http.get(`${this.base_url}/cart/decrementitem/${id}`)
  }
}
