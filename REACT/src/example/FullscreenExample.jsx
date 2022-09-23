import ShoplivePlayer from "../shoplive/ShoplivePlayer";

const FullscreenExample = ({ak, ck}) => {

  const playerContainerId = 'your-shoplive-player-container-id';

  return (
    <ShoplivePlayer 
      ak={ak} 
      ck={ck} 
      isFullscreen={true} 
      playerContainerId={playerContainerId} 
      shareUrl={"YOUR_SHARE_URL"}
      />
  )
}

export default FullscreenExample