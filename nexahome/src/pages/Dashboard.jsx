import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Zap,
  Wifi,
  Clock,
  Activity,
  Lock,
  Lightbulb,
  Wind,
  Warehouse,
  ChevronRight
} from 'lucide-react';
import api from '../api/axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const [devices, setDevices] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [togglingDevice, setTogglingDevice] = useState(null);

  useEffect(() => {
    fetchDashboardData();
    // Auto-refresh every 5 seconds
    const interval = setInterval(fetchDashboardData, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [devicesRes, schedulesRes, logsRes] = await Promise.all([
        api.get('/devices'),
        api.get('/schedules'),
        api.get('/logs')
      ]);

      setDevices(devicesRes.data.data || []);
      setSchedules(schedulesRes.data.data || []);
      setLogs(logsRes.data.data || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleDevice = async (deviceId, currentState) => {
    setTogglingDevice(deviceId);
    try {
      // currentState can be boolean (true/false) or string ('on'/'off')
      const isCurrentlyOn = currentState === true || currentState === 'on' || currentState === 'ON';
      const newState = !isCurrentlyOn;
      await api.put(`/devices/${deviceId}/toggle`, { state: newState });
      // Refresh data immediately
      fetchDashboardData();
    } catch (error) {
      console.error('Error toggling device:', error);
    } finally {
      setTogglingDevice(null);
    }
  };

  // Calculate metrics
  const onlineCount = devices.filter(d => d.state === true || d.state === 'on' || d.state === 'ON').length;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const eventsToday = logs.filter(log => {
    const logDate = new Date(log.created_at);
    logDate.setHours(0, 0, 0, 0);
    return logDate.getTime() === today.getTime();
  }).length;
  
  const eventsYesterday = logs.filter(log => {
    const logDate = new Date(log.created_at);
    logDate.setHours(0, 0, 0, 0);
    return logDate.getTime() === yesterday.getTime();
  }).length;
  
  const eventPercentageChange = eventsYesterday === 0 ? 100 : Math.round(((eventsToday - eventsYesterday) / eventsYesterday) * 100);
  
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const devicesAddedThisWeek = devices.filter(d => new Date(d.created_at) >= weekAgo).length;
  
  const activeSchedules = schedules.filter(s => s.is_active || s.active).length;

  const stats = [
    {
      label: 'Total Devices',
      value: devices.length.toString(),
      subtext: `+${devicesAddedThisWeek} this week`,
      icon: Zap,
      bgColor: 'bg-gradient-to-br from-slate-900/50 to-slate-950/50',
      iconColor: 'text-cyan-500'
    },
    {
      label: 'Online',
      value: onlineCount.toString(),
      subtext: devices.length === 0 ? 'No devices' : `${Math.round((onlineCount / devices.length) * 100)}% uptime`,
      icon: Wifi,
      bgColor: 'bg-gradient-to-br from-slate-900/50 to-slate-950/50',
      iconColor: 'text-cyan-500'
    },
    {
      label: 'Schedules',
      value: schedules.length.toString(),
      subtext: `${activeSchedules} active`,
      icon: Clock,
      bgColor: 'bg-gradient-to-br from-slate-900/50 to-slate-950/50',
      iconColor: 'text-cyan-500'
    },
    {
      label: 'Events Today',
      value: eventsToday.toString(),
      subtext: `${eventPercentageChange > 0 ? '+' : ''}${eventPercentageChange}% vs yesterday`,
      icon: Activity,
      bgColor: 'bg-gradient-to-br from-slate-900/50 to-slate-950/50',
      iconColor: 'text-cyan-500'
    }
  ];

  const recentActivities = logs.slice(0, 10).map(log => {
    const logTime = new Date(log.created_at);
    const now = new Date();
    const diffMs = now - logTime;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    let relativeTime = '';
    if (diffMins < 1) relativeTime = 'just now';
    else if (diffMins < 60) relativeTime = `${diffMins} min ago`;
    else if (diffHours < 24) relativeTime = `${diffHours} hr ago`;
    else relativeTime = `${diffDays} day ago`;
    
    return {
      id: log.id,
      name: log.devices?.name || 'Unknown Device',
      action: log.action || 'Action performed',
      time: relativeTime,
      icon: Activity
    };
  });

  const hasActivities = recentActivities.length > 0;

  return (
    <>
                <style>{`html, body { background-color: #06080f !important; }`}</style>
    <div>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-slate-400">Welcome back! Here's an overview of your smart home.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={idx}
                className={`${stat.bgColor} border border-slate-800 rounded-lg p-6 hover:border-slate-700 transition-all duration-300`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-slate-400 text-md font-medium">{stat.label}</h3>
                  <IconComponent className={`${stat.iconColor} w-5 h-5`} />
                </div>
                <div className="mb-2">
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </div>
                <p className="text-slate-500 text-md">{stat.subtext}</p>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-slate-900/50 to-slate-950/50 border border-slate-800 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>

              {!hasActivities ? (
                <div className="flex items-center justify-center py-20">
                  <div className="text-center">
                    <Activity className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400 text-base">You don't have activity yet</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentActivities.map((activity) => {
                    const ActivityIcon = activity.icon;
                    return (
                      <div
                        key={activity.id}
                        className="flex items-start gap-4 pb-4 border-b border-slate-700 last:border-b-0 last:pb-0"
                      >
                        <div className="flex-shrink-0 mt-1">
                          <ActivityIcon className="w-5 h-5 text-cyan-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium text-md">{activity.name}</p>
                          <p className="text-slate-400 text-md">{activity.action}</p>
                        </div>
                        <div className="flex-shrink-0">
                          <p className="text-slate-500 text-md">{activity.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Quick Controls */}
          <div>
            <div className="bg-gradient-to-br from-slate-900/50 to-slate-950/50 border border-slate-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Quick Controls</h2>
                {devices.length > 4 && (
                  <button
                    onClick={() => navigate('/devices')}
                    className="text-cyan-500 hover:text-cyan-400 text-sm font-medium flex items-center gap-1"
                  >
                    View All <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>

              {devices.length === 0 ? (
                <div className="flex items-center justify-center py-20">
                  <div className="text-center">
                    <Lightbulb className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400 text-base">No devices to control</p>
                    <p className="text-slate-500 text-md mt-2">Add devices to see controls here</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {devices.slice(0, 4).map(device => {
                    const isOn = device.state === true || device.state === 'on' || device.state === 'ON';
                    const isToggling = togglingDevice === device.id;
                    
                    return (
                      <button
                        key={device.id}
                        onClick={() => handleToggleDevice(device.id, device.state)}
                        disabled={isToggling}
                        className={`border rounded-lg p-4 transition-all cursor-pointer disabled:opacity-50 ${
                          isOn
                            ? 'bg-cyan-500/20 border-cyan-500 hover:bg-cyan-500/30'
                            : 'bg-slate-800/50 border-slate-700 hover:border-slate-600 hover:bg-slate-800/70'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <Lightbulb className={`w-4 h-4 ${isOn ? 'text-cyan-500' : 'text-slate-500'}`} />
                          <span className={`text-xs font-medium ${isOn ? 'text-cyan-400' : 'text-slate-400'}`}>
                            {isOn ? 'On' : 'Off'}
                          </span>
                        </div>
                        <p className="text-white font-medium text-sm truncate text-left">{device.name}</p>
                        <p className="text-slate-400 text-xs text-left">{device.type}</p>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Dashboard;