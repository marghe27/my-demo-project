import { Component,EventEmitter,Input,OnChanges,OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../../home/home.component';
import { catchError, finalize, tap } from 'rxjs/operators';
import { Subject, throwError} from 'rxjs';

@Component({
  selector: 'app-enroll',
  standalone: true,
  imports: [CommonModule, ],
  templateUrl: './enroll.component.html',
  styleUrls: ['./enroll.component.scss']
})
export class EnrollComponent implements OnInit, OnChanges {

  /** Passaggio dati dal componente 'Parent' al 'Child' 
  * @param data  
  * */
  @Input() data:any;

  /** Passaggio dati dal componente 'Child' al 'Parent'
   * "I dati escono dal Child"
  * @param  
  * */
  @Output() sendDATA = new EventEmitter<string>()


  nome:string = 'Luigi';
   
constructor(){}


  ngOnInit(): void {
    /* nella console vedo i dati originari ma non i loro cambiamenti. Devo creare, per questo motivo, il "ngOnChange" */
    console.log('Sono il component enroll e vedo i dati di home', this.data);

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Questi sono i cambiamenti dei dati di home: ', changes);
  }

  
  sendDataToParent(){
    this.sendDATA.emit(this.nome);
  }
  

// lesson CatchError and Finalize


   /* const subject = new Subject<number>();

    subject
     .pipe(
       tap((value)=> {
        if (value > 2){
          throw new Error('Error emitted by throw'); 
        }
       }),
       catchError(error => {
        console.error('catchError', error);
        //return a replacement Observable created using throwError
        return throwError(() => new Error('test', error)) 
       }),
       finalize(() => {
        console.log('finalize');
      })
      )
      .subscribe({
        error: (e) => console.error('observer', e),
        next: (value) => console.log('next', value),
        complete: ()=> console.log('complete')

      });


      subject.next(1);
      subject.next(2);
      subject.next(3);
*/
 


}
function sendDataToParent() {
  throw new Error('Function not implemented.');
}

