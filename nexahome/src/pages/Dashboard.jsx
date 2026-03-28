import React from 'react';
import {
  Zap,
  Wifi,
  Clock,
  Activity,
  Lock,
  Lightbulb,
  Wind,
  Warehouse
} from 'lucide-react';

const Dashboard = () => {
  // Empty stats - will be filled from backend
  const stats = [
    {
      label: 'Total Devices',
      value: '0',
      subtext: 'Add your first device',
      icon: Zap,
      bgColor: 'bg-gradient-to-br from-slate-900/50 to-slate-950/50',
      iconColor: 'text-cyan-500'
    },
    {
      label: 'Online',
      value: '0',
      subtext: 'No devices online',
      icon: Wifi,
      bgColor: 'bg-gradient-to-br from-slate-900/50 to-slate-950/50',
      iconColor: 'text-cyan-500'
    },
    {
      label: 'Schedules',
      value: '0',
      subtext: 'No schedules yet',
      icon: Clock,
      bgColor: 'bg-gradient-to-br from-slate-900/50 to-slate-950/50',
      iconColor: 'text-cyan-500'
    },
    {
      label: 'Events Today',
      value: '0',
      subtext: 'No events',
      icon: Activity,
      bgColor: 'bg-gradient-to-br from-slate-900/50 to-slate-950/50',
      iconColor: 'text-cyan-500'
    }
  ];

  // Empty recent activities
  const recentActivities = [];

  const hasActivities = recentActivities.length > 0;

  return (
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
              <h2 className="text-xl font-bold text-white mb-6">Quick Controls</h2>

              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <Lightbulb className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400 text-base">No devices to control</p>
                  <p className="text-slate-500 text-md mt-2">Add devices to see controls here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;