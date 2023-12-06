import React, { useState } from "react";
import { useMeeting } from "@videosdk.live/react-sdk";
import Participant from "./Participant";

// const Room = ({ roomName, room, handleLogout }) => {
//   const [participants, setParticipants] = useState([]);

//   useEffect(() => {
//     const participantConnected = (participant) => {
//       setParticipants((prevParticipants) => [...prevParticipants, participant]);
//     };

//     const participantDisconnected = (participant) => {
//       setParticipants((prevParticipants) =>
//         prevParticipants.filter((p) => p !== participant)
//       );
//     };

//     room.on("participantConnected", participantConnected);
//     room.on("participantDisconnected", participantDisconnected);
//     room.participants.forEach(participantConnected);
//     return () => {
//       room.off("participantConnected", participantConnected);
//       room.off("participantDisconnected", participantDisconnected);
//     };
//   }, [room]);

//   const remoteParticipants = participants.map((participant) => (
//     <Participant key={participant.sid} participant={participant} />
//   ));

//   return (
//     <div className="room">
//       <h2>Room: {roomName}</h2>
//       <button onClick={handleLogout}>Log out</button>
//       <div className="local-participant">
//         {room ? (
//           <Participant
//             key={room.localParticipant.sid}
//             participant={room.localParticipant}
//           />
//         ) : (
//           ""
//         )}
//       </div>
//       <h3>Remote Participants</h3>
//       <div className="remote-participants">{remoteParticipants}</div>
//     </div>
//   );
// };

function Controls() {
  const { leave, toggleMic, toggleWebcam } = useMeeting();
  return (
    <div>
      <button onClick={() => leave()}>Leave</button>
      <button onClick={() => toggleMic()}>toggleMic</button>
      <button onClick={() => toggleWebcam()}>toggleWebcam</button>
    </div>
  );
}

const Room = ({ meetingId, onMeetingLeave }) => {
  const [joined, setJoined] = useState(null);
  const { join } = useMeeting();
  const { participants, localParticipant } = useMeeting({
    onMeetingJoined: () => {
      setJoined("JOINED");
    },
    onMeetingLeft: () => {
      onMeetingLeave();
    },
  });
  const joinMeeting = () => {
    setJoined("JOINING");
    join();
  };

  const remoteParticipants = Array.from(participants.values())
    .filter((participant) => localParticipant.id !== participant.id)
    .map((participant) => (
      <Participant key={participant.id} participant={participant.id} />
    ));

  return (
    <div>
      <h3>Meeting Id: {meetingId}</h3>
      {joined && joined == "JOINED" ? (
        <div>
          <Controls />
          <div className="local-participant">
            <Participant
              key={localParticipant.id}
              participant={localParticipant.id}
            />
          </div>
          <h3>Remote Participants</h3>
          <div className="remote-participants">{remoteParticipants}</div>
        </div>
      ) : joined && joined == "JOINING" ? (
        <p>Joining the meeting...</p>
      ) : (
        <button onClick={joinMeeting}>Join</button>
      )}
    </div>
  );
};

export default Room;
