import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  Validators,
  NgForm,
  FormsModule,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from '../model/message';
import { MOCK_MESSAGES } from '../model/mock-messages';
import { map } from 'rxjs';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
 


 /** 
  * Validation Form 
  * Password with two uppercase letters, one special case letter, two digits, three lowercase letters,
  * length 8. The sequence must be respected (//AA#99aaa) 
 */

  loginForm = new FormGroup({
    email: new FormControl(
      '', //name@example.it
      [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]
    ),
    password: new FormControl(
      '', //AA#99aaa
      [
        Validators.required,
        Validators.pattern(
          '^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$'
        ),
      ]
    ),
  });

  messages: Message[];
  message?: Message;

  constructor(private router: Router,  private readonly route: ActivatedRoute) {
    this.messages = MOCK_MESSAGES;
  }

  ngOnInit() {
    console.log(this.loginForm.value.email); 
    console.log(this.loginForm.value.password); 
    
}

/** @param e
 * target e value sono chiavi dell'oggetto 'e:Event' che si riferisce a '$event' nel DOM
 */
onInput(e: Event){
    console.log((<HTMLInputElement>e.target).value);  
}

/* localStorage.user = JSON.stringify({name: "John"});

// successivamente
let user = JSON.parse( localStorage.user );
alert( user.name ); // John */

  login() {
    if (this.loginForm.invalid) {
      alert('Invalid login!');
    } else {
      console.log(this.loginForm.status); // OUTPUT is valid || invalid

      let user =  JSON.stringify(this.loginForm.value.email);
      localStorage.setItem('UserEmail', user);
      console.log('user ', user);

      localStorage.setItem('token', Math.random().toString());
      this.router.navigate(['home']);
    }
  }
}
