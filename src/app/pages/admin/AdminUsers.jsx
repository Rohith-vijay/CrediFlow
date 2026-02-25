import { Search, Filter, MoreVertical, Eye, Ban, Trash2 } from 'lucide-react';
import { useState } from 'react';

const mockUsers = [
  { id: '1', name: 'John Doe', email: 'john.doe@example.com', role: 'Borrower', status: 'active', joinDate: '2024-01-15', totalLoans: 3 },
  { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Lender', status: 'active', joinDate: '2024-02-20', totalLoans: 12 },
  { id: '3', name: 'Mike Johnson', email: 'mike.j@example.com', role: 'Borrower', status: 'active', joinDate: '2024-03-10', totalLoans: 1 },
  { id: '4', name: 'Sarah Williams', email: 'sarah.w@example.com', role: 'Lender', status: 'active', joinDate: '2024-01-05', totalLoans: 8 },
  { id: '5', name: 'David Brown', email: 'david.b@example.com', role: 'Borrower', status: 'suspended', joinDate: '2023-12-18', totalLoans: 2 },
  { id: '6', name: 'Emily Davis', email: 'emily.d@example.com', role: 'Analyst', status: 'active', joinDate: '2024-02-01', totalLoans: 0 },
  { id: '7', name: 'Robert Wilson', email: 'robert.w@example.com', role: 'Borrower', status: 'pending', joinDate: '2024-06-22', totalLoans: 0 },
  { id: '8', name: 'Lisa Anderson', email: 'lisa.a@example.com', role: 'Lender', status: 'active', joinDate: '2024-03-15', totalLoans: 5 },
];

export function AdminUsers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role.toLowerCase() === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Users</h1>
          <p className="text-gray-600">View and manage all platform users</p>
        </div>
        <button className="btn-primary">Add New User</button>
      </div>

      {/* Filters */}
      <div className="card-sharp p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative lg:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full input-sharp pl-11"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full input-sharp pl-11"
            >
              <option value="all">All Roles</option>
              <option value="borrower">Borrower</option>
              <option value="lender">Lender</option>
              <option value="analyst">Analyst</option>
            </select>
          </div>
          <div>
            <button className="w-full btn-primary">Export Data</button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="card-sharp overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table-sharp">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Status</th>
                <th>Join Date</th>
                <th>Total Loans</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div>
                      <p className="font-semibold text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </td>
                  <td>
                    <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-sm font-semibold">
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge-${user.status === 'active'
                        ? 'active'
                        : user.status === 'suspended'
                          ? 'defaulted'
                          : 'pending'
                        }`}
                    >
                      {user.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="text-gray-700">{user.joinDate}</td>
                  <td className="text-gray-700 font-semibold">{user.totalLoans}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button
                        className="p-2 hover:bg-blue-50 text-blue-600"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 hover:bg-orange-50 text-orange-600"
                        title="Suspend User"
                      >
                        <Ban className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 hover:bg-red-50 text-red-600"
                        title="Delete User"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 text-gray-600">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
