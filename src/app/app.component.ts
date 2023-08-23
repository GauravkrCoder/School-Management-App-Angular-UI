import { Component, OnInit } from '@angular/core';
import { FilterService } from 'primeng/api';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'supersurvey'; 

  constructor(    
  ) { }

  ngOnInit() {  
  }
 
}
