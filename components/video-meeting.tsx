"use client";

import { useState, useEffect } from "react";
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff, 
  MessageSquare, 
  FileText, 
  Settings,
  Share,
  Users,
  Clock,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

interface VideoMeetingProps {
  isOpen: boolean;
  onClose: () => void;
  patientName: string;
  appointmentTime: string;
}

export function VideoMeeting({ isOpen, onClose, patientName, appointmentTime }: VideoMeetingProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [meetingDuration, setMeetingDuration] = useState(0);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: "Dr. Smith", message: "Hello! How are you feeling today?", time: "10:00 AM" },
    { id: 2, sender: patientName, message: "Much better, thank you!", time: "10:01 AM" }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [notes, setNotes] = useState("");

  // Simulate meeting timer
  useEffect(() => {
    if (isOpen) {
      const timer = setInterval(() => {
        setMeetingDuration(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isOpen]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages(prev => [...prev, {
        id: prev.length + 1,
        sender: "Dr. Smith",
        message: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setNewMessage("");
    }
  };

  const handleEndCall = () => {
    // Mock saving notes and ending call
    if (notes) {
      alert(`Meeting notes saved:\n\n${notes}`);
    }
    alert(`Video call with ${patientName} ended.\nDuration: ${formatDuration(meetingDuration)}`);
    setMeetingDuration(0);
    setNotes("");
    setChatMessages([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span className="font-medium">{patientName}</span>
          </div>
          <div className="flex items-center space-x-2 text-green-400">
            <Clock className="h-4 w-4" />
            <span className="text-sm">{formatDuration(meetingDuration)}</span>
          </div>
          {isRecording && (
            <div className="flex items-center space-x-2 text-red-400">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm">Recording</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-400">Appointment: {appointmentTime}</span>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Main Video Area */}
        <div className="flex-1 flex flex-col bg-gray-900 relative">
          {/* Patient Video (large) */}
          <div className="flex-1 bg-gray-800 flex items-center justify-center relative">
            {isVideoOff ? (
              <div className="text-center text-white">
                <div className="w-32 h-32 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">{patientName.charAt(0)}</span>
                </div>
                <p className="text-lg">{patientName}</p>
                <p className="text-sm text-gray-400">Video is off</p>
              </div>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl">{patientName.charAt(0)}</span>
                  </div>
                  <p className="text-lg">{patientName}</p>
                </div>
              </div>
            )}

            {/* Doctor Video (small, bottom right) */}
            <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-700 rounded-lg border-2 border-gray-600 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-lg">DS</span>
                </div>
                <p className="text-sm">Dr. Smith (You)</p>
              </div>
            </div>
          </div>

          {/* Control Bar */}
          <div className="bg-gray-900 p-6 flex items-center justify-center space-x-4">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-4 rounded-full transition-colors ${
                isMuted ? "bg-red-600 hover:bg-red-700" : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              {isMuted ? <MicOff className="h-6 w-6 text-white" /> : <Mic className="h-6 w-6 text-white" />}
            </button>

            <button
              onClick={() => setIsVideoOff(!isVideoOff)}
              className={`p-4 rounded-full transition-colors ${
                isVideoOff ? "bg-red-600 hover:bg-red-700" : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              {isVideoOff ? <VideoOff className="h-6 w-6 text-white" /> : <Video className="h-6 w-6 text-white" />}
            </button>

            <button
              onClick={() => setIsRecording(!isRecording)}
              className={`p-4 rounded-full transition-colors ${
                isRecording ? "bg-red-600 hover:bg-red-700" : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              <div className={`w-6 h-6 rounded-full ${isRecording ? "bg-white" : "bg-red-500"}`}></div>
            </button>

            <button className="p-4 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors">
              <Share className="h-6 w-6 text-white" />
            </button>

            <button
              onClick={() => setShowChat(!showChat)}
              className={`p-4 rounded-full transition-colors ${
                showChat ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              <MessageSquare className="h-6 w-6 text-white" />
            </button>

            <button
              onClick={() => setShowNotes(!showNotes)}
              className={`p-4 rounded-full transition-colors ${
                showNotes ? "bg-green-600 hover:bg-green-700" : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              <FileText className="h-6 w-6 text-white" />
            </button>

            <button
              onClick={handleEndCall}
              className="p-4 rounded-full bg-red-600 hover:bg-red-700 transition-colors"
            >
              <PhoneOff className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>

        {/* Side Panel */}
        {(showChat || showNotes) && (
          <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
            {/* Panel Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setShowChat(true)}
                className={`flex-1 px-4 py-3 text-sm font-medium ${
                  showChat ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Chat
              </button>
              <button
                onClick={() => setShowNotes(true)}
                className={`flex-1 px-4 py-3 text-sm font-medium ${
                  showNotes && !showChat ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Notes
              </button>
            </div>

            {/* Chat Panel */}
            {showChat && (
              <div className="flex-1 flex flex-col">
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chatMessages.map(msg => (
                    <div key={msg.id} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900">{msg.sender}</span>
                        <span className="text-xs text-gray-500">{msg.time}</span>
                      </div>
                      <div className={`p-3 rounded-lg text-sm ${
                        msg.sender === "Dr. Smith" 
                          ? "bg-blue-100 text-blue-900 ml-0 mr-8" 
                          : "bg-gray-100 text-gray-900 ml-8 mr-0"
                      }`}>
                        {msg.message}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-4 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type a message..."
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <Button
                      onClick={handleSendMessage}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm rounded-lg"
                    >
                      Send
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Notes Panel */}
            {showNotes && !showChat && (
              <div className="flex-1 flex flex-col p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Meeting Notes</h3>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add your consultation notes here..."
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                />
                <Button
                  onClick={() => alert("Notes saved successfully!")}
                  className="mt-4 bg-green-600 hover:bg-green-700 text-white"
                >
                  Save Notes
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
