import { useParams } from "react-router-dom";
import { useState } from "react";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([{ text: "Hello" }]);
  return (
    <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-400">Chat</h1>
      <div className="flex-1 overflow-scroll p-5">
        {messages.map((msg, index) => {
          return (
            <div key={index} className="chat chat-start">
              <div className="chat-header">
                Obi-Wan Kenobi
                <time className="text-xs opacity-50">12:45</time>
              </div>
              <div className="chat-bubble">You were the Chosen One!</div>
              <div className="chat-footer opacity-50">Delivered</div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center p-5 border-t border-gray-400 gap-2">
        <input
          type="text"
          placeholder="Type your message here..."
          className=" p-3 border border-gray-400 rounded-lg flex-1 text-white"
        />
        <button className="bg-teal-400 text-white rounded-md px-7 py-3">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
