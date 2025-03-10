import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mic, Video, Copy, Camera, CameraOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface StartMeetingProps {
  onStartMeeting?: (name: string) => void;
  onJoinMeeting?: (meetingId: string, name: string) => void;
  defaultName?: string;
}

const StartMeeting = ({
  onStartMeeting = (name) => console.log(`Starting meeting with name: ${name}`),
  onJoinMeeting = (meetingId, name) =>
    console.log(`Joining meeting ${meetingId} with name: ${name}`),
  defaultName = "",
}: StartMeetingProps) => {
  const [name, setName] = useState(defaultName);
  const [meetingUrl, setMeetingUrl] = useState("");
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const navigate = useNavigate();

  // Get user's name from localStorage if available
  useEffect(() => {
    const savedName = localStorage.getItem("userName");
    if (savedName) {
      setName(savedName);
    }
  }, []);

  const handleStartMeeting = () => {
    if (!name.trim()) return;

    // Save name to localStorage
    localStorage.setItem("userName", name);

    // Generate a random meeting ID
    const meetingId = Math.random().toString(36).substring(2, 10);
    const url = `/meeting/${meetingId}`;
    setMeetingUrl(url);

    onStartMeeting(name);
  };

  const handleJoinMeeting = () => {
    if (!name.trim()) return;

    // Save name to localStorage
    localStorage.setItem("userName", name);

    // This would typically parse a meeting ID from user input
    const meetingId = prompt("Enter meeting ID");
    if (meetingId) {
      onJoinMeeting(meetingId, name);
      navigate(`/meeting/${meetingId}`);
    }
  };

  const startActualMeeting = () => {
    if (meetingUrl) {
      // Save audio/video preferences
      localStorage.setItem("isMicOn", isMicOn.toString());
      localStorage.setItem("isCameraOn", isCameraOn.toString());
      navigate(meetingUrl);
    }
  };

  const copyMeetingLink = () => {
    if (meetingUrl) {
      const fullUrl = window.location.origin + meetingUrl;
      navigator.clipboard.writeText(fullUrl);
      alert("Meeting link copied to clipboard!");
    }
  };

  const toggleCamera = () => {
    setIsCameraOn(!isCameraOn);
  };

  const toggleMic = () => {
    setIsMicOn(!isMicOn);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-gray-900 rounded-lg shadow-xl text-white">
      <h1 className="text-2xl font-bold text-center mb-8">VideoMeet</h1>

      <div className="bg-gray-800 rounded-lg overflow-hidden mb-8">
        <div className="aspect-video bg-gray-950 flex items-center justify-center">
          {isCameraOn ? (
            <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name || "user"}`}
                alt="Avatar"
                className="w-full h-full"
              />
            </div>
          ) : (
            <div className="text-center">
              <p className="text-gray-400 mb-2">Camera is off</p>
              <div className="w-20 h-20 mx-auto rounded-full bg-gray-800 flex items-center justify-center">
                <CameraOff className="h-8 w-8 text-gray-500" />
              </div>
            </div>
          )}
        </div>
        <div className="p-3 flex justify-center gap-3">
          <Button
            variant="outline"
            size="icon"
            className={`rounded-full ${isMicOn ? "bg-gray-700 hover:bg-gray-600" : "bg-red-600 hover:bg-red-700"} border-0`}
            onClick={toggleMic}
          >
            <Mic className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className={`rounded-full ${isCameraOn ? "bg-gray-700 hover:bg-gray-600" : "bg-red-600 hover:bg-red-700"} border-0`}
            onClick={toggleCamera}
          >
            <Camera className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <Input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-4 bg-gray-800 border-gray-700 text-white"
      />

      <div className="grid grid-cols-2 gap-4 mb-4">
        <Button
          onClick={handleStartMeeting}
          className="w-full bg-gray-800 hover:bg-gray-700 text-white"
        >
          New meeting
        </Button>
        <Button
          onClick={handleJoinMeeting}
          className="w-full bg-white hover:bg-gray-200 text-gray-900"
        >
          Join meeting
        </Button>
      </div>

      {meetingUrl && (
        <>
          <div className="relative mb-4">
            <Input
              type="text"
              value={window.location.origin + meetingUrl}
              readOnly
              className="pr-10 bg-gray-800 border-gray-700 text-white"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
              onClick={copyMeetingLink}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>

          <Button
            onClick={startActualMeeting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Start meeting
          </Button>
        </>
      )}
    </div>
  );
};

export default StartMeeting;
