'use client'
import React, { useState } from 'react';
import {
    CreditCard,
    Wallet,
    Smartphone,
    Building,
    Lock,
    ShieldCheck,
    CheckCircle,
    Clock,
    User,
    Mail,
    Phone,
    MapPin,
    Star,
    Users,
    Play,
    ArrowLeft,
    AlertCircle,
    Calendar,
    Trophy,
    Info
} from 'lucide-react';

const page = () => {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('credit-card');
    const [formData, setFormData] = useState({
        // Personal Information
        fullName: '',
        email: '',
        phone: '',

        // Billing Address
        address: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'Indonesia',

        // Credit Card
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardHolderName: '',

        // Bank Transfer
        selectedBank: '',

        // E-Wallet
        eWalletNumber: ''
    });

    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);

    // Sample course data - would come from props or context
    const courseData = {
        id: 1,
        title: "Football Mastery Program",
        instructor: "Coach Bima Sakti",
        image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=250&fit=crop",
        level: "Intermediate",
        duration: "12 weeks",
        rating: 4.9,
        students: 2840,
        originalPrice: 1200000,
        discountAmount: 450000,
        discountPercentage: 37.5,
        finalPrice: 750000,
        features: ["Live Training Sessions", "Personal Feedback", "Team Tactics", "Physical Conditioning"],
        nextSession: "Dec 15, 2024"
    };

    const paymentMethods = [
        {
            id: 'credit-card',
            name: 'Credit/Debit Card',
            icon: CreditCard,
            description: 'Visa, Mastercard, JCB',
            fees: 'Free'
        },
        {
            id: 'bank-transfer',
            name: 'Bank Transfer',
            icon: Building,
            description: 'BCA, Mandiri, BRI, BNI',
            fees: 'Free'
        },
        {
            id: 'e-wallet',
            name: 'E-Wallet',
            icon: Wallet,
            description: 'GoPay, OVO, Dana, LinkAja',
            fees: 'Free'
        },
        {
            id: 'qris',
            name: 'QRIS',
            icon: Smartphone,
            description: 'Scan QR code to pay',
            fees: 'Free'
        }
    ];

    const banks = [
        { id: 'bca', name: 'Bank BCA', code: '014' },
        { id: 'mandiri', name: 'Bank Mandiri', code: '008' },
        { id: 'bri', name: 'Bank BRI', code: '002' },
        { id: 'bni', name: 'Bank BNI', code: '009' },
        { id: 'cimb', name: 'CIMB Niaga', code: '022' }
    ];

    const eWallets = [
        { id: 'gopay', name: 'GoPay', icon: '🟢' },
        { id: 'ovo', name: 'OVO', icon: '🟣' },
        { id: 'dana', name: 'DANA', icon: '🔵' },
        { id: 'linkaja', name: 'LinkAja', icon: '🔴' }
    ];

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Personal Information
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';

        // Billing Address
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.state.trim()) newErrors.state = 'State is required';
        if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required';

        // Payment Method Specific
        if (selectedPaymentMethod === 'credit-card') {
            if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
            if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
            if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required';
            if (!formData.cardHolderName.trim()) newErrors.cardHolderName = 'Card holder name is required';
        } else if (selectedPaymentMethod === 'bank-transfer') {
            if (!formData.selectedBank) newErrors.selectedBank = 'Please select a bank';
        } else if (selectedPaymentMethod === 'e-wallet') {
            if (!formData.eWalletNumber.trim()) newErrors.eWalletNumber = 'E-wallet number is required';
        }

        if (!acceptTerms) newErrors.terms = 'Please accept the terms and conditions';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setProcessing(true);

        // Simulate payment processing
        setTimeout(() => {
            setProcessing(false);
            // Redirect to success page or show success modal
            alert('Payment successful! Redirecting to course...');
        }, 3000);
    };

    const renderPaymentForm = () => {
        switch (selectedPaymentMethod) {
            case 'credit-card':
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                            <input
                                type="text"
                                placeholder="1234 5678 9012 3456"
                                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'}`}
                                value={formData.cardNumber}
                                onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                                maxLength={19}
                            />
                            {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                                <input
                                    type="text"
                                    placeholder="MM/YY"
                                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'}`}
                                    value={formData.expiryDate}
                                    onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                                    maxLength={5}
                                />
                                {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                                <input
                                    type="text"
                                    placeholder="123"
                                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${errors.cvv ? 'border-red-500' : 'border-gray-300'}`}
                                    value={formData.cvv}
                                    onChange={(e) => handleInputChange('cvv', e.target.value)}
                                    maxLength={4}
                                />
                                {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Card Holder Name</label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${errors.cardHolderName ? 'border-red-500' : 'border-gray-300'}`}
                                value={formData.cardHolderName}
                                onChange={(e) => handleInputChange('cardHolderName', e.target.value)}
                            />
                            {errors.cardHolderName && <p className="text-red-500 text-sm mt-1">{errors.cardHolderName}</p>}
                        </div>
                    </div>
                );

            case 'bank-transfer':
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Select Bank</label>
                            <div className="grid grid-cols-1 gap-3">
                                {banks.map((bank) => (
                                    <label key={bank.id} className="flex items-center p-4 border rounded-xl cursor-pointer hover:bg-gray-50">
                                        <input
                                            type="radio"
                                            name="bank"
                                            value={bank.id}
                                            checked={formData.selectedBank === bank.id}
                                            onChange={(e) => handleInputChange('selectedBank', e.target.value)}
                                            className="text-blue-600 focus:ring-blue-500"
                                        />
                                        <div className="ml-3">
                                            <p className="font-medium text-gray-900">{bank.name}</p>
                                            <p className="text-sm text-gray-500">Code: {bank.code}</p>
                                        </div>
                                    </label>
                                ))}
                            </div>
                            {errors.selectedBank && <p className="text-red-500 text-sm mt-1">{errors.selectedBank}</p>}
                        </div>
                        <div className="bg-blue-50 p-4 rounded-xl">
                            <div className="flex items-start space-x-2">
                                <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                                <div className="text-sm text-blue-800">
                                    <p className="font-medium mb-1">Bank Transfer Instructions:</p>
                                    <ul className="list-disc list-inside space-y-1">
                                        <li>You will receive bank account details after clicking "Process Payment"</li>
                                        <li>Transfer must be completed within 24 hours</li>
                                        <li>Course access will be granted after payment confirmation</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'e-wallet':
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Select E-Wallet</label>
                            <div className="grid grid-cols-2 gap-3 mb-4">
                                {eWallets.map((wallet) => (
                                    <label key={wallet.id} className="flex items-center p-4 border rounded-xl cursor-pointer hover:bg-gray-50">
                                        <input
                                            type="radio"
                                            name="ewallet"
                                            value={wallet.id}
                                            className="text-blue-600 focus:ring-blue-500"
                                        />
                                        <div className="ml-3 flex items-center space-x-2">
                                            <span className="text-lg">{wallet.icon}</span>
                                            <span className="font-medium text-gray-900">{wallet.name}</span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                            <input
                                type="text"
                                placeholder="+62 812 3456 7890"
                                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${errors.eWalletNumber ? 'border-red-500' : 'border-gray-300'}`}
                                value={formData.eWalletNumber}
                                onChange={(e) => handleInputChange('eWalletNumber', e.target.value)}
                            />
                            {errors.eWalletNumber && <p className="text-red-500 text-sm mt-1">{errors.eWalletNumber}</p>}
                        </div>
                    </div>
                );

            case 'qris':
                return (
                    <div className="text-center py-8">
                        <div className="bg-gray-100 w-48 h-48 mx-auto rounded-xl flex items-center justify-center mb-4">
                            <div className="text-center">
                                <Smartphone className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                                <p className="text-gray-500 text-sm">QR Code will appear here</p>
                            </div>
                        </div>
                        <p className="text-gray-600 mb-2">Scan QR code with your mobile banking app</p>
                        <p className="text-sm text-gray-500">or any QRIS-enabled payment app</p>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                            <span>Back to Course</span>
                        </button>
                        <div className="h-6 w-px bg-gray-300"></div>
                        <h1 className="text-xl font-bold text-gray-900">Complete Your Purchase</h1>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Payment Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Personal Information */}
                            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                                    <User className="w-6 h-6 text-blue-600" />
                                    <span>Personal Information</span>
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                                            value={formData.fullName}
                                            onChange={(e) => handleInputChange('fullName', e.target.value)}
                                        />
                                        {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                        <input
                                            type="email"
                                            placeholder="john.doe@email.com"
                                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                            value={formData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                        />
                                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                        <input
                                            type="text"
                                            placeholder="+62 812 3456 7890"
                                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                                            value={formData.phone}
                                            onChange={(e) => handleInputChange('phone', e.target.value)}
                                        />
                                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Billing Address */}
                            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                                    <MapPin className="w-6 h-6 text-blue-600" />
                                    <span>Billing Address</span>
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                                        <input
                                            type="text"
                                            placeholder="Jl. Sudirman No. 123"
                                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                                            value={formData.address}
                                            onChange={(e) => handleInputChange('address', e.target.value)}
                                        />
                                        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                                        <input
                                            type="text"
                                            placeholder="Surabaya"
                                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                                            value={formData.city}
                                            onChange={(e) => handleInputChange('city', e.target.value)}
                                        />
                                        {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">State/Province</label>
                                        <input
                                            type="text"
                                            placeholder="East Java"
                                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
                                            value={formData.state}
                                            onChange={(e) => handleInputChange('state', e.target.value)}
                                        />
                                        {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                                        <input
                                            type="text"
                                            placeholder="60271"
                                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${errors.postalCode ? 'border-red-500' : 'border-gray-300'}`}
                                            value={formData.postalCode}
                                            onChange={(e) => handleInputChange('postalCode', e.target.value)}
                                        />
                                        {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                                        <select
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                            value={formData.country}
                                            onChange={(e) => handleInputChange('country', e.target.value)}
                                        >
                                            <option value="Indonesia">Indonesia</option>
                                            <option value="Malaysia">Malaysia</option>
                                            <option value="Singapore">Singapore</option>
                                            <option value="Thailand">Thailand</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                                    <CreditCard className="w-6 h-6 text-blue-600" />
                                    <span>Payment Method</span>
                                </h2>

                                {/* Payment Method Selection */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    {paymentMethods.map((method) => {
                                        const Icon = method.icon;
                                        return (
                                            <label key={method.id}
                                                className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${selectedPaymentMethod === method.id
                                                        ? 'border-blue-500 bg-blue-50'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                    }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value={method.id}
                                                    checked={selectedPaymentMethod === method.id}
                                                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                                                    className="text-blue-600 focus:ring-blue-500"
                                                />
                                                <div className="ml-3 flex-1">
                                                    <div className="flex items-center space-x-2 mb-1">
                                                        <Icon className="w-5 h-5 text-blue-600" />
                                                        <span className="font-medium text-gray-900">{method.name}</span>
                                                    </div>
                                                    <p className="text-sm text-gray-500">{method.description}</p>
                                                    <p className="text-xs text-green-600 font-medium">{method.fees}</p>
                                                </div>
                                            </label>
                                        );
                                    })}
                                </div>

                                {/* Payment Form */}
                                {renderPaymentForm()}
                            </div>

                            {/* Terms and Conditions */}
                            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                                <label className="flex items-start space-x-3">
                                    <input
                                        type="checkbox"
                                        checked={acceptTerms}
                                        onChange={(e) => setAcceptTerms(e.target.checked)}
                                        className="mt-1 text-blue-600 focus:ring-blue-500 rounded"
                                    />
                                    <div className="text-sm text-gray-600">
                                        <p>I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>. I understand that I will have immediate access to the course content upon successful payment.</p>
                                    </div>
                                </label>
                                {errors.terms && <p className="text-red-500 text-sm mt-2">{errors.terms}</p>}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl text-lg font-bold hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                            >
                                {processing ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        <span>Processing Payment...</span>
                                    </>
                                ) : (
                                    <>
                                        <Lock className="w-5 h-5" />
                                        <span>Complete Payment - {formatCurrency(courseData.finalPrice)}</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8">
                            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                                {/* Course Info */}
                                <div className="flex space-x-4 mb-6">
                                    <img
                                        src={courseData.image}
                                        alt={courseData.title}
                                        className="w-20 h-20 object-cover rounded-xl"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-bold text-gray-900 mb-1">{courseData.title}</h3>
                                        <p className="text-sm text-gray-600 mb-2">by {courseData.instructor}</p>
                                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                            <span>{courseData.rating}</span>
                                            <span>•</span>
                                            <Users className="w-4 h-4" />
                                            <span>{courseData.students.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Course Features */}
                                <div className="mb-6">
                                    <h4 className="font-semibold text-gray-900 mb-3">What's included:</h4>
                                    <ul className="space-y-2">
                                        {courseData.features.map((feature, index) => (
                                            <li key={index} className="flex items-center space-x-2">
                                                <CheckCircle className="w-4 h-4 text-green-500" />
                                                <span className="text-sm text-gray-700">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Course Details */}
                                <div className="border-t border-gray-200 pt-4 mb-6">
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600">Level:</span>
                                            <span className="font-medium text-gray-900">{courseData.level}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600">Duration:</span>
                                            <span className="font-medium text-gray-900">{courseData.duration}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600 flex items-center space-x-1">
                                                <Calendar className="w-4 h-4" />
                                                <span>Next Session:</span>
                                            </span>
                                            <span className="font-medium text-gray-900">{courseData.nextSession}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Pricing Breakdown */}
                                <div className="border-t border-gray-200 pt-4 mb-6">
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-600">Course Price:</span>
                                            <span className="text-gray-500 line-through">{formatCurrency(courseData.originalPrice)}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-green-600 font-medium">
                                                Discount ({courseData.discountPercentage}% OFF):
                                            </span>
                                            <span className="text-green-600 font-medium">
                                                -{formatCurrency(courseData.discountAmount)}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600">Processing Fee:</span>
                                            <span className="text-green-600 font-medium">FREE</span>
                                        </div>
                                        <div className="border-t border-gray-200 pt-3">
                                            <div className="flex items-center justify-between text-lg font-bold">
                                                <span className="text-gray-900">Total:</span>
                                                <span className="text-blue-600">{formatCurrency(courseData.finalPrice)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Security Notice */}
                                <div className="bg-green-50 p-4 rounded-xl">
                                    <div className="flex items-start space-x-2">
                                        <ShieldCheck className="w-5 h-5 text-green-600 mt-0.5" />
                                        <div className="text-sm">
                                            <p className="font-medium text-green-800 mb-1">Secure Payment</p>
                                            <p className="text-green-700">
                                                Your payment information is encrypted and secure.
                                                We never store your card details.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Money Back Guarantee */}
                                <div className="mt-4 bg-blue-50 p-4 rounded-xl">
                                    <div className="flex items-start space-x-2">
                                        <Trophy className="w-5 h-5 text-blue-600 mt-0.5" />
                                        <div className="text-sm">
                                            <p className="font-medium text-blue-800 mb-1">30-Day Money Back Guarantee</p>
                                            <p className="text-blue-700">
                                                Not satisfied? Get a full refund within 30 days, no questions asked.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Instant Access */}
                                <div className="mt-4 bg-purple-50 p-4 rounded-xl">
                                    <div className="flex items-start space-x-2">
                                        <Play className="w-5 h-5 text-purple-600 mt-0.5" />
                                        <div className="text-sm">
                                            <p className="font-medium text-purple-800 mb-1">Instant Access</p>
                                            <p className="text-purple-700">
                                                Start learning immediately after payment. Access all course materials 24/7.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Support Contact */}
                            <div className="mt-6 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                                <h3 className="font-bold text-gray-900 mb-4">Need Help?</h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center space-x-2">
                                        <Mail className="w-4 h-4 text-blue-600" />
                                        <span className="text-gray-600">support@footballacademy.com</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Phone className="w-4 h-4 text-blue-600" />
                                        <span className="text-gray-600">+62 21 1234 5678</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Clock className="w-4 h-4 text-blue-600" />
                                        <span className="text-gray-600">Mon-Fri 9AM-6PM WIB</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Processing Overlay */}
            {processing && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Processing Payment</h3>
                        <p className="text-gray-600">Please wait while we process your payment securely...</p>
                        <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-gray-500">
                            <ShieldCheck className="w-4 h-4 text-green-500" />
                            <span>SSL Encrypted</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default page;