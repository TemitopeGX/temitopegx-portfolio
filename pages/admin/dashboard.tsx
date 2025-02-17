import { withAuth } from "@/components/withAuth";
import Layout from "@/components/Layout";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxOpen,
  faProjectDiagram,
  faChartLine,
  faUsers,
  faBell,
  faCalendarAlt,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import AdminNav from "@/components/AdminNav";
import { useState, useEffect } from "react";
import { ResponsiveLine } from "@nivo/line";
import { ResponsivePie } from "@nivo/pie";
import Calendar from "react-calendar";
import { format } from "date-fns";
import "react-calendar/dist/Calendar.css";
import type { Value } from "react-calendar/dist/cjs/shared/types";

interface DashboardStats {
  totalProjects: number;
  totalProducts: number;
  recentVisitors: number;
  totalSales: number;
}

interface Notification {
  id: number;
  message: string;
  time: string;
  type: "info" | "success" | "warning";
}

interface RecentActivity {
  id: number;
  action: string;
  user: string;
  time: string;
  icon: any;
}

// Add new interfaces for charts
interface VisitorData {
  id: string;
  data: Array<{ x: string; y: number }>;
}

interface ProjectDistribution {
  id: string;
  label: string;
  value: number;
  color: string;
}

function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<DashboardStats>({
    totalProjects: 0,
    totalProducts: 0,
    recentVisitors: 0,
    totalSales: 0,
  });

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      message: "New order received",
      time: "2 minutes ago",
      type: "success",
    },
    {
      id: 2,
      message: "Server load high",
      time: "5 minutes ago",
      type: "warning",
    },
    {
      id: 3,
      message: "New user registered",
      time: "1 hour ago",
      type: "info",
    },
  ]);

  const recentActivities: RecentActivity[] = [
    {
      id: 1,
      action: "Added new project",
      user: "You",
      time: "2 minutes ago",
      icon: faProjectDiagram,
    },
    {
      id: 2,
      action: "Updated product price",
      user: "You",
      time: "1 hour ago",
      icon: faBoxOpen,
    },
    {
      id: 3,
      action: "Received new message",
      user: "System",
      time: "2 hours ago",
      icon: faEnvelope,
    },
  ];

  const [selectedDate, setSelectedDate] = useState<Value>(new Date());
  const [visitorData, setVisitorData] = useState<VisitorData[]>([]);
  const [projectDistribution, setProjectDistribution] = useState<
    ProjectDistribution[]
  >([]);
  const [events, setEvents] = useState<{ [key: string]: string[] }>({});

  useEffect(() => {
    // Fetch dashboard stats
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch("/api/dashboard/stats");

        if (!response.ok) {
          throw new Error("Failed to fetch stats");
        }

        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
        setError("Failed to load dashboard data");
        setStats({
          totalProjects: 0,
          totalProducts: 0,
          recentVisitors: 0,
          totalSales: 0,
        });
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch visitor data for chart
    const fetchVisitorData = async () => {
      try {
        // Simulated data - replace with actual API call
        setVisitorData([
          {
            id: "visitors",
            data: [
              { x: "Mon", y: 200 },
              { x: "Tue", y: 300 },
              { x: "Wed", y: 400 },
              { x: "Thu", y: 350 },
              { x: "Fri", y: 500 },
              { x: "Sat", y: 450 },
              { x: "Sun", y: 400 },
            ],
          },
        ]);
      } catch (error) {
        console.error("Error fetching visitor data:", error);
      }
    };

    // Fetch project distribution data
    const fetchProjectDistribution = async () => {
      try {
        // Simulated data - replace with actual API call
        setProjectDistribution([
          { id: "web", label: "Web Development", value: 40, color: "#39FF14" },
          { id: "mobile", label: "Mobile Apps", value: 30, color: "#FF39A8" },
          { id: "design", label: "Design", value: 20, color: "#3982FF" },
          { id: "other", label: "Other", value: 10, color: "#FFB039" },
        ]);
      } catch (error) {
        console.error("Error fetching project distribution:", error);
      }
    };

    // Fetch calendar events
    const fetchEvents = async () => {
      try {
        // Simulated data - replace with actual API call
        setEvents({
          [format(new Date(), "yyyy-MM-dd")]: [
            "Project deadline",
            "Team meeting",
          ],
          [format(new Date(Date.now() + 86400000), "yyyy-MM-dd")]: [
            "Product launch",
          ],
        });
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchStats();
    fetchVisitorData();
    fetchProjectDistribution();
    fetchEvents();

    // Set up real-time updates
    const interval = setInterval(fetchStats, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Helper function to safely format dates
  const formatDate = (date: Value, formatString: string) => {
    if (date instanceof Date) {
      return format(date, formatString);
    }
    return format(new Date(), formatString);
  };

  if (error) {
    return (
      <Layout>
        <AdminNav />
        <div className="min-h-screen bg-dark">
          <div className="max-w-7xl mx-auto p-6">
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-500">
              {error}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <AdminNav />
      <div className="min-h-screen bg-dark">
        <div className="max-w-7xl mx-auto p-6">
          {/* Welcome Section */}
          <div className="bg-dark-200 rounded-xl p-8 mb-8 border border-neon-green/10">
            <h1 className="text-4xl font-bold mb-4">
              Welcome to your <span className="text-neon-green">Dashboard</span>
            </h1>
            <p className="text-gray-400">
              {isLoading
                ? "Loading dashboard data..."
                : "Here's what's happening with your portfolio today."}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-dark-200 rounded-xl p-6 border border-neon-green/10 hover:border-neon-green/30 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-neon-green/10 p-3 rounded-lg">
                  <FontAwesomeIcon
                    icon={faProjectDiagram}
                    className={`text-neon-green text-xl ${
                      isLoading ? "animate-pulse" : ""
                    }`}
                  />
                </div>
                <span className="text-xs text-gray-400">vs last month</span>
              </div>
              <h3 className="text-2xl font-bold mb-1">
                {isLoading ? "..." : stats.totalProjects}
              </h3>
              <p className="text-gray-400 text-sm">Total Projects</p>
            </div>

            <div className="bg-dark-200 rounded-xl p-6 border border-neon-green/10 hover:border-neon-green/30 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-purple-500/10 p-3 rounded-lg">
                  <FontAwesomeIcon
                    icon={faBoxOpen}
                    className={`text-purple-500 text-xl ${
                      isLoading ? "animate-pulse" : ""
                    }`}
                  />
                </div>
                <span className="text-xs text-gray-400">vs last month</span>
              </div>
              <h3 className="text-2xl font-bold mb-1">
                {isLoading ? "..." : stats.totalProducts}
              </h3>
              <p className="text-gray-400 text-sm">Total Products</p>
            </div>

            <div className="bg-dark-200 rounded-xl p-6 border border-neon-green/10 hover:border-neon-green/30 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-500/10 p-3 rounded-lg">
                  <FontAwesomeIcon
                    icon={faUsers}
                    className={`text-blue-500 text-xl ${
                      isLoading ? "animate-pulse" : ""
                    }`}
                  />
                </div>
                <span className="text-xs text-gray-400">Last 7 days</span>
              </div>
              <h3 className="text-2xl font-bold mb-1">
                {isLoading ? "..." : stats.recentVisitors.toLocaleString()}
              </h3>
              <p className="text-gray-400 text-sm">Recent Visitors</p>
            </div>

            <div className="bg-dark-200 rounded-xl p-6 border border-neon-green/10 hover:border-neon-green/30 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-yellow-500/10 p-3 rounded-lg">
                  <FontAwesomeIcon
                    icon={faChartLine}
                    className={`text-yellow-500 text-xl ${
                      isLoading ? "animate-pulse" : ""
                    }`}
                  />
                </div>
                <span className="text-xs text-gray-400">This month</span>
              </div>
              <h3 className="text-2xl font-bold mb-1">
                ₦{isLoading ? "..." : stats.totalSales.toLocaleString()}
              </h3>
              <p className="text-gray-400 text-sm">Total Sales</p>
            </div>
          </div>

          {/* Charts and Calendar Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Visitor Chart */}
            <div className="bg-dark-200 rounded-xl p-6 border border-neon-green/10">
              <h2 className="text-xl font-bold mb-4">Visitor Traffic</h2>
              <div className="h-80">
                <ResponsiveLine
                  data={visitorData}
                  margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
                  xScale={{ type: "point" }}
                  yScale={{ type: "linear", min: "auto", max: "auto" }}
                  curve="cardinal"
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                  }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                  }}
                  pointSize={10}
                  pointColor="#39FF14"
                  pointBorderWidth={2}
                  pointBorderColor={{ from: "serieColor" }}
                  pointLabelYOffset={-12}
                  useMesh={true}
                  theme={{
                    axis: { ticks: { text: { fill: "#9CA3AF" } } },
                    grid: { line: { stroke: "#374151", strokeWidth: 1 } },
                    crosshair: { line: { stroke: "#39FF14" } },
                  }}
                />
              </div>
            </div>

            {/* Project Distribution */}
            <div className="bg-dark-200 rounded-xl p-6 border border-neon-green/10">
              <h2 className="text-xl font-bold mb-4">Project Distribution</h2>
              <div className="h-80">
                <ResponsivePie
                  data={projectDistribution}
                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                  innerRadius={0.5}
                  padAngle={0.7}
                  cornerRadius={3}
                  activeOuterRadiusOffset={8}
                  colors={{ datum: "data.color" }}
                  borderWidth={1}
                  borderColor={{ theme: "background" }}
                  theme={{
                    labels: { text: { fill: "#FFFFFF" } },
                    legends: { text: { fill: "#9CA3AF" } },
                  }}
                  legends={[
                    {
                      anchor: "bottom",
                      direction: "row",
                      translateY: 30,
                      itemWidth: 100,
                      itemHeight: 20,
                      symbolSize: 12,
                    },
                  ]}
                />
              </div>
            </div>
          </div>

          {/* Calendar Section */}
          <div className="bg-dark-200 rounded-xl p-6 border border-neon-green/10">
            <h2 className="text-xl font-bold mb-4">Calendar</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                className="bg-dark-300 border-neon-green/10 rounded-xl p-4"
                tileClassName="text-gray-300 hover:bg-neon-green/10"
                tileContent={({ date }) => {
                  const formattedDate = format(date, "yyyy-MM-dd");
                  const dayEvents = events[formattedDate];
                  return dayEvents?.length ? (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-neon-green/50 rounded-full"></div>
                  ) : null;
                }}
              />
              <div>
                <h3 className="text-lg font-bold mb-4">
                  Events for {formatDate(selectedDate, "MMMM d, yyyy")}
                </h3>
                <div className="space-y-2">
                  {events[formatDate(selectedDate, "yyyy-MM-dd")]?.map(
                    (event, index) => (
                      <div
                        key={index}
                        className="bg-dark-300 p-3 rounded-lg text-gray-300"
                      >
                        {event}
                      </div>
                    )
                  ) || <p className="text-gray-400">No events scheduled</p>}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Actions */}
            <div className="bg-dark-200 rounded-xl p-6 border border-neon-green/10">
              <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                <Link
                  href="/admin/projects"
                  className="bg-dark-300 p-4 rounded-lg hover:bg-dark-400 transition-colors group"
                >
                  <FontAwesomeIcon
                    icon={faProjectDiagram}
                    className="text-2xl text-neon-green mb-2"
                  />
                  <p className="text-sm text-gray-400 group-hover:text-white transition-colors">
                    Add Project
                  </p>
                </Link>
                <Link
                  href="/admin/products"
                  className="bg-dark-300 p-4 rounded-lg hover:bg-dark-400 transition-colors group"
                >
                  <FontAwesomeIcon
                    icon={faBoxOpen}
                    className="text-2xl text-purple-500 mb-2"
                  />
                  <p className="text-sm text-gray-400 group-hover:text-white transition-colors">
                    Add Product
                  </p>
                </Link>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-dark-200 rounded-xl p-6 border border-neon-green/10">
              <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 text-sm"
                  >
                    <div className="bg-dark-300 p-2 rounded-lg">
                      <FontAwesomeIcon
                        icon={activity.icon}
                        className="text-neon-green"
                      />
                    </div>
                    <div>
                      <p className="text-gray-300">{activity.action}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span>{activity.user}</span>
                        <span>•</span>
                        <span>{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-dark-200 rounded-xl p-6 border border-neon-green/10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Notifications</h2>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faBell}
                    className="text-gray-400 hover:text-neon-green cursor-pointer transition-colors"
                  />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </div>
              </div>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="flex items-start gap-3 text-sm"
                  >
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        notification.type === "success"
                          ? "bg-green-500"
                          : notification.type === "warning"
                          ? "bg-yellow-500"
                          : "bg-blue-500"
                      }`}
                    ></div>
                    <div>
                      <p className="text-gray-300">{notification.message}</p>
                      <span className="text-xs text-gray-400">
                        {notification.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default withAuth(AdminDashboard);
