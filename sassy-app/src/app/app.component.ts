import { Component, OnInit } from '@angular/core';
import { APIService } from './api_service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'sassy-app';
  url ='https://jsonplaceholder.typicode.com/photos?albumId=1'

  public data:any = []


  constructor(private yayApi: APIService) {}

  public ngOnInit(): void {
    console.log('Initiating fetch')
    this.getData()
  }

  public getData(delay=0) {
    this.data = []
    setTimeout(() => {
      this.yayApi.getData().subscribe(
        (res) => {
          console.log('Retrieved Data', res)
          this.data = [res]
        },
        (err) => {
          const { status, statusText, url, ok, name, message, error} = err
          const errPackage = {status, statusText, url, ok, name, message, error}
          this.data = [errPackage]
        }
      )
    }, delay)
  }


 
}
