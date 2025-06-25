import { cn } from "@/lib/utils";
import { useRef, useState, type FC } from "react";

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

const Chat: FC = () => {
  const initialMessages: ChatMessage[] = [
    {
      role: "assistant",
      content: "Hello, how can I help you today?"
    }
  ]
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const inputRef = useRef<HTMLInputElement>(null);
  const logSubmit = () => {
    console.log("inputRef.current.value", inputRef.current?.value);
  }
  const handleSubmit = async () => {
    console.log("handleSubmit. Value: ", inputRef.current?.value);
    if (inputRef.current) {
      setMessages([...messages, { role: "user", content: inputRef.current.value }]);
      setMessages([...messages, { role: "assistant", content: "Getting response..." }]);
      try {
        const response = await fetch("/api/generate", {
          method: "POST",
          body: JSON.stringify({ input: inputRef.current.value })
        });
        const data = await response.json();
        if(!response.ok){
          throw new Error(data.details);
        }
        const oldMessages = messages;
        oldMessages.pop();
        setMessages([...oldMessages, { role: "assistant", content: data.toString() }]);
      } catch (error) {
        console.error(error);
        const oldMessages = messages;
        oldMessages.pop();
        setMessages([...oldMessages, { role: "assistant", content: "Error generating response" }]);
      } finally {
        inputRef.current.value = "";
      }
    }
  }
  
  return (
  <div className="border-gray-400 rounded-b-md text-gray-900 px-4 py-2 w-full h-[400px] relative">
    <div className="flex flex-col gap-2 absolute top-0 left-0 w-full h-full overflow-y-auto py-4">
      {messages.map((message, index) => (
        <div key={index} className={cn("w-2/3", message.role === "user" ? "self-end" : "self-start")}>
          <div className={cn("bg-gray-200 rounded-md p-2", message.role === "user" ? "bg-blue-200" : "bg-gray-200")}>
            {message.content}
          </div>
        </div>
      ))}
      </div>
      <div className="absolute bottom-0 left-0 w-full h-10 flex flex-row gap-2">
        <input type="text" className="w-full h-full" ref={inputRef} />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleSubmit}>Send</button>
      </div>
  </div>);
};

export default Chat;