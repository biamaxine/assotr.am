import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  private currentUrl!: string;

  get url(): string {
    return this.currentUrl;
  }

  set url(url: string) {
    this.currentUrl = url;
  }

  update(url: string) {
    this.currentUrl = url;
  }

  getId() {
    const [_, id] = this.currentUrl.split('_id_');
    return id;
  }
}
