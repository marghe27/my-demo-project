import { AfterViewInit, Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { of, tap, from, Observable } from 'rxjs';
import { pipe } from 'rxjs';
import {  filter, map, switchMap, mergeMap, delay  } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Message } from '../model/message';
import { MOCK_MESSAGES } from '../model/mock-messages';
import { EnrollComponent } from '../enrollment/enroll/enroll.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, EnrollComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {

    /** Decoratore per prendere un CHILD che si trova dentro alla view dello stesso componente 
    * il  '!' mi garantisce che toWave! non sarà MAI null
    * 
   */
  // in questo esempio non è specificato il tipo
  //  @ViewChild ('inputToWave') toWave!: ElementRef

    /** Nel ViewChild Posso specificare il tipo  */
    @ViewChild ('inputToWave') toWave!: ElementRef<HTMLInputElement>

 /** passaggio dati da un componente 'parent' ad un altro 'child' 
  * @param data  
  * */
   @Input() /* data: any; */

 
	
messages: Message[];

  constructor(private router:Router){
    this.messages = MOCK_MESSAGES;
    console.log('I am in homepage');

  }


/**  dopo ngOnInit() c'è ngAfterViewInit
* Adesso vedo la view e posso prendere i dati 
* dei suoi child
 */
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit', this.toWave);
  }


//questo metodo riporta nella console il valore digitato dentro ad INPUT
  OnClickViewChild() {
    console.log('On click ', this.toWave.nativeElement.value);
  }

  /* @param 
*
* variabile 'data' per prendere, dal localStorage,  il valore della email inserita nel modulo LOGIN, 
*/
//data = localStorage.getItem('UserEmail');
 data : string | undefined

 ngOnInit(): void {
   /* console.log('mi trovo nella home', this.data); */
   //console.log('key in local storage ', this.data);
   this.data= this.getLocalstorage();
   console.log('key in local storage ', this.data );
 }
 
 
 /* Prendere il valore di local storage */
  getLocalstorage (): any {
   return localStorage.getItem('UserEmail');
 } 
 

/* Array di oggetti da trasmettere al Child  */
dataForLogging = [
  {email: "ginevra@example", password: "AA#99aaa"},
  {email: "piero@example", password: "BB#99aaa"},
  {email: "luigi@example", password: "CC#99aaa"},
  {email: "luisa@example", password: "DD#99aaa"}

]

/* 
Metodo per modificare i dati dell'array da visualizzare sull'OnChange
 */
onClick(){

  this.dataForLogging = [
    {email: "marghe@example", password: "EE#99aaa"},
    {email: "caterina@example", password: "FF#99aaa"},
    {email: "mimmo@example", password: "GG#99aaa"},
    {email: "luigi@example", password: "HH#99aaa"}
  
  ]
}

/* Metodo per ricevere i dati inviati dal Child al Parent */
receiveDATA(value: string){
  console.log(value);
}

// PAGINA DI LOGIN
logout(){
  const confirmation = confirm('Do you want to logout');
  if(confirmation){
    this.router.navigate(['login']);
    localStorage.clear();
    console.log('Token removed');
  }
  /* localStorage.removeItem('UserEmail');
    localStorage.removeItem('token'); */
}



}


 // ngOnInit() {
     
   // const myObs$ = of(1, 2, 3,4,5);

    /* // Create observer object
    const myObserver = {
      next: (x: number) => console.log('Observer got a next value: ' + x),
      error: (err: Error) => console.error('Observer got an error: ' + err),
      complete: () => console.log('Observer got a complete notification'),
    };

    // Execute with the observer object
    myObs$.subscribe(myObserver); */

    //////////////////

    // pipe function Observable

    /* const squareOddVals = pipe(
      filter((n:number) => n % 2 != 0),
      map(n => n*n)
    )
    // Create an Observable that will run the filter and map functions
    const squareOdd = squareOddVals(myObs$);
    // Subscribe to run the combined functions
    squareOdd.subscribe(x => console.log(x));

    //the pipe function can be written as follows
      const myNum$ = of(2,4,6,13,5,9)
      .pipe(
        filter(n => n % 2 != 0),
        map(n => n*n)
      )
      myNum$.subscribe(x => console.log(x));

  }
 */
// from method 
// this method is carried out before all other function
/* public array = [1,5,9,6];
public result = from(this.array)
  .subscribe(x => console.log(x));

  // tap method
  public source = of(1, 2, 3, 4, 5)
  .pipe(
    tap(n=> {
      if (n>4) {
        throw new TypeError(`Value ${ n } is greater than ${ n - 1 }`);
      }    
    })
  )
  .subscribe({
    next: console.log, error:err => console.log(err.message)
  });
 */
 // Logs
 // 1
 // 2
 // 3
 // 4
 // Value 5 is greater than 4

 //////
 /* Switchmap  annulla iscrizione all-osservabile meno recente */
 
 /*  public innerObservable= of('A','B','C','D');

  public srcObservable= of(1,2,3,4)
  .pipe(
      switchMap( val => {
        console.log("Value "+val);
        console.log("New observable");
        return this.innerObservable;
      })
  )
  .subscribe(valObserv => console.log("Inner observ "+valObserv));

//////
 /* altro es, Switch map  

public obs= of(1,2,4,8)
.pipe(
  switchMap(
    val => {return of(val*2)}
  )
)
.subscribe(
  ret=>console.log("Observable with SwitchMap "+ret)
); */

/*

//Ulteriore es SwitchedMap

const switched = of(1, 2, 3)
 .pipe(switchMap((x: number) => of(x, x ** 2, x ** 3)));
  switched.subscribe(x => console.log(x));
//Output
// 1  1  1
// 2
// 4
// 8
// 3
// 9
// 27

/////////
/* MergeMap method // mantiene piu sottoscrizioni interne attive contemporaneamente
 */

/* const saveLocation = (location:any) => {
  return of(location).pipe(delay(500));  
};

const click$ = fromEvent<MouseEvent>(document,'click')
.pipe(
  mergeMap(
    (e: MouseEvent) => {
      return saveLocation(
        {
          x: e.clientX,
          y: e.clientY,
          timestamp: Date.now()
        }
      )
    }
  )
)
.subscribe( ret => console.log( `Posizione salvata`, ret));   */
//////////////////////////////////

//}

