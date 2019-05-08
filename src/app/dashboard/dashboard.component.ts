import { Component, OnInit, ElementRef, Input, ViewChild, Output, EventEmitter, ViewChildren, AfterViewInit, OnDestroy} from '@angular/core';
import { EventService } from '../event.service';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy{

  @ViewChildren('dynamiCom') dynamiCom;  
  id: number = 1;
  private sub: any;
    
  map = {
    lat: 50.411334203925286,
    lng: 22.34084897882076,
  };    
    
  constructor(private CmsService: ApiService, private event: EventService, private route: ActivatedRoute, private _route: Router) { }
    
  ngOnInit() {
      this.sub = this.route.params.subscribe(params => {
        this.id = +params['id'];
            if (isNaN(this.id)) this.id = 1;
            if(this.dynamiCom != null){
                this.ngAfterViewInit();
            }
      });
      
      this.CmsService.get(`mbopn/getOfers.php`).subscribe(
        response=>{
            console.log('respone', response['length'])
        }
      )
  }
    
  ngAfterViewInit(){
      this.dynamiCom.forEach(el=>{
          el.pobierzKontrolki(this.id);
      })
  }
    
 ngOnDestroy(){
     this.sub.unsubscribe();
 }    
    
    test(){
        this.event.wyswietlInfo('success', 'test error');
    }   
    
}
