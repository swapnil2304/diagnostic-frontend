import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Bell } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function DiagnosticPrototype() {
  const [notifications, setNotifications] = useState([]);
  const [wsError, setWsError] = useState(null);

  useEffect(() => {
    const wsUrl = import.meta.env.VITE_WS_URL || "ws://localhost:8000/ws/notifications";
    let socket;
    try {
      socket = new WebSocket(wsUrl);

      socket.onmessage = (event) => {
        try {
          const newNotification = JSON.parse(event.data);
          if (newNotification?.message) {
            setNotifications((prev) => [newNotification.message, ...prev]);
          }
        } catch (err) {
          console.error("Failed to parse WebSocket message:", err);
        }
      };

      socket.onerror = (err) => {
        console.error("WebSocket error:", err);
        setWsError("Connection error: Check if WebSocket server is running.");
      };
    } catch (connectionError) {
      console.error("WebSocket initialization failed:", connectionError);
      setWsError("WebSocket failed to initialize.");
    }

    return () => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, []);

  return (
    <div className="p-4 bg-black text-white min-h-screen">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Diagnostic Workstation</h1>
        <div className="space-x-2 flex items-center">
          <Button variant="secondary">Settings</Button>
          <Button variant="secondary">Logout</Button>
          <div className="relative">
            <Bell className="w-5 h-5 text-white" />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-600 text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {notifications.length}
              </span>
            )}
          </div>
        </div>
      </header>

      {wsError && (
        <div className="mb-4 p-3 rounded bg-red-800 text-white text-sm">
          {wsError}
        </div>
      )}

      <Tabs defaultValue="all" className="mb-4">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="signed">Signed Off</TabsTrigger>
          <TabsTrigger value="urgent">Urgent</TabsTrigger>
          <TabsTrigger value="triage">Triage</TabsTrigger>
          <TabsTrigger value="admin">Admin</TabsTrigger>
          <TabsTrigger value="peer">Peer Review</TabsTrigger>
          <TabsTrigger value="notify">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="notify">
          <Card className="bg-gray-900 mt-4">
            <CardContent className="p-4 space-y-3">
              <h2 className="text-xl font-semibold mb-2">Notifications</h2>
              {notifications.length === 0 ? (
                <p className="text-gray-400">No new notifications.</p>
              ) : (
                notifications.map((note, idx) => (
                  <div key={idx} className="bg-gray-800 p-2 rounded text-sm text-gray-200">
                    {note}
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
