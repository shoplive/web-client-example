import userIcon from "./user-icon.svg";
import likeIcon from "./like-icon.svg";
import clockIcon from "./clock-icon.svg";
import "./App.css";
import { useCallback, useEffect, useState } from "react";
import Hls from "hls.js";

/**
 * @param accessKey
 * 고객사 키
 * @param campaignKey
 * 캠페인 키
 * @description
 * 전체목록 API - GET /v1/campaigns/{accessKey}
 *
 * 개별 방송 조회 API - GET /v1/campaigns/{accessKey}/{campaignKey}
 */
const apiUrlPrefix = "https://api.shoplive.cloud/v1/campaigns";
const accessKey = "JhggQMxXNyusmyX3MMJL"; // 고객사 키

let page = 1; // default 1
let pageCount = 15; // default 10
let hls;

const App = () => {
  // 조회한 방송 목록 데이터 상태 관리 (방송 상태 기준으로 ONAIR / CLOSED)
  const [campaignsForOnair, setCampaignsForOnair] = useState();
  const [campaignsForClosed, setCampaignsClosed] = useState();

  // 샵라이브 API에서 목록 조회.
  useEffect(() => {
    // 방송상태가 ONAIR인 방송 목록 조회
    fetch(`${apiUrlPrefix}/${accessKey}?page=${page}&count=1&status=ONAIR`)
      .then((response) => response.json())
      .then((data) => {
        setCampaignsForOnair(data);
      })
      .catch((e) => {
        console.log(e);
      });

    // 방송상태가 CLOSED인 방송 목록 조회
    fetch(
      `${apiUrlPrefix}/${accessKey}?page=${page}&count=${pageCount}&status=CLOSED`
    )
      .then((response) => response.json())
      .then((data) => {
        setCampaignsClosed(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  // m3u8 지원이 안되는 브라우저, 혹은 기타 에러의 경우
  const handleVideoError = (e) => {
    const video = e.target;
    /**
     * .m3u8 지원여부를 체크함.
     * Safari 브라우저를 제외하고는 hls 모듈에 의존함
     */
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.play();
    } else if (Hls.isSupported()) {
      const videoUrl = e.target.src;
      hls = new Hls();

      hls.loadSource(videoUrl || "");
      hls.attachMedia(video);

      if (
        video.getAttribute("autoplay") !== null &&
        video.getAttribute("autoplay") !== "false"
      ) {
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
          video.play();
        });
      }
    }
  };

  /**
   *
   * @param {*} start 방송 시작 시간
   * @param {*} end 방송 종료 시간
   * @returns 총 방송 시간
   */
  const getElapsedTime = (start, end) => {
    const duration = end - start;
    let seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${hours}:${minutes}:${seconds}`;
  };

  /**
   *
   * @param {*} value milliseconds
   * @returns yyyy.mm.dd (week) hh:mm
   */
  const getFormattedDate = (value) => {
    const WEEKDAY = ["일", "월", "화", "수", "목", "금", "토"];
    const time = new Date(value);
    const year = time.getFullYear();
    const month = time.getMonth() + 1;
    const date = time.getDate();
    const week = WEEKDAY[time.getDay()];
    let hours = time.getHours(),
      minutes = time.getMinutes();

    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${year}.${month}.${date} (${week}) ${hours}:${minutes}`;
  };

  /**
   * 방송중 컴포넌트
   */
  const renderCampaignForOnair = useCallback(() => {
    let result;

    if (!campaignsForOnair) {
      return null;
    }

    if (campaignsForOnair.results.length > 0) {
      result = (
        <>
          <div className="campaign-list">
            {campaignsForOnair?.results?.map((o) => (
              <div className="campaign" key={o.campaignKey}>
                <div className="content">
                  <div className="left-side">
                    <div className="title">SHOPLIVE</div>
                  </div>
                  <div className="player">
                    <div
                      className="background-image"
                      style={{ backgroundImage: `url(${o.backgroundUrl})` }} // 방송중일 경우에는 backgroundUrl 이미지를 영상 뒤에 배치시켜서 사용
                    />
                    <div className="info">
                      <div className="user-count">
                        <span className="user-icon">
                          <img src={userIcon} alt="icon" />
                        </span>{" "}
                        {/* 접속자 수 */}
                        {o.userCount}
                      </div>
                      <div className="like-count">
                        <span className="like-icon">
                          <img src={likeIcon} alt="icon" />
                        </span>{" "}
                        {/* 좋아요 수 */}
                        {o.adoreCount}
                      </div>
                    </div>
                    <video
                      id={`video-${o.campaignKey}`}
                      className="video"
                      src={o.previewLiveUrl} // 미리보기 화면의 경우 고해상도가 필요가 없으므로 previewLiveUrl (320p) 사용
                      muted={true}
                      autoPlay
                      onError={handleVideoError}
                    />
                  </div>
                </div>
                <div className="box">
                  {/* 방송 제목 */}
                  <div className="title">{o.title}</div>
                  <div className="desc">실시간 방송 보기 &gt;</div>
                </div>
              </div>
            ))}
          </div>
        </>
      );
    } else {
      result = <div>진행중인 방송이 없습니다</div>;
    }

    return (
      <>
        <div className="title">지금 라이브 방송중!</div>
        {result}
      </>
    );
  }, [campaignsForOnair]);

  /**
   * 방송종료 컴포넌트
   */
  const renderCampaignForClosed = useCallback(() => {
    let result;

    if (!campaignsForClosed) {
      return null;
    }

    if (campaignsForClosed.results.length > 0) {
      result = (
        <>
          <div className="campaign-list">
            {campaignsForClosed?.results?.map((o) => (
              <div className="campaign" key={o.campaignKey}>
                <div className="content">
                  <div className="player">
                    <div className="info">
                      <div className="user-count">
                        <span className="user-icon">
                          <img src={userIcon} alt="icon" />
                        </span>{" "}
                        {/* 접속자 수 */}
                        {o.userCount}
                      </div>
                      <div className="like-count">
                        <span className="like-icon">
                          <img src={likeIcon} alt="icon" />
                        </span>{" "}
                        {/* 좋아요 수 */}
                        {o.adoreCount}
                      </div>
                    </div>
                    <video
                      id={`video-${o.campaignKey}`}
                      className="video"
                      src={o.previewReplayLiveUrl} // 종료된 방송은 previewReplayLiveUrl 사용
                      muted={true}
                      onError={handleVideoError}
                    />
                    <div
                      className="background-image"
                      style={{ backgroundImage: `url(${o.poster2Url})` }} // 종료된 방송은 poster2Url 이미지를 영상 앞에 배치시켜서 사용
                    />
                  </div>
                </div>
                <div className="box">
                  {/* 방송 제목 */}
                  <div className="title">{o.title}</div>
                  <div className="desc1">{getFormattedDate(o.startedAt)}</div>
                  <div className="desc2">
                    <span className="clock-icon">
                      <img src={clockIcon} alt="icon" />
                    </span>{" "}
                    <span className="time">
                      {getElapsedTime(o.startedAt, o.endedAt)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      );
    } else {
      result = <div>종료된 방송이 없습니다</div>;
    }

    return (
      <>
        <div className="header">
          <div className="title">종료된 방송</div>
        </div>
        <div className="body">{result}</div>
      </>
    );
  }, [campaignsForClosed]);

  return (
    <div className="shoplive">
      <div className="onair">{renderCampaignForOnair()}</div>
      <div className="closed">{renderCampaignForClosed()}</div>
    </div>
  );
};

export default App;
