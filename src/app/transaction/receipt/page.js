'use client'
import React, { useState } from 'react';
import { 
    CheckCircle, 
    Download, 
    Mail, 
    Share2, 
    Calendar, 
    Clock, 
    User, 
    CreditCard,
    MapPin,
    Phone,
    Globe,
    ArrowLeft,
    Star,
    Play,
    BookOpen,
    Award,
    Users,
    Printer,
    Copy,
    ExternalLink
} from 'lucide-react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

const page = () => {
    const [copied, setCopied] = useState(false);

    // Sample receipt data - this would come from your payment processor/database
    const receiptData = {
        transactionId: 'TXN-2024-12-001',
        orderNumber: 'ORD-240601-789',
        status: 'completed',
        paymentDate: '2024-06-01T14:30:00Z',
        
        // Course Information
        course: {
            id: 1,
            title: "Football Mastery Program",
            instructor: "Coach Bima Sakti",
            image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=250&fit=crop",
            level: "Intermediate",
            duration: "12 weeks",
            rating: 4.9,
            students: 2840,
            features: ["Live Training Sessions", "Personal Feedback", "Team Tactics", "Physical Conditioning"],
            nextSession: "Dec 15, 2024"
        },

        // Pricing Details
        pricing: {
            originalPrice: 1200000,
            discountAmount: 450000,
            discountPercentage: 37.5,
            subtotal: 750000,
            taxAmount: 0, // Assuming no tax for educational content
            totalAmount: 750000,
            currency: 'IDR'
        },

        // Payment Information
        payment: {
            method: 'Credit Card',
            cardBrand: 'Visa',
            cardLast4: '4242',
            cardHolderName: 'John Doe',
            billingAddress: {
                name: 'John Doe',
                email: 'john.doe@email.com',
                phone: '+62 812 3456 7890',
                address: 'Jl. Sudirman No. 123',
                city: 'Surabaya',
                state: 'East Java',
                country: 'Indonesia',
                postalCode: '60271'
            }
        },

        // Company Information
        company: {
            name: 'SportsCourse Academy',
            address: 'Jl. HR Muhammad No. 456, Surabaya 60175',
            phone: '+62 31 1234 5678',
            email: 'support@sportscourse.id',
            website: 'www.sportscourse.id',
            taxId: 'NPWP: 12.345.678.9-012.000'
        },

        // Access Information
        access: {
            enrollmentDate: '2024-06-01T14:30:00Z',
            accessExpiryDate: '2025-06-01T23:59:59Z',
            courseUrl: 'https://platform.sportscourse.id/courses/football-mastery',
            supportEmail: 'support@sportscourse.id'
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
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Asia/Jakarta'
        });
    };

    const copyTransactionId = () => {
        navigator.clipboard.writeText(receiptData.transactionId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handlePrint = () => {
        window.print();
    };

    const handleDownloadPDF = () => {
        // This would trigger PDF generation
        console.log('Downloading PDF receipt...');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
            <Navbar />

            {/* Receipt Container */}
            <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header Actions */}
                    <div className="flex items-center justify-between mb-8 mt-20">
                        <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                            <span>Back to Transactions</span>
                        </button>
                        <div className="flex items-center space-x-3">
                            <button 
                                onClick={handlePrint}
                                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                            >
                                <Printer className="w-4 h-4" />
                                <span>Print</span>
                            </button>
                            <button 
                                onClick={handleDownloadPDF}
                                className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-300"
                            >
                                <Download className="w-4 h-4" />
                                <span>Download PDF</span>
                            </button>
                        </div>
                    </div>

                    {/* Receipt Card */}
                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                        {/* Success Header */}
                        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-8 text-center">
                            <div className="flex justify-center mb-4">
                                <div className="bg-white/20 p-4 rounded-full">
                                    <CheckCircle className="w-12 h-12" />
                                </div>
                            </div>
                            <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
                            <p className="text-green-100 text-lg">Thank you for your course purchase</p>
                        </div>

                        <div className="p-8">
                            {/* Transaction Details */}
                            <div className="border-b border-gray-200 pb-6 mb-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Transaction Details</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Transaction ID</p>
                                        <div className="flex items-center space-x-2">
                                            <p className="font-mono text-gray-900">{receiptData.transactionId}</p>
                                            <button 
                                                onClick={copyTransactionId}
                                                className="text-blue-600 hover:text-blue-700 transition-colors"
                                            >
                                                <Copy className="w-4 h-4" />
                                            </button>
                                            {copied && <span className="text-green-600 text-sm">Copied!</span>}
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Order Number</p>
                                        <p className="font-mono text-gray-900">{receiptData.orderNumber}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Payment Date</p>
                                        <p className="text-gray-900">{formatDate(receiptData.paymentDate)}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Status</p>
                                        <span className="inline-flex items-center space-x-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                                            <CheckCircle className="w-4 h-4" />
                                            <span>Completed</span>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Course Information */}
                            <div className="border-b border-gray-200 pb-6 mb-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Course Information</h2>
                                <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6">
                                    <div className="lg:w-1/3">
                                        <img 
                                            src={receiptData.course.image} 
                                            alt={receiptData.course.title}
                                            className="w-full h-48 object-cover rounded-xl"
                                        />
                                    </div>
                                    <div className="lg:w-2/3">
                                        <div className="flex items-center space-x-2 mb-2">
                                            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                                                {receiptData.course.level}
                                            </span>
                                            <div className="flex items-center space-x-1">
                                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                <span className="text-sm text-gray-600">{receiptData.course.rating}</span>
                                            </div>
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{receiptData.course.title}</h3>
                                        <div className="flex items-center space-x-2 mb-3">
                                            <User className="w-4 h-4 text-gray-400" />
                                            <span className="text-gray-600">{receiptData.course.instructor}</span>
                                        </div>
                                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                                            <div className="flex items-center space-x-1">
                                                <Clock className="w-4 h-4" />
                                                <span>{receiptData.course.duration}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <Users className="w-4 h-4" />
                                                <span>{receiptData.course.students.toLocaleString()} students</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {receiptData.course.features.slice(0, 3).map((feature, index) => (
                                                <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Breakdown */}
                            <div className="border-b border-gray-200 pb-6 mb-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Breakdown</h2>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Course Fee</span>
                                        <span className="text-gray-900">{formatCurrency(receiptData.pricing.originalPrice)}</span>
                                    </div>
                                    <div className="flex justify-between text-green-600">
                                        <span>Discount ({receiptData.pricing.discountPercentage}%)</span>
                                        <span>-{formatCurrency(receiptData.pricing.discountAmount)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span className="text-gray-900">{formatCurrency(receiptData.pricing.subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Tax</span>
                                        <span className="text-gray-900">{formatCurrency(receiptData.pricing.taxAmount)}</span>
                                    </div>
                                    <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-bold">
                                        <span className="text-gray-900">Total Paid</span>
                                        <span className="text-blue-600">{formatCurrency(receiptData.pricing.totalAmount)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="border-b border-gray-200 pb-6 mb-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Method</h2>
                                <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-xl">
                                    <div className="bg-white p-3 rounded-xl shadow-sm">
                                        <CreditCard className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">
                                            {receiptData.payment.cardBrand} **** {receiptData.payment.cardLast4}
                                        </p>
                                        <p className="text-sm text-gray-600">{receiptData.payment.cardHolderName}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Billing Information */}
                            <div className="border-b border-gray-200 pb-6 mb-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Billing Information</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-2">Contact Details</h3>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex items-center space-x-2">
                                                <User className="w-4 h-4 text-gray-400" />
                                                <span>{receiptData.payment.billingAddress.name}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Mail className="w-4 h-4 text-gray-400" />
                                                <span>{receiptData.payment.billingAddress.email}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Phone className="w-4 h-4 text-gray-400" />
                                                <span>{receiptData.payment.billingAddress.phone}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-2">Billing Address</h3>
                                        <div className="text-sm text-gray-600">
                                            <p>{receiptData.payment.billingAddress.address}</p>
                                            <p>{receiptData.payment.billingAddress.city}, {receiptData.payment.billingAddress.state}</p>
                                            <p>{receiptData.payment.billingAddress.country} {receiptData.payment.billingAddress.postalCode}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Course Access Information */}
                            <div className="bg-blue-50 rounded-xl p-6 mb-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                                    <BookOpen className="w-6 h-6 text-blue-600" />
                                    <span>Course Access Information</span>
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Enrollment Date</p>
                                        <p className="font-semibold text-gray-900">{formatDate(receiptData.access.enrollmentDate)}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Access Valid Until</p>
                                        <p className="font-semibold text-gray-900">{formatDate(receiptData.access.accessExpiryDate)}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Next Session</p>
                                        <p className="font-semibold text-gray-900">{receiptData.course.nextSession}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <button className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                                        <Play className="w-5 h-5" />
                                        <span>Start Learning</span>
                                        <ExternalLink className="w-4 h-4" />
                                    </button>
                                    <button className="flex items-center justify-center space-x-2 border border-blue-600 text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
                                        <Mail className="w-5 h-5" />
                                        <span>Contact Support</span>
                                    </button>
                                </div>
                            </div>

                            {/* Company Information */}
                            <div className="text-center border-t border-gray-200 pt-6">
                                <h3 className="font-bold text-gray-900 mb-2">{receiptData.company.name}</h3>
                                <div className="text-sm text-gray-600 space-y-1">
                                    <p>{receiptData.company.address}</p>
                                    <p>Phone: {receiptData.company.phone} | Email: {receiptData.company.email}</p>
                                    <p>Website: {receiptData.company.website}</p>
                                    <p className="text-xs mt-2">{receiptData.company.taxId}</p>
                                </div>
                            </div>

                            {/* Footer Note */}
                            <div className="bg-gray-50 rounded-xl p-4 mt-6">
                                <p className="text-sm text-gray-600 text-center">
                                    <strong>Note:</strong> This is an official receipt for your course purchase. Please keep this for your records. 
                                    If you have any questions about your purchase or need assistance accessing your course, 
                                    please contact our support team at {receiptData.access.supportEmail}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default page;