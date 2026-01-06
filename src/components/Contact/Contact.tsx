import React, { useState } from 'react';
import config from '../../config/env';

interface FormData {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    message: string;
}

interface FormErrors {
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    message?: string;
}

const Contact: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        message: ''
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone: string): boolean => {
        // Accepts formats: (123) 456-7890, 123-456-7890, 123.456.7890, 1234567890
        const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!validatePhone(formData.phone)) {
            newErrors.phone = 'Please enter a valid phone number';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error for this field when user starts typing
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const response = await fetch(`${config.apiUrl}/contact/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({
                    firstName: '',
                    lastName: '',
                    phone: '',
                    email: '',
                    message: ''
                });
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div id="contact" className="bg-purple-700 py-14">
            <div className="w-2/3 max-w-3/4 ml-auto mr-auto">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-light text-white mb-0 pb-8">Contact</h1>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 items-start">
                    {/* Contact Form */}
                    <div className="flex-1 w-full">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* First and Last Name Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 rounded-md border-2 ${
                                            errors.firstName ? 'border-red-500' : 'border-gray-300'
                                        } focus:outline-none focus:border-purple-500`}
                                    />
                                    {errors.firstName && (
                                        <p className="text-red-300 text-sm mt-1">{errors.firstName}</p>
                                    )}
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="Last Name"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 rounded-md border-2 ${
                                            errors.lastName ? 'border-red-500' : 'border-gray-300'
                                        } focus:outline-none focus:border-purple-500`}
                                    />
                                    {errors.lastName && (
                                        <p className="text-red-300 text-sm mt-1">{errors.lastName}</p>
                                    )}
                                </div>
                            </div>

                            {/* Phone and Email Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Phone number"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 rounded-md border-2 ${
                                            errors.phone ? 'border-red-500' : 'border-gray-300'
                                        } focus:outline-none focus:border-purple-500`}
                                    />
                                    {errors.phone && (
                                        <p className="text-red-300 text-sm mt-1">{errors.phone}</p>
                                    )}
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 rounded-md border-2 ${
                                            errors.email ? 'border-red-500' : 'border-gray-300'
                                        } focus:outline-none focus:border-purple-500`}
                                    />
                                    {errors.email && (
                                        <p className="text-red-300 text-sm mt-1">{errors.email}</p>
                                    )}
                                </div>
                            </div>

                            {/* Message Field */}
                            <div>
                                <textarea
                                    name="message"
                                    placeholder="Type message here"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows={8}
                                    className={`w-full px-4 py-3 rounded-md border-2 ${
                                        errors.message ? 'border-red-500' : 'border-gray-300'
                                    } focus:outline-none focus:border-purple-500 resize-none`}
                                />
                                {errors.message && (
                                    <p className="text-red-300 text-sm mt-1">{errors.message}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-white text-purple-700 px-12 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Sending...' : 'Submit'}
                                </button>
                            </div>

                            {/* Status Messages */}
                            {submitStatus === 'success' && (
                                <p className="text-green-300 text-center">Thank you! Your message has been sent successfully.</p>
                            )}
                            {submitStatus === 'error' && (
                                <p className="text-red-300 text-center">Sorry, there was an error sending your message. Please try again.</p>
                            )}
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="lg:w-346 text-white space-y-6">
                        <div>
                            <h2 className="text-3xl font-bold mb-2">Davey Walbeck</h2>
                            <p className="text-xl font-light">Senior Software Architect</p>
                            <p className="text-xl font-light">& Engineering Leader</p>
                        </div>

                        <div className="space-y-3 text-lg">
                            <p>
                                <span className="font-semibold">Phone:</span> 385-434-4400
                            </p>
                            <p>
                                <span className="font-semibold">Email:</span> daveywalbeck@gmail.com
                            </p>
                            <p>
                                <span className="font-semibold">Location:</span> Draper, UT
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
