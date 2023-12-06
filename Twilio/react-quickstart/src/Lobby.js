import React from "react";

const Lobby = ({
  username,
  handleUsernameChange,
  getMeetingAndToken,
  meetingId,
  handleMeetingIdChange,
  //   onClick,
  setMeetingId,
  //   roomName,
  // handleRoomNameChange,
  //   handleSubmit,
  //   connecting,
}) => {
  const onClick = async () => {
    await getMeetingAndToken(meetingId);
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Enter Meeting Id"
        onChange={(e) => {
          setMeetingId(e.target.value);
        }}
      />
      <button onClick={onClick}>Join</button>
      {" or "}
      <button onClick={onClick}>Create Meeting</button>
    </div>
  );

  //   return (
  //     <>
  //       <form>
  //         {/* <h2>Enter a room</h2> */}

  //         <div>
  //           <label htmlFor="name">Name:</label>
  //           <input
  //             type="text"
  //             id="field"
  //             value={username}
  //             onChange={handleUsernameChange}
  //             //   readOnly={connecting}
  //             required
  //           />
  //         </div>
  //         <button
  //           type="submit"
  //           onClick={onClick}
  //           //   disabled={connecting}
  //         >
  //           {/* {connecting ? "Connecting" : "Join"} */}
  //           Create Meeting
  //         </button>
  //         <h2>Or</h2>
  //         <div>
  //           <label htmlFor="name">Name:</label>
  //           <input
  //             type="text"
  //             id="field"
  //             value={username}
  //             onChange={handleUsernameChange}
  //             //   readOnly={connecting}
  //             required
  //           />
  //         </div>
  //         <div>
  //           <label htmlFor="room">Room name:</label>
  //           <input
  //             type="text"
  //             id="room"
  //             //   value={roomName}
  //             //   onChange={handleRoomNameChange}
  //             //   readOnly={connecting}
  //             value={meetingId}
  //             onChange={handleMeetingIdChange}
  //             //   required
  //           />
  //         </div>
  //         <button
  //           type="submit"
  //           onClick={onClick}
  //           //   disabled={connecting}
  //         >
  //           {/* {connecting ? "Connecting" : "Join"} */}
  //           Join
  //         </button>
  //       </form>
  //     </>
  //   );
};

export default Lobby;
