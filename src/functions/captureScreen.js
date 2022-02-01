export async function captureScreen(
  mediaConstraints = {
    video: {
      cursor: "always",
      resizeMode: "crop-and-scale",
    },
  }
) {
  const screenStream = await navigator.mediaDevices.getDisplayMedia(
    mediaConstraints
  );

  return screenStream;
}
