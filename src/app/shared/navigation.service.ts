import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Link } from './../../types/link.type';
import { LinkIndex } from './../../enums/link-index.enum';
import { RouteState } from './../../types/route-state.type';

@Injectable()
export class NavigationService implements OnInit {
  private routeStateSubject = new BehaviorSubject<RouteState>(this.initializeRouteState());

  private routeState: RouteState;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateRouteState(this.routeState);
      }
    });
  }

  ngOnInit() {
  }

  public pushRouteState(routeState: RouteState) {
    this.routeStateSubject.next(routeState);
  }

  public updateRouteState(routeState: RouteState) {
    this.routeState.activeIndex = this.calculateActive();
    this.routeState.nextRoute = this.calculateNext();
    this.routeState.previousRoute = this.calculatePrevious();
    this.routeStateSubject.next(routeState);
  }

  public getRouteState(): Observable<RouteState> {
    return this.routeStateSubject.asObservable();
  }

  private calculateActive(): LinkIndex {
    return this.routeState.links
      .find(link => link.path === this.router.url)
        .index;
  }

  private calculateNext(): string {
    // First check to make sure there is a remaining route that isn't the current route
    if (this.routeState.links
      .some(link => !link.isComplete && link.isVisible && link.isListed && link.index !== this.routeState.activeIndex)
    ) {
      // If there is, check if there is still an incomplete route that is greater than the current and set it to next
      if (this.routeState.links
        .some(link => link.index.valueOf() > this.routeState.activeIndex.valueOf()
          && !link.isComplete && link.isVisible && link.isListed)
      ) {
        return this.routeState.links
          .find(link => link.index.valueOf() > this.routeState.activeIndex.valueOf()
            && !link.isComplete && link.isVisible && link.isListed).path;
      // If there isn't, get the first incomplete route
      } else {
        return this.routeState.links
          .find(link => !link.isComplete && link.isVisible && link.isListed).path;
      }
    // If there isn't a remaining incomplete route go to an absolute path
    } else {
      return this.routeState.links
        .find(link => link.index === LinkIndex.Page1).path;
    }
  }

  private calculatePrevious(): string {
    /* Basically make sure that the previous route is no longer disabled somehow before we go back to it.
    ** If so, go back more.
    */
    let counter = this.routeState.activeIndex.valueOf() - 1;
    for (counter; counter >= 0; counter--) {
      if (this.routeState.links
        .some(link => link.index.valueOf() === counter && link.isVisible && link.isListed)
      ) {
        return this.routeState.links.find(link => link.index.valueOf() === counter).path;
      }
    }
    if (counter === -1) {
      return this.routeState.links
        .find(link => link.index === LinkIndex.Page5).path;
    }
  }

  // This obviously needs to be updated and re-calc'ed still
  private initializeRouteState(): RouteState {
    this.routeState = {
      activeIndex: -1,
      nextRoute: '',
      previousRoute: '',
      links: [
        {
          label: 'Home',
          path: '/home',
          index: LinkIndex.Home,
          isListed: false,
        },
        {
          label: 'Login',
          path: '/login',
          index: LinkIndex.Login,
          isListed: false
        },
        {
          label: 'Page 1',
          path: '/home/page-1',
          index: LinkIndex.Page1,
          isListed: true,
          isComplete: false,
          isNavigable: true,
          isVisible: true
        },
        {
          label: 'Page 2',
          path: '/home/page-2',
          index: LinkIndex.Page2,
          isListed: true,
          isComplete: false,
          isNavigable: true,
          isVisible: true
        },
        {
          label: 'Page 3',
          path: '/home/page-3',
          index: LinkIndex.Page3,
          isListed: true,
          isComplete: false,
          isNavigable: true,
          isVisible: true
        },
        {
          label: 'Page 4',
          path: '/home/page-4',
          index: LinkIndex.Page4,
          isListed: true,
          isComplete: false,
          isNavigable: true,
          isVisible: true
        },
        {
          label: 'Page 5',
          path: '/home/page-5',
          index: LinkIndex.Page5,
          isListed: true,
          isComplete: false,
          isNavigable: true,
          isVisible: true
        }
      ]
    };

    this.routeState.activeIndex = this.calculateActive();
    this.routeState.nextRoute = this.calculateNext();
    this.routeState.previousRoute = this.calculatePrevious();

    return this.routeState;
  }
}
