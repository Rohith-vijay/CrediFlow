import { Users, FileText, CreditCard, TrendingDown, DollarSign } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const statsData = [
  { name: 'Total Users', value: '2,547', icon: Users, color: '#5B2DFF', change: '+12.5%' },
  { name: 'Active Loans', value: '1,234', icon: FileText, color: '#28C76F', change: '+8.2%' },
  { name: 'Transactions', value: '15,678', icon: CreditCard, color: '#FFA940', change: '+15.3%' },
  { name: 'Default Rate', value: '2.4%', icon: TrendingDown, color: '#FF4D4F', change: '-0.5%' },
  { name: 'Revenue', value: '$1.2M', icon: DollarSign, color: '#8C6CFF', change: '+22.1%' },
];

const revenueData = [
  { month: 'Jan', revenue: 850000 },
  { month: 'Feb', revenue: 920000 },
  { month: 'Mar', revenue: 1050000 },
  { month: 'Apr', revenue: 980000 },
  { month: 'May', revenue: 1150000 },
  { month: 'Jun', revenue: 1200000 },
];

const loanDistribution = [
  { name: 'Active', value: 1234, color: '#28C76F' },
  { name: 'Completed', value: 892, color: '#5B2DFF' },
  { name: 'Pending', value: 156, color: '#FFA940' },
  { name: 'Defaulted', value: 67, color: '#FF4D4F' },
];

const recentActivities = [
  { id: 1, action: 'New loan application', user: 'John Doe', time: '5 min ago', type: 'loan' },
  { id: 2, action: 'Payment received', user: 'Jane Smith', time: '12 min ago', type: 'payment' },
  { id: 3, action: 'New user registered', user: 'Mike Johnson', time: '25 min ago', type: 'user' },
  { id: 4, action: 'Loan approved', user: 'Sarah Williams', time: '1 hour ago', type: 'approval' },
  { id: 5, action: 'EMI payment completed', user: 'David Brown', time: '2 hours ago', type: 'payment' },
];

export function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Platform overview and key metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {statsData.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="card-sharp p-6">
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-12 h-12 flex items-center justify-center"
                  style={{ backgroundColor: stat.color + '20' }}
                >
                  <Icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
                <span
                  className={`text-sm font-semibold ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}
                >
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-600">{stat.name}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 card-sharp p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Revenue Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
              <XAxis dataKey="month" stroke="#6B6B6B" />
              <YAxis stroke="#6B6B6B" />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#5B2DFF" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Loan Distribution */}
        <div className="card-sharp p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Loan Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={loanDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {loanDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {loanDistribution.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3" style={{ backgroundColor: item.color }}></div>
                  <span className="text-gray-700">{item.name}</span>
                </div>
                <span className="font-semibold text-gray-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card-sharp p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Activities</h3>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center gap-4 p-4 bg-[#F8F8F8] hover:bg-[#F3F0FF] transition-colors">
              <div
                className={`w-10 h-10 flex items-center justify-center ${activity.type === 'loan'
                    ? 'bg-blue-100'
                    : activity.type === 'payment'
                      ? 'bg-green-100'
                      : activity.type === 'user'
                        ? 'bg-purple-100'
                        : 'bg-orange-100'
                  }`}
              >
                {activity.type === 'loan' && <FileText className="w-5 h-5 text-blue-600" />}
                {activity.type === 'payment' && <DollarSign className="w-5 h-5 text-green-600" />}
                {activity.type === 'user' && <Users className="w-5 h-5 text-purple-600" />}
                {activity.type === 'approval' && <CreditCard className="w-5 h-5 text-orange-600" />}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{activity.action}</p>
                <p className="text-sm text-gray-600">{activity.user}</p>
              </div>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
