'use client'
import React, { useState } from 'react';
import {
    CreditCard,
    Calendar,
    Download,
    Eye,
    Search,
    Filter,
    ChevronDown,
    CheckCircle,
    Clock,
    XCircle,
    AlertCircle,
    Receipt,
    Wallet,
    ArrowUpRight,
    ArrowDownLeft,
    DollarSign,
    TrendingUp,
    Plus,
    Trash2,
    Edit3
} from 'lucide-react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

const page = () => {
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [selectedPeriod, setSelectedPeriod] = useState('Last 30 days');
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('transactions');

    // Sample transaction data
    const transactions = [
        {
            id: 'TXN-2024-001',
            type: 'course_purchase',
            courseName: 'Football Mastery Program',
            instructor: 'Coach Bima Sakti',
            amount: 750000,
            originalAmount: 1200000,
            status: 'completed',
            date: '2024-12-01T10:30:00Z',
            paymentMethod: 'Credit Card',
            cardLast4: '4242',
            receiptUrl: '#'
        },
        {
            id: 'TXN-2024-002',
            type: 'course_purchase',
            courseName: 'Basketball Skills Academy',
            instructor: 'Coach Andakara Prastawa',
            amount: 650000,
            originalAmount: 950000,
            status: 'completed',
            date: '2024-11-28T14:15:00Z',
            paymentMethod: 'E-Wallet',
            cardLast4: null,
            receiptUrl: '#'
        },
        {
            id: 'TXN-2024-003',
            type: 'refund',
            courseName: 'Tennis Pro Academy',
            instructor: 'Coach Maria Santos',
            amount: 800000,
            originalAmount: null,
            status: 'processing',
            date: '2024-11-25T09:45:00Z',
            paymentMethod: 'Credit Card',
            cardLast4: '1234',
            receiptUrl: '#'
        },
        {
            id: 'TXN-2024-004',
            type: 'course_purchase',
            courseName: 'Swimming Excellence Program',
            instructor: 'Coach Yudi Darma',
            amount: 550000,
            originalAmount: 800000,
            status: 'failed',
            date: '2024-11-22T16:20:00Z',
            paymentMethod: 'Bank Transfer',
            cardLast4: null,
            receiptUrl: null
        },
        {
            id: 'TXN-2024-005',
            type: 'course_purchase',
            courseName: 'Karate Traditional & Modern',
            instructor: 'Sensei Hiroshi Tanaka',
            amount: 700000,
            originalAmount: 1000000,
            status: 'completed',
            date: '2024-11-18T11:10:00Z',
            paymentMethod: 'Credit Card',
            cardLast4: '5678',
            receiptUrl: '#'
        }
    ];

    // Sample payment methods
    const paymentMethods = [
        {
            id: 1,
            type: 'credit_card',
            brand: 'Visa',
            last4: '4242',
            expiryMonth: 12,
            expiryYear: 2026,
            isDefault: true,
            holderName: 'John Doe'
        },
        {
            id: 2,
            type: 'credit_card',
            brand: 'Mastercard',
            last4: '1234',
            expiryMonth: 8,
            expiryYear: 2025,
            isDefault: false,
            holderName: 'John Doe'
        },
        {
            id: 3,
            type: 'e_wallet',
            provider: 'GoPay',
            identifier: '+62812****1234',
            isDefault: false
        }
    ];

    const filterOptions = ['All', 'Completed', 'Processing', 'Failed', 'Refund'];
    const periodOptions = ['Last 7 days', 'Last 30 days', 'Last 3 months', 'Last 6 months', 'Last year'];

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-700';
            case 'processing': return 'bg-yellow-100 text-yellow-700';
            case 'failed': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed': return <CheckCircle className="w-4 h-4" />;
            case 'processing': return <Clock className="w-4 h-4" />;
            case 'failed': return <XCircle className="w-4 h-4" />;
            default: return <AlertCircle className="w-4 h-4" />;
        }
    };

    const getTransactionIcon = (type) => {
        switch (type) {
            case 'course_purchase': return <ArrowUpRight className="w-5 h-5 text-red-500" />;
            case 'refund': return <ArrowDownLeft className="w-5 h-5 text-green-500" />;
            default: return <DollarSign className="w-5 h-5 text-gray-500" />;
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const filteredTransactions = transactions.filter(transaction => {
        const matchesFilter = selectedFilter === 'All' ||
            (selectedFilter === 'Refund' && transaction.type === 'refund') ||
            (selectedFilter !== 'Refund' && transaction.status.toLowerCase() === selectedFilter.toLowerCase());

        const matchesSearch = transaction.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.id.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesFilter && matchesSearch;
    });

    const totalSpent = transactions
        .filter(t => t.status === 'completed' && t.type === 'course_purchase')
        .reduce((sum, t) => sum + t.amount, 0);

    const totalSavings = transactions
        .filter(t => t.status === 'completed' && t.type === 'course_purchase' && t.originalAmount)
        .reduce((sum, t) => sum + (t.originalAmount - t.amount), 0);

    const getCardBrandIcon = (brand) => {
        switch (brand.toLowerCase()) {
            case 'visa': return '💳';
            case 'mastercard': return '💳';
            default: return '💳';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
            <Navbar />

            {/* Header Section */}
            <section className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="mt-20 mb-8">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                            My{' '}
                            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                                Transactions
                            </span>
                        </h1>
                        <p className="text-lg text-gray-600">
                            Manage your course purchases, payments, and transaction history
                        </p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <div className="bg-green-100 p-3 rounded-xl">
                                    <TrendingUp className="w-6 h-6 text-green-600" />
                                </div>
                                <span className="text-sm text-gray-500">This Month</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-1">{formatCurrency(totalSpent)}</h3>
                            <p className="text-sm text-gray-600">Total Spent</p>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <div className="bg-blue-100 p-3 rounded-xl">
                                    <Receipt className="w-6 h-6 text-blue-600" />
                                </div>
                                <span className="text-sm text-gray-500">All Time</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-1">{transactions.length}</h3>
                            <p className="text-sm text-gray-600">Total Transactions</p>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <div className="bg-purple-100 p-3 rounded-xl">
                                    <Wallet className="w-6 h-6 text-purple-600" />
                                </div>
                                <span className="text-sm text-gray-500">Total Saved</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-1">{formatCurrency(totalSavings)}</h3>
                            <p className="text-sm text-gray-600">From Discounts</p>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 mb-6">
                        <div className="flex border-b border-gray-200">
                            <button
                                onClick={() => setActiveTab('transactions')}
                                className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${activeTab === 'transactions'
                                        ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                                        : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                Transaction History
                            </button>
                            <button
                                onClick={() => setActiveTab('payments')}
                                className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${activeTab === 'payments'
                                        ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                                        : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                Payment Methods
                            </button>
                        </div>

                        {/* Transaction History Tab */}
                        {activeTab === 'transactions' && (
                            <div className="p-6">
                                {/* Filters */}
                                <div className="flex flex-col lg:flex-row gap-4 mb-6">
                                    <div className="relative flex-1">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="text"
                                            placeholder="Search transactions..."
                                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="relative">
                                            <select
                                                value={selectedFilter}
                                                onChange={(e) => setSelectedFilter(e.target.value)}
                                                className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none min-w-32"
                                            >
                                                {filterOptions.map(option => (
                                                    <option key={option} value={option}>{option}</option>
                                                ))}
                                            </select>
                                            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                                        </div>
                                        <div className="relative">
                                            <select
                                                value={selectedPeriod}
                                                onChange={(e) => setSelectedPeriod(e.target.value)}
                                                className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none min-w-36"
                                            >
                                                {periodOptions.map(option => (
                                                    <option key={option} value={option}>{option}</option>
                                                ))}
                                            </select>
                                            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                                        </div>
                                    </div>
                                </div>

                                {/* Transactions List */}
                                <div className="space-y-4">
                                    {filteredTransactions.map((transaction) => (
                                        <div key={transaction.id} className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-start space-x-4">
                                                    <div className="bg-white p-3 rounded-xl shadow-sm">
                                                        {getTransactionIcon(transaction.type)}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center space-x-3 mb-2">
                                                            <h3 className="font-semibold text-gray-900">{transaction.courseName}</h3>
                                                            <span className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                                                                {getStatusIcon(transaction.status)}
                                                                <span className="capitalize">{transaction.status}</span>
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-gray-600 mb-1">by {transaction.instructor}</p>
                                                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                                                            <span className="flex items-center space-x-1">
                                                                <Calendar className="w-4 h-4" />
                                                                <span>{formatDate(transaction.date)}</span>
                                                            </span>
                                                            <span>#{transaction.id}</span>
                                                            <span>{transaction.paymentMethod}</span>
                                                            {transaction.cardLast4 && (
                                                                <span>**** {transaction.cardLast4}</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="flex items-center space-x-2 mb-2">
                                                        <span className={`text-lg font-bold ${transaction.type === 'refund' ? 'text-green-600' : 'text-gray-900'}`}>
                                                            {transaction.type === 'refund' ? '+' : '-'}{formatCurrency(transaction.amount)}
                                                        </span>
                                                    </div>
                                                    {transaction.originalAmount && (
                                                        <span className="text-sm text-gray-500 line-through">
                                                            {formatCurrency(transaction.originalAmount)}
                                                        </span>
                                                    )}
                                                    <div className="flex items-center space-x-2 mt-3">
                                                        {transaction.receiptUrl && (
                                                            <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm">
                                                                <Download className="w-4 h-4" />
                                                                <span>Receipt</span>
                                                            </button>
                                                        )}
                                                        <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-700 text-sm">
                                                            <Eye className="w-4 h-4" />
                                                            <span>Details</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {filteredTransactions.length === 0 && (
                                    <div className="text-center py-12">
                                        <Receipt className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
                                        <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Payment Methods Tab */}
                        {activeTab === 'payments' && (
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900">Saved Payment Methods</h3>
                                    <button className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300">
                                        <Plus className="w-4 h-4" />
                                        <span>Add New</span>
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {paymentMethods.map((method) => (
                                        <div key={method.id} className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-4">
                                                    <div className="bg-white p-3 rounded-xl shadow-sm">
                                                        <span className="text-2xl">
                                                            {method.type === 'credit_card' ? getCardBrandIcon(method.brand) : '💰'}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center space-x-2 mb-1">
                                                            <h4 className="font-semibold text-gray-900">
                                                                {method.type === 'credit_card'
                                                                    ? `${method.brand} **** ${method.last4}`
                                                                    : `${method.provider} ${method.identifier}`
                                                                }
                                                            </h4>
                                                            {method.isDefault && (
                                                                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                                                                    Default
                                                                </span>
                                                            )}
                                                        </div>
                                                        {method.type === 'credit_card' && (
                                                            <div className="text-sm text-gray-600">
                                                                <p>{method.holderName}</p>
                                                                <p>Expires {method.expiryMonth.toString().padStart(2, '0')}/{method.expiryYear}</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                                                        <Edit3 className="w-4 h-4" />
                                                    </button>
                                                    <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default page;