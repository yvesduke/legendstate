import React, {useContext} from 'react';
import {Player} from '../types/player';
import {Observable, observable} from '@legendapp/state';
import {ClubCode} from '../types/club.enum';
import {CountryCode} from '../types/country.enum';

interface PlayerVoteState {
  players: Observable<Player[]>;
  MVote: Observable<number>;
  CVote: Observable<number>;
}

const initialState: PlayerVoteState = {
  players: observable([
    {id: 1, name: 'Messi', club: ClubCode.PAR, country: CountryCode.ARG},
    {id: 2, name: 'Ronaldo', club: ClubCode.MAN, country: CountryCode.POR},
  ]),
  MVote: observable(0),
  CVote: observable(0),
};

const PlayerVoteContext = React.createContext<PlayerVoteState | null>(
  initialState,
);

export const usePlayerVote = () => {
  const context = useContext(PlayerVoteContext)!;

  if (!context)
    throw new Error(
      'usePlayerVoteContext must be used within a PlayerVoteContextProvider',
    );

  return context;
};

export const PlayerVoteProvider = ({children}) => (
  <PlayerVoteContext.Provider value={initialState}>
    {children}
  </PlayerVoteContext.Provider>
);
