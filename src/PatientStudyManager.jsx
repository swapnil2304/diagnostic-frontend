import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

export default function PatientStudyManager() {
  return (
    <div className="p-4 bg-black text-white min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Patient & Study Management</h1>
        <Button variant="secondary" className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add New Study
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <Input placeholder="Search by Patient Name" />
          <Input placeholder="Search by Study ID" />
          <Input placeholder="Modality (e.g. PET, CT)" />
        </div>

        <Card className="bg-gray-900">
          <CardContent className="p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-white">Patient</TableHead>
                  <TableHead className="text-white">Study ID</TableHead>
                  <TableHead className="text-white">Modality</TableHead>
                  <TableHead className="text-white">Date</TableHead>
                  <TableHead className="text-white">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>John Doe</TableCell>
                  <TableCell>ST12345</TableCell>
                  <TableCell>PET/CT</TableCell>
                  <TableCell>2025-04-07</TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">Open</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
