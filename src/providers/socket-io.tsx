"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { io, Socket } from "socket.io-client"
import type { ConnectedClient, SocketActivity } from "../lib/types"

const api = import.meta.env.VITE_SOCKET_IO

const socketOptions = {
    autoConnect: false,
    reconnection: true,
    reconnectionAttempts: 20,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    timeout: 10000,
    transports: ["websocket"],
    withCredentials: false,
}

const websiteSocket: Socket = io(api, socketOptions)
export { websiteSocket }

interface WebsiteSocketContextType {
    websiteSocket: Socket
    clients: ConnectedClient[]
}

const WebsiteSocketContext = createContext<WebsiteSocketContextType | null>(null)

export const WebsiteSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [siteStats, setSiteStats] = useState<{
        clients: ConnectedClient[]
    }>({
        clients: []
    })
    const [_activityLog, setActivityLog] = useState<SocketActivity[]>([])
    const [_responseTime, setResponseTime] = useState<number | null>(null)

    const connectAsWebsite = () => {
        const payload = {
            name: "Website",
            websiteID: "00000",
            version: "Public",
            source: "web-client",
            connectedAt: new Date(),
        }
        websiteSocket.emit("joinMainLobby", payload)
        console.log("🌐 Connected as Website Client:", payload)
    }

    useEffect(() => {
        if (websiteSocket.connected) return
        websiteSocket.connect()

        websiteSocket.on("connect", () => {
            console.log("✅ Website socket connected.")
            connectAsWebsite()
        })

        websiteSocket.on("disconnect", () => {
            console.warn("❌ Website socket disconnected.")
        })

        websiteSocket.on("updateConnectedClients", (clients: ConnectedClient[]) => {
            const filtered = clients.filter((c) => c.name && c.websiteID)
            console.log('🌍 Updated site visitors:', filtered)
            setSiteStats((prev) => ({ ...prev, clients: filtered }))
        })

        websiteSocket.on("activityLogUpdate", (log: SocketActivity[]) => {
            setActivityLog(log)
        })

        const pingInterval = setInterval(() => {
            const start = Date.now()
            websiteSocket.emit("client_ping", start)
        }, 5000)

        websiteSocket.on("server_pong", (start: number) => {
            const rtt = Date.now() - start
            setResponseTime(rtt)
        })

        return () => {
            websiteSocket.off("connect")
            websiteSocket.off("disconnect")
            websiteSocket.off("updateConnectedClients")
            websiteSocket.off("activityLogUpdate")
            websiteSocket.off("updateSiteStats")
            websiteSocket.off("server_pong")
            clearInterval(pingInterval)
            websiteSocket.disconnect()
        }
    }, [])

    const value = {
        websiteSocket,
        clients: siteStats.clients,
    }

    return <WebsiteSocketContext.Provider value={value}>{children}</WebsiteSocketContext.Provider>
}

export const useWebsiteSocket = () => {
    const ctx = useContext(WebsiteSocketContext)
    if (!ctx) throw new Error("useWebsiteSocket must be used within WebsiteSocketProvider")
    return ctx
}