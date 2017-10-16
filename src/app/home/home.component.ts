import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { NavigationService } from './../shared/navigation.service';
import { RouteState } from './../../types/route-state.type';
import { Link } from './../../types/link.type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private routeSub: Subscription;
  public routeState: RouteState;
  public activeLinks: Array<Link>;

  constructor(private navigationService: NavigationService) { }

  ngOnInit() {
    this.routeSub = this.navigationService.getRouteState().subscribe(routeState => {
      this.routeState = routeState;
      this.activeLinks = this.routeState.links
        .filter(link => link.isVisible && link.isListed);
    });
  }

  public update() {
    this.navigationService.pushRouteState(this.routeState);
  }

}
