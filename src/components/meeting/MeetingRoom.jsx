import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Phone,
  MessageSquare,
  Users,
  Share,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const MeetingRoom = () => {
  const { meetingId } = useParams();
  const navigate = useNavigate();

  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isParticipantsOpen, setIsParticipantsOpen] = useState(false);

  // Mock participants data
  const [participants, setParticipants] = useState([
    { id: 1, name: "You", isLocal: true, audioOn: true, videoOn: true },
    { id: 2, name: "John Doe", isLocal: false, audioOn: true, videoOn: true },
    {
      id: 3,
      name: "Jane Smith",
      isLocal: false,
      audioOn: false,
      videoOn: true,
    },
  ]);

  useEffect(() => {
    // This would be where you'd initialize your WebRTC connection
    console.log(`Joining meeting with ID: ${meetingId}`);

    // Cleanup function
    return () => {
      console.log("Leaving meeting, cleaning up resources");
      // Clean up WebRTC connections here
    };
  }, [meetingId]);

  const toggleMic = () => {
    setIsMicOn(!isMicOn);
    // Here you would actually mute/unmute your audio track
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    // Here you would actually enable/disable your video track
  };

  const endCall = () => {
    // Clean up and navigate back to home
    navigate("/");
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    if (isChatOpen) setIsParticipantsOpen(false);
  };

  const toggleParticipants = () => {
    setIsParticipantsOpen(!isParticipantsOpen);
    if (isParticipantsOpen) setIsChatOpen(false);
  };

  const shareScreen = () => {
    console.log("Share screen clicked");
    // Implement screen sharing functionality
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      {/* Meeting info bar */}
      <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="font-medium">Meeting: {meetingId}</span>
        </div>
        <div>
          <Button variant="ghost" size="sm" className="text-white">
            <Settings className="h-5 w-5 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex">
        {/* Video grid */}
        <div className="flex-1 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {participants.map((participant) => (
            <div
              key={participant.id}
              className={`relative bg-gray-800 rounded-lg overflow-hidden ${participant.isLocal ? "border-2 border-blue-500" : ""}`}
            >
              {participant.videoOn ? (
                <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                  {/* This would be a video element in a real implementation */}
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${participant.name}`}
                    alt={participant.name}
                    className="w-32 h-32 rounded-full bg-gray-600"
                  />
                </div>
              ) : (
                <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-gray-600 flex items-center justify-center text-2xl font-bold text-white">
                    {participant.name.charAt(0)}
                  </div>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 flex justify-between items-center">
                <span>
                  {participant.name} {participant.isLocal && "(You)"}
                </span>
                <div className="flex space-x-1">
                  {!participant.audioOn && (
                    <MicOff className="h-4 w-4 text-red-500" />
                  )}
                  {!participant.videoOn && (
                    <VideoOff className="h-4 w-4 text-red-500" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Side panel (chat or participants) */}
        {(isChatOpen || isParticipantsOpen) && (
          <div className="w-80 bg-gray-800 border-l border-gray-700">
            {isChatOpen && (
              <div className="h-full flex flex-col">
                <div className="p-4 border-b border-gray-700">
                  <h3 className="text-white font-medium">Meeting Chat</h3>
                </div>
                <div className="flex-1 p-4 overflow-y-auto">
                  {/* Chat messages would go here */}
                  <div className="text-gray-400 text-center">
                    No messages yet
                  </div>
                </div>
                <div className="p-4 border-t border-gray-700">
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      className="flex-1 bg-gray-700 text-white rounded-l-md px-3 py-2 focus:outline-none"
                    />
                    <button className="bg-blue-600 text-white px-4 rounded-r-md">
                      Send
                    </button>
                  </div>
                </div>
              </div>
            )}

            {isParticipantsOpen && (
              <div className="h-full flex flex-col">
                <div className="p-4 border-b border-gray-700">
                  <h3 className="text-white font-medium">
                    Participants ({participants.length})
                  </h3>
                </div>
                <div className="flex-1 p-4 overflow-y-auto">
                  {participants.map((participant) => (
                    <div
                      key={participant.id}
                      className="flex items-center justify-between py-2"
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-medium mr-3">
                          {participant.name.charAt(0)}
                        </div>
                        <span className="text-white">
                          {participant.name} {participant.isLocal && "(You)"}
                        </span>
                      </div>
                      <div className="flex space-x-1">
                        {!participant.audioOn && (
                          <MicOff className="h-4 w-4 text-red-500" />
                        )}
                        {!participant.videoOn && (
                          <VideoOff className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Controls bar */}
      <div className="bg-gray-800 text-white p-4 flex justify-center items-center space-x-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-full p-3 ${isMicOn ? "bg-gray-700 hover:bg-gray-600" : "bg-red-600 hover:bg-red-700"}`}
                onClick={toggleMic}
              >
                {isMicOn ? (
                  <Mic className="h-6 w-6" />
                ) : (
                  <MicOff className="h-6 w-6" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isMicOn ? "Mute microphone" : "Unmute microphone"}</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-full p-3 ${isVideoOn ? "bg-gray-700 hover:bg-gray-600" : "bg-red-600 hover:bg-red-700"}`}
                onClick={toggleVideo}
              >
                {isVideoOn ? (
                  <Video className="h-6 w-6" />
                ) : (
                  <VideoOff className="h-6 w-6" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isVideoOn ? "Turn off camera" : "Turn on camera"}</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full p-3 bg-gray-700 hover:bg-gray-600"
                onClick={shareScreen}
              >
                <Share className="h-6 w-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Share screen</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-full p-3 ${isChatOpen ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-700 hover:bg-gray-600"}`}
                onClick={toggleChat}
              >
                <MessageSquare className="h-6 w-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isChatOpen ? "Close chat" : "Open chat"}</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-full p-3 ${isParticipantsOpen ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-700 hover:bg-gray-600"}`}
                onClick={toggleParticipants}
              >
                <Users className="h-6 w-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {isParticipantsOpen
                  ? "Close participants"
                  : "Show participants"}
              </p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full p-3 bg-red-600 hover:bg-red-700"
                onClick={endCall}
              >
                <Phone className="h-6 w-6 rotate-135" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>End call</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default MeetingRoom;
