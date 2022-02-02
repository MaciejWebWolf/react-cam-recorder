import React, { useRef, useEffect } from "react";

const SmallCamera = ({ isSmallCamera }) => {
  let classes = isSmallCamera ? "preview-video active" : "preview-video";
  const vidRef = useRef(null);

  useEffect(() => {
    if (isSmallCamera) enablePreview();
    else disablePreview();
  }, [isSmallCamera]);

  function enablePreview() {
    console.log("enable preview");
    const constraints = { audio: false, video: { width: 1280, height: 720 } };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function (mediaStream) {
        vidRef.current.srcObject = mediaStream;
        vidRef.current.onloadedmetadata = function () {
          vidRef.current.play();
          vidRef.current.requestPictureInPicture();
        };
      })
      .catch(function (err) {
        console.log(err.name + ": " + err.message);
      });
  }
  function disablePreview() {
    console.log("disable preview");
    if (vidRef.current) {
      const stream = vidRef.current.srcObject;
      if (stream) {
        stream.getTracks().forEach(function (track) {
          track.stop();
        });
        vidRef.current.srcObject = null;
        document.exitPictureInPicture();
      }
    }
  }

  return (
    <div className="preview-wrapper">
      <video ref={vidRef} className={classes} muted controls></video>
    </div>
  );
};

export default SmallCamera;
