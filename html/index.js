/**
 * @param accessKey 고객사 키
 * 
 * @description
 * 전체목록 API - GET /v1/campaigns/{accessKey}
 *
 * 개별 방송 조회 API - GET /v1/campaigns/{accessKey}/{campaignKey}
 */
var apiUrlPrefix = "https://api.shoplive.cloud/v1/campaigns";
var accessKey = "JhggQMxXNyusmyX3MMJL"; // 고객사 키

let page = 1; // default 1
let pageCount = 15; // default 10
let hls;

// 방송상태가 ONAIR인 방송 목록 조회
async function getCampaignForOnAir() {
  return await fetch(
    `${apiUrlPrefix}/${accessKey}?page=${page}&count=1&status=ONAIR`
  )
    .then((response) => response.json())
    .then((data) => data)
    .catch((e) => {
      console.log(e);
    });
}

// 방송상태가 CLOSED인 방송 목록 조회
async function getCampaignForClosed() {
  return await fetch(
    `${apiUrlPrefix}/${accessKey}?page=${page}&count=${pageCount}&status=CLOSED`
  )
    .then((response) => response.json())
    .then((data) => data)
    .catch((e) => {
      console.log(e);
    });
}

// m3u8 지원이 안되는 브라우저, 혹은 기타 에러의 경우
function handleVideoError(e) {
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
      video.getAttribute("autoplay") != "false"
    ) {
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        video.play();
      });
    }
  }
}

/**
 *
 * @param {*} start 방송 시작 시간
 * @param {*} end 방송 종료 시간
 * @returns 총 방송 시간
 */
function getElapsedTime(start, end) {
  const duration = end - start;
  let seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${hours}:${minutes}:${seconds}`;
}

/**
 *
 * @param {*} value milliseconds
 * @returns yyyy.mm.dd (week) hh:mm
 */
function getFormattedDate(value) {
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
}
