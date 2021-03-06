import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog'
import { AnalyticsService } from 'src/app/analytics.service';
import { ContactusService } from 'src/app/contactus.service';
import { ContactSuccessDialogComponent } from 'src/app/components/contact-success-dialog/contact-success-dialog.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit{
  contactForm: FormGroup;

  constructor(
    private analytics: AnalyticsService,
    private titleService: Title,
    private metaService: Meta,
    private dialog: MatDialog,
    private contactusService: ContactusService
  ) { }

  ngOnInit() {
    const title = 'Contact';
    const description = 'Have questions or need customization? We are here to help.';
    this.titleService.setTitle(`${title} - HiGeorge for Publishers Library`);
    this.metaService.updateTag({ name: 'description', content: description });

    this.contactForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      company: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      subject: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required])
    });
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.contactForm.controls[controlName].hasError(errorName);
  }

  submit() {
    if (!this.contactForm.valid) return;

    this.analytics.analyticsEventEmitter('contact_form_submit', undefined, undefined, undefined, this.contactForm.value);
    this.contactusService.sendContactUsNote(
      this.contactForm.get('email').value, 
      this.contactForm.get('name').value,
      this.contactForm.get('subject').value,
      this.contactForm.get('message').value
    ).subscribe(
      result => {
        console.log(result);
        this.openDialog();
      }
    );

    console.log('submit', this.contactForm.value);
  }

  openDialog() {
    this.dialog.open(ContactSuccessDialogComponent, {
      data: { },
      width: '600px'
    });
  }
}
