import { Search, Filter, Eye, XCircle, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const mockLoans = [
  { id: 'LN-001', borrower: 'John Doe', amount: '$10,000', purpose: 'Business', duration: '24 months', interestRate: '8.5%', status: 'active', startDate: '2024-01-15' },
  { id: 'LN-002', borrower: 'Jane Smith', amount: '$15,000', purpose: 'Education', duration: '36 months', interestRate: '7.2%', status: 'active', startDate: '2024-02-20' },
  { id: 'LN-003', borrower: 'Mike Johnson', amount: '$5,000', purpose: 'Medical', duration: '12 months', interestRate: '9.0%', status: 'completed', startDate: '2023-12-10' },
  { id: 'LN-004', borrower: 'Sarah Williams', amount: '$20,000', purpose: 'Home', duration: '48 months', interestRate: '6.8%', status: 'active', startDate: '2024-03-05' },
  { id: 'LN-005', borrower: 'David Brown', amount: '$8,500', purpose: 'Personal', duration: '18 months', interestRate: '10.5%', status: 'defaulted', startDate: '2023-11-20' },
  { id: 'LN-006', borrower: 'Emily Davis', amount: '$12,000', purpose: 'Business', duration: '24 months', interestRate: '8.0%', status: 'pending', startDate: '2026-02-25' },
];

export function AdminLoans() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredLoans = mockLoans.filter((loan) => {
    const matchesSearch =
      loan.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loan.borrower.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loan.purpose.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || loan.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    active: mockLoans.filter(l => l.status === 'active').length,
    completed: mockLoans.filter(l => l.status === 'completed').length,
    defaulted: mockLoans.filter(l => l.status === 'defaulted').length,
    pending: mockLoans.filter(l => l.status === 'pending').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Loans Monitoring</h1>
        <p className="text-gray-600">Monitor and manage all platform loans</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card-sharp p-4 bg-green-50 border-2 border-green-200">
          <p className="text-sm text-gray-600 mb-1">Active Loans</p>
          <p className="text-2xl font-bold text-green-600">{stats.active}</p>
        </div>
        <div className="card-sharp p-4 bg-blue-50 border-2 border-blue-200">
          <p className="text-sm text-gray-600 mb-1">Completed</p>
          <p className="text-2xl font-bold text-blue-600">{stats.completed}</p>
        </div>
        <div className="card-sharp p-4 bg-red-50 border-2 border-red-200">
          <p className="text-sm text-gray-600 mb-1">Defaulted</p>
          <p className="text-2xl font-bold text-red-600">{stats.defaulted}</p>
        </div>
        <div className="card-sharp p-4 bg-orange-50 border-2 border-orange-200">
          <p className="text-sm text-gray-600 mb-1">Pending</p>
          <p className="text-2xl font-bold text-orange-600">{stats.pending}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="card-sharp p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by loan ID, borrower, or purpose..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full input-sharp pl-11"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full input-sharp pl-11"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="defaulted">Defaulted</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Loans Table */}
      <div className="card-sharp overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table-sharp">
            <thead>
              <tr>
                <th>Loan ID</th>
                <th>Borrower</th>
                <th>Amount</th>
                <th>Purpose</th>
                <th>Duration</th>
                <th>Interest Rate</th>
                <th>Status</th>
                <th>Start Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLoans.map((loan) => (
                <tr key={loan.id}>
                  <td className="font-semibold text-gray-900">{loan.id}</td>
                  <td className="text-gray-700">{loan.borrower}</td>
                  <td className="font-semibold text-gray-900">{loan.amount}</td>
                  <td className="text-gray-700">{loan.purpose}</td>
                  <td className="text-gray-700">{loan.duration}</td>
                  <td className="text-gray-700">{loan.interestRate}</td>
                  <td>
                    <span
                      className={`badge-${loan.status === 'active'
                        ? 'active'
                        : loan.status === 'completed'
                          ? 'active'
                          : loan.status === 'defaulted'
                            ? 'defaulted'
                            : 'pending'
                        }`}
                    >
                      {loan.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="text-gray-700">{loan.startDate}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button
                        className="p-2 hover:bg-blue-50 text-blue-600"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {loan.status === 'pending' && (
                        <>
                          <button
                            className="p-2 hover:bg-green-50 text-green-600"
                            title="Approve"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            className="p-2 hover:bg-red-50 text-red-600"
                            title="Reject"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}
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
