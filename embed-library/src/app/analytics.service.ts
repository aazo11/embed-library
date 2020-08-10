import { Injectable } from '@angular/core';
import * as Bowser from 'bowser';
declare let gtag: (...args) => void;
declare var amplitude: any;

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  platform: Bowser.Parser.ParsedResult;

  constructor() {
    this.platform = Bowser.parse(window.navigator.userAgent);
  }

  private getQueryProperties() {
    const obj = {};
    new URLSearchParams(window.location.search).forEach((v, k) => {
      obj['Query ' + k] = v;
    });
    return obj;
  }

  public trackLink(name?: string, label?: string, value?: number, props?: object) {
    this.analyticsEventEmitter('link_click', name, label, value, props);
  }

  public trackPageview(page_path) {
    gtag('config', 'UA-167844505-2', { page_path, transport_type: 'beacon' });
    gtag('send', 'pageview');
  }

  public analyticsEventEmitter(
    eventName: string,
    eventCategory?: string,
    eventLabel?: string,
    eventValue?: number,
    extraProperties: any = {}
  ) {
    eventName = '[TEST] ' + eventName;
    gtag('event', eventName, {
      event_category: eventCategory,
      event_label: eventLabel,
      value: eventValue
    });

    amplitude.getInstance().logEvent(eventName, Object.assign({
      page: window.location.pathname,
      ...this.getQueryProperties(),
      category: eventCategory,
      label: eventLabel,
      value: eventValue,

      userAgent: window.navigator.userAgent,
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
