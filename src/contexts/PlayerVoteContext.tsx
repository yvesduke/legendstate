import React, {ReactNode, useContext} from 'react';
import {Player} from '../types/player';
import {Observable, observable} from '@legendapp/state';
import {ClubCode} from '../types/club.enum';
import {CountryCode} from '../types/country.enum';

// Extract the type of the 'id' property from the Player interface
type PlayerId = Player['id'];

interface PlayerVoteState {
  players: Observable<Player[]>;
  MVote: Observable<number>;
  CVote: Observable<number>;
  handleAddVote: (id: PlayerId) => void;
  handleDecVote: (id: PlayerId) => void;
}

interface PlayerVoteProviderProp {
  children: ReactNode;
}

const initialState: PlayerVoteState = observable({
  players: [
    {id: 1, name: 'Messi', club: ClubCode.PAR, country: CountryCode.ARG},
    {id: 2, name: 'Ronaldo', club: ClubCode.MAN, country: CountryCode.POR},
  ],
  MVote: 0,
  CVote: 0,
  handleAddVote: (id: PlayerId) => {
    id === 1
      ? initialState.MVote.set(initialState.MVote.get() + 1)
      : initialState.CVote.set(initialState.CVote.get() + 1);
  },
  handleDecVote: (id: PlayerId) => {
    id === 1
      ? initialState.MVote.set(initialState.MVote.get() - 1)
      : initialState.CVote.set(initialState.CVote.get() - 1);
  },
});

const PlayerVoteContext = React.createContext<PlayerVoteState | null>(
  initialState,
);

export const PlayerVoteProvider: React.FC<PlayerVoteProviderProp> = ({
  children,
}) => {
  const {players, CVote, MVote, handleAddVote, handleDecVote} = usePlayerVote();

  return (
    <PlayerVoteContext.Provider
      value={{players, CVote, MVote, handleAddVote, handleDecVote}}>
      {children}
    </PlayerVoteContext.Provider>
  );
};

export const usePlayerVote = () => {
  const context = useContext(PlayerVoteContext)!;

  if (!context)
    throw new Error(
      'usePlayerVoteContext must be used within a PlayerVoteContextProvider',
    );

  return context;
};
