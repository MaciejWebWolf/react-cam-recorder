export async function captureCamera(
  mediaConstraints = {
    video: {
      width: 1280,
      height: 720,
    },
    audio: {
      echoCancellation: true,
      noiseSuppression: true,
      sampleRate: 44100,
    },
  }
) {
  const video = document.querySelector(".main-video");
  const stream = await navigator.mediaDevices.getUserMedia(mediaConstraints);

  video.src = null;
  video.srcObject = stream;
  video.muted = true;

  return stream;
}
