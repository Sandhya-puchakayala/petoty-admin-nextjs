"use client";

import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const data = [
  { date: "15 Feb", current: 400, previous: 240 },
  { date: "22 Feb", current: 300, previous: 139 },
  { date: "01 Mar", current: 600, previous: 980 },
  { date: "08 Mar", current: 800, previous: 390 },
  { date: "17 Mar", current: 500, previous: 480 },
];

export function SalesChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="bg-card w-full max-w-full overflow-hidden p-6 rounded-xl shadow-petoty border border-border"
    >
      <h4 className="text-sm font-semibold mb-6 text-foreground">Total Sales Over Time</h4>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(30, 20%, 88%)" />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#94A3B8" }}
              dy={10}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                fontFamily: "Outfit",
              }}
            />
            <Line
              type="monotone"
              dataKey="current"
              stroke="#6B1A3A"
              strokeWidth={3}
              dot={{ r: 4, fill: "#6B1A3A" }}
              activeDot={{ r: 6 }}
              name="Current Period"
            />
            <Line
              type="monotone"
              dataKey="previous"
              stroke="#6B1A3A"
              strokeWidth={2}
              strokeDasharray="5 5"
              opacity={0.3}
              dot={false}
              name="Previous Period"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
