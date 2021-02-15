import { isPlatformBrowser } from "@angular/common";
import { Component, OnInit, Inject, PLATFORM_ID } from "@angular/core";
import { Title, Meta } from "@angular/platform-browser";
import { AnalyticsService } from "src/app/analytics.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-clickthrough-agreement",
  templateUrl: "./clickthrough-agreement.component.html",
  styleUrls: ["./clickthrough-agreement.component.scss"],
})
export class ClickthroughAgreementComponent implements OnInit {
  step = 2;
  userForm: FormGroup;
  formSubmitted = false;

  constructor(
    private analytics: AnalyticsService,
    private titleService: Title,
    private metaService: Meta,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
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
    this.formSubmitted = false;
  }

  submit() {
    this.formSubmitted = true;
    if (this.userForm.invalid) {
      return;
    }

    this.step = 2;
    // handle form
    console.log(this.userForm.value);
  }
}
