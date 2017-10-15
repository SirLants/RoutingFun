import { Link } from './link.type';
import { LinkIndex } from '../enums/link-index.enum';

export interface RouteState {
  activeIndex: LinkIndex;
  previousRoute: string;
  nextRoute: string;
  links: Array<Link>;
}
