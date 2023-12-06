import React, { useEffect, useRef, useMemo } from "react";
import ReactPlayer from "react-player";
import { useParticipant } from "@videosdk.live/react-sdk";

const Participant = ({ participant }) => {
  //   const [videoTracks, setVideoTracks] = useState([]);
  //   const [audioTracks, setAudioTracks] = useState([]);

  //   const videoRef = useRef();
  const audioRef = useRef();
  //   const trackpubsToTracks = (trackMap) =>
  //     Array.from(trackMap.values())
  //       .map((publication) => publication.track)
  //       .filter((track) => track !== null);

  //   useEffect(() => {
  //     setVideoTracks(trackpubsToTracks(participant.videoTracks));
  //     setAudioTracks(trackpubsToTracks(participant.audioTracks));

  //     const trackSubscribed = (track) => {
  //       if (track.kind === "video") {
  //         setVideoTracks((videoTracks) => [...videoTracks, track]);
  //       } else if (track.kind === "audio") {
  //         setAudioTracks((audioTracks) => [...audioTracks, track]);
  //       }
  //     };

  //     const trackUnsubscribed = (track) => {
  //       if (track.kind === "video") {
  //         setVideoTracks((videoTracks) => videoTracks.filter((v) => v !== track));
  //       } else if (track.kind === "audio") {
  //         setAudioTracks((audioTracks) => audioTracks.filter((a) => a !== track));
  //       }
  //     };

  //     participant.on("trackSubscribed", trackSubscribed);
  //     participant.on("trackUnsubscribed", trackUnsubscribed);

  //     return () => {
  //       setVideoTracks([]);
  //       setAudioTracks([]);
  //       participant.removeAllListeners();
  //     };
  //   }, [participant]);

  //   useEffect(() => {
  //     const videoTrack = videoTracks[0];
  //     if (videoTrack) {
  //       videoTrack.attach(videoRef.current);
  //       return () => {
  //         videoTrack.detach();
  //       };
  //     }
  //   }, [videoTracks]);

  //   useEffect(() => {
  //     const audioTrack = audioTracks[0];
  //     if (audioTrack) {
  //       audioTrack.attach(audioRef.current);
  //       return () => {
  //         audioTrack.detach();
  //       };
  //     }
  //   }, [audioTracks]);

  const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
    useParticipant(participant);

  const videoStream = useMemo(() => {
    if (webcamOn && webcamStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    }
  }, [webcamStream, webcamOn]);

  useEffect(() => {
    if (audioRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);

        audioRef.current.srcObject = mediaStream;
        audioRef.current
          .play()
          .catch((error) =>
            console.error("videoElem.current.play() failed", error)
          );
      } else {
        audioRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn]);

  return (
    <div className="participant">
      {/* <h3>{participant.identity}</h3>
      <video ref={videoRef} autoPlay={true} />
      <audio ref={audioRef} autoPlay={true} muted={true} /> */}
      <h3>{participant.participantId}</h3>
      <audio ref={audioRef} autoPlay muted={isLocal} />
      {webcamOn && (
        <ReactPlayer
          //
          playsinline // very very imp prop
          pip={false}
          light={false}
          controls={false}
          muted={true}
          playing={true}
          //
          url={videoStream}
          //
          height={"200px"}
          width={"300px"}
          onError={(err) => {
            console.log(err, "participant video error");
          }}
        />
      )}
    </div>
  );
};

export default Participant;
