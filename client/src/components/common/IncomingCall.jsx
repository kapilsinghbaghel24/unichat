import { useStateContext } from "../../context/StateContext";
import { reducerCases } from "../../context/constants.js";


const IncomingCall = () => {

  const [{ incomingVoiceCall, socket }, dispatch] = useStateContext();

  const acceptCall = () => {
    dispatch(
      {
        type: reducerCases.SET_VOICE_CALL,
        voiceCall: { ...incomingVoiceCall, type: "in-coming" },
      }
    );

    dispatch(
      {
        type: reducerCases.SET_INCOMING_VOICE_CALL,
        incomingVoiceCall: undefined,
      }
    );

    socket.current.emit("accept-incoming-call", { id: incomingVoiceCall.id });
  }

  const rejectCall = () => {
    socket.current.emit("reject-voice-call", { from: incomingVoiceCall.id });
    dispatch({ type: reducerCases.END_CALL });
  }

  return (
    <div className="h-24 w-80 fixed bottom-8 mb-0 right-6 z-50 rounded-sm flex gap-5 items-center justify-start p-4 bg-conversation-panel-background text-white drop-shadow-2xl border-icon-green border-2 py-14">
      <div>
        <img
          src={incomingVoiceCall?.profilePicture}
          alt="avatar"
          width={70}
          height={70}
          className="rounded-full"
        />
      </div>

      <div>
        <div>{incomingVoiceCall.name}</div>
        <div className="text-xm">Incoming Voice Call</div>
        <div className="flex gap-2 mt-2">
          <button
            onClick={rejectCall}
            className="bg-red-500 p-1 px-3 text-sm rounded-full"
          >
            Reject
          </button>

          <button
            onClick={acceptCall}
            className="bg-red-500 p-1 px-3 text-sm rounded-full"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

export default IncomingCall;