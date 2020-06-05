import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmbedService } from 'src/app/embed.service'
import { BehaviorSubject, fromEvent, Subscription } from 'rxjs'
import { MatSnackBar } from '@angular/material/snack-bar'
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-widget-library',
  templateUrl: './widget-library.component.html',
  styleUrls: ['./widget-library.component.css']
})
export class WidgetLibraryComponent implements OnInit, OnDestroy {
  sub: Subscription
  embedList: any[] = []
  searchParams = new BehaviorSubject<any>({ storyline: '', tags: '', location: '' });
  searchOptions = {
    storylines: [
      { label: 'COVID-19', value: 'COVID' },
      { label: 'Election 2020', value: 'Election 2020' },
      { label: 'Environment', value: 'Environment' }
    ],
    locations: [
      { label: 'Alabama', value: 'AL' },
      { label: 'Alaska', value: 'AK' },
      { label: 'Arizona', value: 'AZ' },
      { label: 'Arkansas', value: 'AR' },
      { label: 'California', value: 'CA' },
      { label: 'Colorado', value: 'CO' },
      { label: 'Connecticut', value: 'CT' },
      { label: 'Delaware', value: 'DE' },
      { label: 'Florida', value: 'FL' },
      { label: 'Georgia', value: 'GA' },
      { label: 'Hawaii', value: 'HI' },
      { label: 'Idaho', value: 'ID' },
      { label: 'Illinois', value: 'IL' },
      { label: 'Indiana', value: 'IN' },
      { label: 'Iowa', value: 'IA' },
      { label: 'Kansas', value: 'KS' },
      { label: 'Kentucky', value: 'KY' },
      { label: 'Louisiana', value: 'LA' },
      { label: 'Maine', value: 'ME' },
      { label: 'Maryland', value: 'MD' },
      { label: 'Massachusetts', value: 'MA' },
      { label: 'Michigan', value: 'MI' },
      { label: 'Minnesota', value: 'MN' },
      { label: 'Mississippi', value: 'MS' },
      { label: 'Missouri', value: 'MO' },
      { label: 'Montana', value: 'MT' },
      { label: 'Nebraska', value: 'NE' },
      { label: 'Nevada', value: 'NV' },
      { label: 'New Hampshire', value: 'NH' },
      { label: 'New Jersey', value: 'NJ' },
      { label: 'New Mexico', value: 'NM' },
      { label: 'New York', value: 'NY' },
      { label: 'North Carolina', value: 'NC' },
      { label: 'North Dakota', value: 'ND' },
      { label: 'Ohio', value: 'OH' },
      { label: 'Oklahoma', value: 'OK' },
      { label: 'Oregon', value: 'OR' },
      { label: 'Pennsylvania', value: 'PA' },
      { label: 'Rhode Island', value: 'RI' },
      { label: 'South Carolina', value: 'SC' },
      { label: 'South Dakota', value: 'SD' },
      { label: 'Tennessee', value: 'TN' },
      { label: 'Texas', value: 'TX' },
      { label: 'Utah', value: 'UT' },
      { label: 'Vermont', value: 'VT' },
      { label: 'Virginia', value: 'VA' },
      { label: 'Washington', value: 'WA' },
      { label: 'West Virginia', value: 'WV' },
      { label: 'Wisconsin', value: 'WI' },
      { label: 'Wyoming', value: 'WY' }
    ]
  }
  limit = 2

  constructor(
    private embedService: EmbedService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.sub = this.searchParams
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((term: string) => this.embedService.getEmbeds(term)),
      )
      .subscribe((list) => {
        this.embedList = list
        this.limit = 2
      })

    fromEvent(window, 'scroll')
      .pipe(debounceTime(500))
      .subscribe(() => {
        if (window.scrollY + document.documentElement.offsetHeight >= document.documentElement.scrollHeight) {
          this.limit += 2
        }
      })
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe()
    }
  }

  // We open snackbar when user has been logged out
  embedCopied(title: string) {
    this.snackBar.open('Embed code copied to clipboard, contact us for revenue share opportunities.', undefined, {
      duration: 2000,
    })

    const params = {
      to: 'partnerships@reconntinglabs.com',
      subject: 'Revenue share account request',
      body: `We are interested in getting a partner account to generate revenue on embed visualization "${title}"`
    }
    //window.location.href = 'mailto:?'+qs.stringify(params)
  }

  searchByStoryline(value) {
    this.updateSearch('storyline', value)
  }

  searchByTags(value) {
    this.updateSearch('tags', value)
  }

  searchByLocation(value) {
    this.updateSearch('location', value)
  }

  private updateSearch(key, value) {
    const searchParams = this.searchParams.value
    if (searchParams[key] === value) return
    this.searchParams.next({ ...searchParams, [key]: value })
  }
}
