import {PlayerVoteProvider} from '../contexts/PlayerVoteContext';
import App from '../App';

const VoteProvider = () => (
  <PlayerVoteProvider>
    <App />
  </PlayerVoteProvider>
);

export default VoteProvider;
