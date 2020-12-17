import { isPlatformBrowser } from '@angular/common';
import { Inject } from '@angular/core';
import { Injectable, PLATFORM_ID } from '@angular/core';
import * as Bowser from 'bowser';
declare let gtag: (...args) => void;
declare var amplitude: any;

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  platform: Bowser.Parser.ParsedResult;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if(isPlatformBrowser(this.platformId)) {
      this.platform = Bowser.parse(window.navigator.userAgent);
    }
  }

  private getQueryProperties() {
    const obj = {};
    if(isPlatformBrowser(this.platformId)) {
      new URLSearchParams(window.location.search).forEach((v, k) => {
        obj['Query ' + k] = v;
      });
    }
    return obj;
  }

  public trackLink(name?: string, label?: string, value?: number, props?: object) {
    this.analyticsEventEmitter('link_click', name, label, value, props);
  }

  public trackPageview(page_path) {
    if(isPlatformBrowser(this.platformId)) {
      gtag('config', 'UA-167844505-2', { page_path, transport_type: 'beacon' });
      gtag('send', 'pageview');
    }
  }

  public analyticsEventEmitter(
    eventName: string,
    eventCategory?: string,
    eventLabel?: string,
    eventValue?: number,
    extraProperties: any = {}
  ) {
    if(isPlatformBrowser(this.platformId)) {
      gtag('event', eventName, {
        event_category: eventCategory,
        event_label: eventLabel,
        value: eventValue
      });


      amplitude.getInstance().logEvent(eventName, Object.assign({
        page: isPlatformBrowser(this.platformId)?window.location.pathname: '',
        ...this.getQueryProperties(),
        category: eventCategory,
        label: eventLabel,
        value: eventValue,

        userAgent: isPlatformBrowser(this.platformId)?window.navigator.userAgent: '',
        browser: this.platform.browser.name,
        browserVersion: this.platform.browser.version,
        os: this.platform.os.name,
        osVersion: this.platform.os.version,
        osVersionName: this.platform.os.versionName,
        engine: this.platform.engine.name,
        engineVersion: this.platform.engine.version,
        deviceType: this.platform.platform.type,
        deviceModel: this.platform.platform.model,
        deviceVendor: this.platform.platform.vendor
      }, extraProperties));
    }
  }
}
