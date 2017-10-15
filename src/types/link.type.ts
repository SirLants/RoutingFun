import { LinkIndex } from '../enums/link-index.enum';

export interface Link {
  label: string;
  path: string;
  index: LinkIndex;
  isListed?: boolean;
  isNavigable?: boolean;
  isDisabled?: boolean;
  isComplete?: boolean;
  children?: Array<Link>;
}
