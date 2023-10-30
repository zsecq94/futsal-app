import { BASE_URL } from "@/services/config";
import { createContext } from "react";
import io from "socket.io-client";

export const socket = io(BASE_URL);
export const Socketcontext = createContext(socket);
