import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Connect to the backend
    const rawUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    // Remove trailing slash if present to avoid //socket.io/ double slash issues
    const socketUrl = rawUrl.endsWith('/') ? rawUrl.slice(0, -1) : rawUrl;

    const newSocket = io(socketUrl, {
      transports: ['websocket'], // Force websocket to avoid polling issues
      withCredentials: true,
    });

    newSocket.on('connect', () => {
      console.log('Socket connected:', newSocket.id);
    });

    newSocket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
