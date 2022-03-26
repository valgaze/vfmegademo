

import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class APIService {
    private opts = {
        url:'/api_block'
    }
  
   constructor(private http:HttpClient) { }

  getData(){
    return this.http.post(this.opts.url,{})
  }

}
