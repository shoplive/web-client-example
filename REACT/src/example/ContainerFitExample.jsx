import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ShoplivePlayer from "../shoplive/ShoplivePlayer";

const ContainerFitExample = ({ ak:propAk, ck:propCk }) => {
  const navigate = useNavigate();
  const playerContainerId = "your-shoplive-player-container-id";
  const location = useLocation();
  const { ak: stateAk, ck: stateCk } = location.state || {};
  const ak = propAk || stateAk;
  const ck = propCk || stateCk;

  const onClickFullscreenButton = () => {
    navigate("/fullscreen", { state: { ak, ck } });
  };
  const onClickPluginLink = () => {
    navigate("/plugin", { state: { ak, ck } });
  };

  return (
    <div className="ContainerFitWrapper">
      <header>
        <div className="wrapper">
          <h3>Shoplive - Container fit example</h3>
          <button onClick={onClickPluginLink}>Plugin Example</button>
          {/* <a onClick={onClickPluginLink}>Plugin example</a> */}
        </div>
      </header>

      <main className="wrapper">
        <h1>Shoplive Player Example</h1>
        <section className="flexbox">
          <div className="flexbox-contents">
            <h2>Shoplive Player Example</h2>
            <p>Your contents...</p>
            <button onClick={onClickFullscreenButton}>Gn Fullscreen</button>
          </div>
          <div className="wrap-player">
            <ShoplivePlayer
              ak={ak}
              ck={ck}
              playerContainerId={playerContainerId}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default ContainerFitExample;
