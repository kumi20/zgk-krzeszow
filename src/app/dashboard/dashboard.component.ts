import { Component, OnInit, ElementRef, Input, ViewChild, Output, EventEmitter, ViewChildren, AfterViewInit, OnDestroy} from '@angular/core';
import { EventService } from '../event.service';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IMyDpOptions } from 'mydatepicker'; // do ustawiania opcji data pickera
import { FormGroup, FormControl, Validators} from '@angular/forms';

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
    
    
  public myDatePickerOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
    monthLabels: {
        1:'Sty',
        2:'Lut',
        3:'Mar',
        4:'Kwi',
        5:'Maj',
        6:'Cze',
        7:'Lip',
        8:'Sie',
        9:'Wrz',
        10:'Paź',
        11:'Lis',
        12:'Gru'
    },
      monthLabelsFull:{
          1:'Styczeń',
          2:'Luty',
          3:'Marzec',
          4:'Kwiecień',
          5:'Maj',
          6:'Czerwiec',
          7:'Lipiec',
          8:'Sierpień',
          9:'Wrzesień',
          10:'Październik',
          11:'Listopad',
          12:'Grudzień'
      },
    todayBtnTxt: 'Dzisiaj',
    clearBtnTxt: 'Wyczyść',  
    closeBtnTxt: 'Zamknij',  
    dayLabels:{
        su: 'niedz.',
        mo: 'pon.',
        tu: 'wt.',
        we: 'śr.',
        th: 'czw.',
        fr: 'pt.',
        sa: 'sob.', 
    },
};
    
  formState;    
    
  constructor(private CmsService: ApiService, private event: EventService, private route: ActivatedRoute, private _route: Router) { }
    
  ngOnInit() {
      this.sub = this.route.params.subscribe(params => {
        this.id = +params['id'];
            if (isNaN(this.id)) this.id = 1;
            if(this.dynamiCom != null){
                this.ngAfterViewInit();
            }
      });
      
      this.formState = new FormGroup({
          name: new FormControl("", Validators.required),
          city: new FormControl("", Validators.required),
          street: new FormControl("", Validators.required),
          number: new FormControl("", Validators.required),
          phone: new FormControl(""),
          date: new FormControl("", Validators.required),
          state: new FormControl("", Validators.required),
          information: new FormControl("")
      })
  }
    
  ngAfterViewInit(){
      this.dynamiCom.forEach(el=>{
          el.pobierzKontrolki(this.id);
      })
  }
    
 ngOnDestroy(){
     this.sub.unsubscribe();
 }    
    
    send(){
        if (!this.formState.valid){
            this.formState.get('name').touched = true;
            this.formState.get('city').touched = true;
            this.formState.get('street').touched = true;
            this.formState.get('number').touched = true;
            this.formState.get('date').touched = true;
            this.formState.get('state').touched = true;
            this.event.wyswietlInfo('error', "Wypełnij wszystkie wymagane pola");
        }
        else{
            console.log("wyślij", this.formState.value);
            this.formState.reset();
            this.event.wyswietlInfo('success', "Wiadomość została wysłana");
        }
        
    } 
    
}
