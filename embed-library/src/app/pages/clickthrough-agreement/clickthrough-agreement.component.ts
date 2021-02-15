import { isPlatformBrowser } from "@angular/common";
import { Component, OnInit, Inject, PLATFORM_ID } from "@angular/core";
import { Title, Meta } from "@angular/platform-browser";
import { AnalyticsService } from "src/app/analytics.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: "app-clickthrough-agreement",
  templateUrl: "./clickthrough-agreement.component.html",
  styleUrls: ["./clickthrough-agreement.component.scss"],
})
export class ClickthroughAgreementComponent implements OnInit {
  step: Number =1;
  userForm: FormGroup;
  formSubmitted = false;

  constructor(
    private analytics: AnalyticsService,
    private titleService: Title,
    private metaService: Meta,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {


  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const step = params['step'];
      this.step = Number(step)
    });
    console.log(this.step)
    this.userForm = new FormGroup({
      firstName: new FormControl("", [Validators.required]),
      lastName: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      company: new FormControl("", [Validators.required]),
      acceptTerms: new FormControl(false, [Validators.requiredTrue]),
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);
  };

  updateStep(value) {
    this.step = value;
    
    const queryParams = { step: value.toString() };

  this.router.navigate(
    [], 
    {
      relativeTo: this.route,
      queryParams: queryParams, 
     
      replaceUrl: true 
    });
    this.formSubmitted = false;
  }

  submit() {
    this.formSubmitted = true;
    if (this.userForm.invalid) {
      return;
    }
    // handle form
    console.log(this.userForm.value);
    this.updateStep(2)
  }
}
