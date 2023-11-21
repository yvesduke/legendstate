import {ClubCode} from './club.enum';
import {CountryCode} from './country.enum';

export interface Player {
  readonly id: number;
  name: string;
  club: ClubCode;
  country: CountryCode;
}
