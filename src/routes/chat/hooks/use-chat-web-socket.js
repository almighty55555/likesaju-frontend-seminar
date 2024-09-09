import useWebSocket from 'react-use-websocket';
import { useRef, useEffect, useState } from 'react';
import { getChatRoomList, getMessageList } from 'apis/api';

const useChatWebSocket = () => {
  const [messageList, setMessageList] = useState([]);
  const [chatRoomId, setChatRoomId] = useState(null);
  const [chatRoomList, setChatRoomList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      if (chatRoomId !== null) {
        const data = await getMessageList(chatRoomId);
        setMessageList(Array.isArray(data) ? data : []);
      }
    };
    fetchData();
  }, [chatRoomId]);

const socketUrl = 'ws://4.217.234.118:8000';

  const [reconnectionAttempt, setReconnectionAttempt] = useState(0);
  const maxConnectionAttempts = 4;
  const isWebSocketConnected = useRef(false);

  const { sendJsonMessage, getWebSocket } = useWebSocket(socketUrl, {
    onOpen: async () => {
      try {
        const data = await getChatRoomList();
        setChatRoomList(data ? data : []);
        console.log('Connected!!!');
      } catch (error) {
        console.log(error);
      }
    },
    onClose: (event) => {
      if (event.code === 4001) {
        console.log('Authentication Error');
      }
      console.log('Close');
      setReconnectionAttempt((prevAttempt) => prevAttempt + 1);
    },
    onError: () => {
      console.log('Error!');
    },
    onMessage: async (msg) => {
      const data = JSON.parse(msg.data);
      setChatRoomId(data.chatroom);
      if (
        chatRoomList.filter((chatRoom) => chatRoom.id === chatRoomId).length ===
        0
      ) {
        const data = await getChatRoomList();
        setChatRoomList(data ? data : []);
      }
      if (data.chatroom === chatRoomId) {
        setMessageList((prev_msg) => [
          ...prev_msg,
          {
            id: data.id,
            sender: data.sender,
            chatroom: data.chatroom,
            content: data.content,
            timestamp: data.timestamp,
          },
        ]);
      }

      setChatRoomList((prevChatRoomList) =>
        prevChatRoomList.map((chatRoom) =>
          chatRoom.id === chatRoomId
            ? { ...chatRoom, last_message: data.content }
            : chatRoom,
        ),
      );
    },
    shouldReconnect: (closeEvent) => {
      if (
        closeEvent.code === 4001 &&
        reconnectionAttempt >= maxConnectionAttempts
      ) {
        setReconnectionAttempt(0);
        return false;
      }
      return true;
    },
    reconnectInterval: 1000,
    share: true,
  });

  useEffect(() => {
    if (isWebSocketConnected.current) return;
    isWebSocketConnected.current = true;
    return () => {
      const webSocketInstance = getWebSocket();
      if (webSocketInstance) {
        webSocketInstance.close();
      }
      isWebSocketConnected.current = false;
    };
  }, [getWebSocket]);

  return {
    messageList,
    setMessageList,
    chatRoomId,
    setChatRoomId,
    chatRoomList,
    setChatRoomList,
    sendJsonMessage,
  };
};
export default useChatWebSocket;
