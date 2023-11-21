import {Player} from './player';

export interface PlayerVoteCard {
  player: Player;
  increaseVoteCount: (id: number) => void;
  decreaseVoteCount: (id: number) => void;
  votes: number;
}
