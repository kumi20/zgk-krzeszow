import { Component, OnInit, ElementRef, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../api.service';
import { EventService } from '../../event.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-static',
  templateUrl: './static.component.html',
  styleUrls: ['./static.component.scss'],
  inputs: ['idtresci','pageElement']
})
export class StaticComponent implements OnInit {
  
  tresc;
  idtresci;
  pageElement;
  idModal;

  constructor(private CmsService: ApiService, private route: ActivatedRoute, private _route: Router, private event: EventService) { }
  
  ngOnInit() {
    this.idModal = new Date().getTime() + Math.round(Math.random() * 10000000);
    this.event.klepsydraStart();
    const json = JSON.stringify({
      'id':this.idtresci
    })
     this.CmsService.post('template/static/getStatic.php', json).subscribe(
         response => {
             if (response !=null){
                 
                 this.tresc = response[0].static_content;
                 if(document.getElementById(this.idModal) != null) document.getElementById(this.idModal).innerHTML = this.tresc; 
             }
           
            this.event.klepsydraStop();
        },
        error => this.event.klepsydraStop()
     )
  }

}
