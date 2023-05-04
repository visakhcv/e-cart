import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder } from '@angular/forms';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  public payPalConfig?: IPayPalConfig;

  allitems:any=[]
  carttotal:number=0
  proceedtopaymentstatus:boolean= false
  username:string=''
  flat:string=''
  street:string=''
  state:string=''
  offerclickedstatus:boolean=false
  discountclickstatus:boolean=false
  showSuccess:boolean=false
  showcancel:boolean=false
  showerror:boolean=false
  showpaypal:boolean=false

  addressform=this.fb.group({
    username:[''],
    flat:[''],
    street:[''],
    state:['']
  })
 constructor(private api:ApiService,private fb:FormBuilder) {} 
 
 ngOnInit(): void {
  this.api.getcart()
  .subscribe((result:any)=>{
    console.log(result);
    this.allitems=result
    this.getcarttotal()
    // paypal
  this.initConfig()
  },
  (result:any)=>{
    console.log(result.error);
    
  })

  
 }

 getcarttotal(){
  let total=0
  this.allitems.forEach((item:any) => {
   total += item.total
    this.carttotal = Math.ceil(total)
  });
 }

 removecart(id:any){
  this.api.removecart(id)
  .subscribe((result:any)=>{
    this.allitems=result
    this.getcarttotal()
    this.api.cartcount()
  },(result:any)=>{
    alert(result.error)
  }
  
  )
 }

 emptycart(){
  this.api.emptycart()
  .subscribe((result:any)=>{
    this.allitems=[]
    this.getcarttotal()
    this.api.cartcount()
  },(result:any)=>{
    alert(result.error)
  })
 }

 icrement(id:any){
  this.api.incartitem(id)
  .subscribe((result:any)=>{
    this.allitems= result
    this.getcarttotal()
  },(result:any)=>{
    alert(result.error)
  })
 }

 dcrement(id:any){
  this.api.decartitem(id)
  .subscribe((result:any)=>{
    this.allitems= result
    this.getcarttotal()
    
  },(result:any)=>{
    alert(result.error)
  })
 }

 submitbtnclicked(){
  if(this.addressform.valid){
    this.proceedtopaymentstatus=true
    this.username=this.addressform.value.username||''
    this.flat=this.addressform.value.flat||''
    this.street=this.addressform.value.street||''
    this.state=this.addressform.value.state||''
  }
  else{
    alert('please enter valid inputs')
  }
 }

 offerclicked(){
  this.offerclickedstatus=true
 }

 discount50(){
  let discount= Math.ceil(this.carttotal*50/100)
  this.carttotal= this.carttotal - discount
  this.discountclickstatus= true
 }

 discount10(){
  let discount= Math.ceil(this.carttotal*10/100)
  this.carttotal= this.carttotal - discount
  this.discountclickstatus= true
 }

//  paypal code
 private initConfig(): void {
  let amount= this.carttotal.toString()
  this.payPalConfig = {
  currency: 'USD',
  clientId: 'sb',
  createOrderOnClient: (data:any) => <ICreateOrderRequest>{
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'USD',
          value: amount,
          breakdown: {
            item_total: {
              currency_code: 'USD',
              value: amount
            }
          }
        },
        items: [
          {
            name: 'Enterprise Subscription',
            quantity: '1',
            category: 'DIGITAL_GOODS',
            unit_amount: {
              currency_code: 'USD',
              value: amount,
            },
          }
        ]
      }
    ]
  },
  advanced: {
    commit: 'true'
  },
  style: {
    label: 'paypal',
    layout: 'vertical'
  },
  onApprove: (data, actions) => {
    console.log('onApprove - transaction was approved, but not authorized', data, actions);
    actions.order.get().then((details:any) => {
      console.log('onApprove - you can get full order details inside onApprove: ', details);
    });
  },
  onClientAuthorization: (data) => {
    console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
    this.showSuccess = true;
    this.emptycart()
    // hide paypal view
    this.showpaypal=false
    // hide make payment button
    this.proceedtopaymentstatus=false
    
  },
  onCancel: (data, actions) => {
    console.log('OnCancel', data, actions);
    this.showcancel=true
     // hide paypal view
     this.showpaypal=false
  },
  onError: err => {
    console.log('OnError', err);
    this.showerror=true
     // hide paypal view
     this.showpaypal=false
  },
  onClick: (data, actions) => {
    console.log('onClick', data, actions);
  },
};
}

makepayment(){
  this.showpaypal=true
}

modelclose(){
  this.addressform.reset()
  this.showcancel=false
  this.showerror=false
  this.showSuccess=false
  this.showpaypal=false
  this.proceedtopaymentstatus=false
}
 
}

