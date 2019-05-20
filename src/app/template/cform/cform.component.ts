import { Component, OnInit, ElementRef, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../api.service';
import { EventService } from '../../event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-cform',
  templateUrl: './cform.component.html',
  styleUrls: ['./cform.component.scss'],
  inputs: ['idtresci','pageElement']
})
export class CformTemplateComponent implements OnInit {

  idtresci;
  pageElement;
  cform;    
    
  constructor(private CmsService: ApiService, private route: ActivatedRoute, private _route: Router, private event: EventService) { }

  ngOnInit() {
      this.cform = new FormGroup({
            name: new FormControl(""),
            email: new FormControl("", Validators.required),
            subject: new FormControl(""),
            message: new FormControl("", Validators.required)
      })
  }
    
    send(event){
        if (!this.cform.valid) this.event.wyswietlInfo('info','Proszę uzupełnić wszystkie pola');
        else{
            this.event.klepsydraStart();
            this.CmsService.post(`template/cform/sendMail.php?id=${this.idtresci}`, event).subscribe(
                response=>{
                    this.event.wyswietlInfo('success', 'Wiadomość została wysłana');
                    this.cform.reset();
                    this.event.klepsydraStop();
                },
                error =>{
                    this.event.klepsydraStop();
                    this.event.wyswietlInfo('error','Błąd wysyłania wiadomości');
                }
            )
        }
    }    

}
