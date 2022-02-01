export function enablePreview() {
  const video = document.querySelector(".preview-video");

  if (video.classList.contains("playing")) return;
  const constraints = { audio: false, video: { width: 1280, height: 720 } };
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function (mediaStream) {
      video.srcObject = mediaStream;
      video.classList.add("playing");
      video.onloadedmetadata = function () {
        video.play();
        video.requestPictureInPicture();
      };
    })
    .catch(function (err) {
      console.log(err.name + ": " + err.message);
    });
}

export function disablePreview() {
  const video = document.querySelector(".preview-video");

  if (video.classList.contains("playing")) {
    video.classList.remove("playing");
    const stream = video.srcObject;
    stream.getTracks().forEach(function (track) {
      track.stop();
    });
    document.exitPictureInPicture();
    // video.remove();
  }
}
