import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ShoplivePlayer = ({ ak, ck, isFullscreen, playerContainerId }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!ak || !ck) {
      console.error("Invalid accessKey or campaignKey");
      return;
    }
    const messageCallback = {
      DOWNLOAD_COUPON: function (payload) {
        alert("click coupon : " + payload.coupon);
      },
      ON_CLICK_CLOSE_PLAYER_MODAL: function (payload) {
        navigate(-1);
        cloud.shoplive.dismissLayerModalPlayer();
      },
    };

    const isContainerFit = !isFullscreen;
    const useBackButton = isFullscreen;
    const options = {
      isContainerFit: isContainerFit,
    };

    window.cloud.shoplive.init({
      accessKey: ak,
      isSpa: true,
      messageCallback: messageCallback,
    });
    if (isFullscreen) {
      //disableHistoryHook:true makes back button to work as usual, otherwise back button remove the player while user stay on the same page
      cloud.shoplive.showFeaturedPlayerModal({
        campaignKey: ck,
        disableHistoryHook: true,
      });
    } else {
      cloud.shoplive.setPlayer(playerContainerId, { campaignKey: ck, options });
    }
    return () => {};
  }, [ak, ck, isFullscreen, playerContainerId]);

  return <div id={playerContainerId} />;
};

export default ShoplivePlayer;
