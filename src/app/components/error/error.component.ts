import { Component, OnDestroy, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit,OnDestroy {

  error:any;
  constructor(private utilityService:UtilityService) {
    this.utilityService.getErrorSubject().subscribe(data=>{
      this.error=data;
    })
   }
  ngOnDestroy(): void {
    this.utilityService.getErrorSubject().unsubscribe();
  }

  ngOnInit(): void {
  }

}
