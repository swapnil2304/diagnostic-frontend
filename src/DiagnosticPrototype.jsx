import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Bell } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import PatientStudyManager from "@/PatientStudyManager";


// Inside your component render:
<TabsContent value="diagnostic">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="grid grid-cols-1 lg:grid-cols-2 gap-4"
  >
    <Card className="bg-gray-900">
      <CardContent className="p-4">
        <h2 className="text-xl font-semibold mb-2">DICOM Viewer</h2>
        {/* Use the enhanced DICOM viewer here, passing a sample image ID */}
        <EnhancedDicomViewer imageId="wadouri:http://localhost:8042/wado?objectUID=1.2.3.4.5" />
        <div className="text-sm text-gray-400 mt-2">
          Zoom | Pan | Measure | Window/Level Adjustments
        </div>
      </CardContent>
    </Card>
    {/* Other UI components as needed */}
  </motion.div>
</TabsContent>


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

      <Tabs defaultValue="diagnostic" className="mb-4">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="signed">Signed Off</TabsTrigger>
          <TabsTrigger value="urgent">Urgent</TabsTrigger>
          <TabsTrigger value="triage">Triage</TabsTrigger>
          <TabsTrigger value="admin">Admin</TabsTrigger>
          <TabsTrigger value="peer">Peer Review</TabsTrigger>
          <TabsTrigger value="diagnostic">Diagnostic</TabsTrigger>
          <TabsTrigger value="patientStudies">Patient Studies</TabsTrigger>
          <TabsTrigger value="notify">Notifications</TabsTrigger>
        </TabsList>
        {/* Diagnostic Tab */}      
        <TabsContent value="diagnostic">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-4"
          >
            <Card className="bg-gray-900">
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold mb-2">DICOM Viewer</h2>
                <div className="h-64 bg-gray-800 rounded-lg mb-2 flex items-center justify-center text-gray-400">
                  [DICOM Images Here]
                </div>
                <div className="text-sm text-gray-400">Zoom | Pan | Measure | Fusion</div>
              </CardContent>
            </Card>
             <Card className="bg-gray-900">
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold mb-2">AI Findings</h2>
                <div className="text-sm text-gray-300 mb-2">
                  <p>Lesion Detected: <strong>Yes</strong></p>
                  <p>Risk: <span className="text-red-400">High</span></p>
                  <p>SUVmax: 12.5</p>
                  <p>Volume: 3.2 cm³</p>
                </div>
                <div className="flex items-center text-yellow-300">
                  <AlertCircle className="w-4 h-4 mr-2" /> AI Suggests Immediate Review
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 lg:col-span-2">
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold mb-2">Structured Reporting</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <Input placeholder="Patient Name: John Doe" />
                  <Input placeholder="Study: PET/CT" />
                  <Input placeholder="Date: 2025-04-07" />
                </div>
                <Textarea className="mb-2" rows={6} placeholder="Findings: ..." />
                <Textarea className="mb-4" rows={3} placeholder="Impression: ..." />
                <Button>Finalize Report</Button>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
        {/* Patient Studies Tab */}
        <TabsContent value="patientStudies">
          <PatientStudyManager />
        </TabsContent>
        {/* Notifications Tab */}
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
