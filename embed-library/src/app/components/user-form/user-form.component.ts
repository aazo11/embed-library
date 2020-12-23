import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @Output() submit = new EventEmitter<any>();

  matcher = new MyErrorStateMatcher();

  nameFormControl = new FormControl('', [Validators.required]);
  companyFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  ngOnInit() { }

  handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    if (this.nameFormControl.invalid || this.companyFormControl.invalid || this.emailFormControl.invalid) return;

    this.submit.emit({
      name: this.nameFormControl.value,
      company: this.companyFormControl.value,
      email: this.emailFormControl.value
    });
  }
}
