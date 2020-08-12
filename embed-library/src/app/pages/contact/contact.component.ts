import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AnalyticsService } from 'src/app/analytics.service';

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
    private metaService: Meta
  ) { }

  ngOnInit() {
    const title = 'Contact';
    const description = 'Dynamic Hello Angular Lovers description!';
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
    this.analytics.analyticsEventEmitter('contact_form_submit', undefined, undefined, undefined, this.contactForm.value);
    console.log('submit', this.contactForm.value);
  }
}
