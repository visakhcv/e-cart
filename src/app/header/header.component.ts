import { Component } from '@angular/core';
import { ApiService } from '../products/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  cartitems:Number=0
  constructor(private api:ApiService){}

  ngOnInit(): void {
    this.api.cartitemcount
    .subscribe((result:any)=>{
      console.log(result);
      this.cartitems=result
    })
  }

  search(event:any){
    this.api.searchterm.next(event.target.value)
  }
}
