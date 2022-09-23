import React from 'react'
import { useEffect } from 'react'

const ShoplivePlayer = ({ak, ck, isFullscreen, playerContainerId, shareUrl}) => {

  useEffect(() => {

    if(!ak || !ck) {
      console.error('Invalid accessKey or campaignKey');
      return;
    }

    (function (s, h, o, p, l, i, v, e) {
      s["ShoplivePlayer"] = l;
      (s[l] =
        s[l] ||
        function () {
          (s[l].q = s[l].q || []).push(arguments);
        }),
        (i = h.createElement(o)),
        (v = h.getElementsByTagName(o)[0]);
      i.async = 1;
      i.src = p;
      v.parentNode.insertBefore(i, v);
    })(window, document, "script", "https://static.shoplive.cloud/live.js", "mplayer");


    const messageCallback = {
      DOWNLOAD_COUPON: function (payload) {
        alert('click coupon : ' + payload.coupon);
      },
    }

    const isContainerFit = !isFullscreen;
    const useBackButton = isFullscreen
    const options = {
      messageCallback: messageCallback,
      shareUrl: shareUrl,
      isFullScreen: isFullscreen,
      isContainerFit: isContainerFit,
      ui: {
        viewerCount: true,
        likeCount: true,
        shareButton: true,
        backButton: useBackButton,
      },
    }

    mplayer("init", ak, ck, "", options);
    mplayer("run", playerContainerId);
    
  }, [ak, ck, isFullscreen, playerContainerId, shareUrl])


  return (
    <div id={playerContainerId} />
  );
}


export default ShoplivePlayer;