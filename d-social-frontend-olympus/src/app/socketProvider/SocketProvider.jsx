'use client'

import { host } from '@/environment';
import React, { createContext, useMemo, useContext } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext(null);

export const useSocket = () => {
   const socket = useContext(SocketContext);
   return socket;
};

export const SocketProvider = (props) => {
   const socket = useMemo(() => io(host), []);

   return <SocketContext.Provider value={socket}>{props.children}</SocketContext.Provider>;
};
