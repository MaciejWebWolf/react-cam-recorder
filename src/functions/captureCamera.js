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
  const stream = await navigator.mediaDevices
    .getUserMedia(mediaConstraints)
    .catch((error) => console.log(error));

  return stream;
}
