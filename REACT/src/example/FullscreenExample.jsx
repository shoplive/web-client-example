import ShoplivePlayer from "../shoplive/ShoplivePlayer";
import { useLocation } from 'react-router-dom';

const FullscreenExample = ({ak: propAk, ck: propCk }) => {
  
  const playerContainerId = 'your-shoplive-player-container-id';
  const location = useLocation();
  const { ak: stateAk, ck: stateCk } = location.state || {};
  
  const ak = propAk || stateAk;
  const ck = propCk || stateCk;
  return (
    <div className="App">
    <ShoplivePlayer 
      ak={ak} 
      ck={ck} 
      isFullscreen={true} 
      playerContainerId='{playerContainerId} '
      />
    </div>
  )
}

export default FullscreenExample