import { useState } from 'react';

interface FormData {
    name: string;
    email: string;
    phone: string;
    company: string;
    notes: string;
    contactMethod: string;
    bestTime: string;
}


export default function Contact() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        company: '',
        notes: '',
        contactMethod: '',
        bestTime: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    
    return (
        <div>
            <div className="border-2 border-gray-700/70 bg-gray-800/90 rounded-lg p-6 max-w-2xl mx-auto mt-10">
                <div className="text-center mb-6">
                    <h1 className="text-4xl font-semibold mb-3">Contact me</h1>
                    <p className="text-lg">Interested in collaborations, commissions, or bookings? Let's talk!</p>
                    <p className="text-lg">Form submission coming soon!</p>
                </div>
                <form className="flex flex-col gap-6">
                    <div className="font-semibold text-2xl border-b-2 border-gray-700/70 pb-2">
                        <h3>Contact Information</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center">
                        <div className="flex flex-col p-4">
                            <label htmlFor="name" className="w-24 font-medium">*Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Your name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="flex-1 p-2 rounded-md bg-gray-700/70 border border-gray-600 focus:outline-none focus:border-white"
                            />
                        </div>
                        <div className="flex flex-col p-4">
                            <label htmlFor="email" className="w-24 font-medium">*Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="email@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="flex-1 p-2 rounded-md bg-gray-700/70 border border-gray-600 focus:outline-none focus:border-white"
                            />
                        </div>
                        <div className="flex flex-col p-4">
                            <label htmlFor="phone" className="w-24 font-medium">*Phone:</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                placeholder="(123) 456-7890"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="flex-1 p-2 rounded-md bg-gray-700/70 border border-gray-600 focus:outline-none focus:border-white"
                            />
                        </div>
                        <div className="flex flex-col p-4">
                            <label htmlFor="company" className="w-24 font-medium">Company:</label>
                            <input
                                type="text"
                                id="company"
                                name="company"
                                placeholder="Your company"
                                value={formData.company}
                                onChange={handleChange}
                                className="flex-1 p-2 rounded-md bg-gray-700/70 border border-gray-600 focus:outline-none focus:border-white"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="font-semibold text-2xl border-b-2 border-gray-700/70 pb-2">
                            <h3>Contact Preferences</h3>
                        </div>
                        <div className="flex flex-col p-4 gap-4">
                            <div>
                                <label htmlFor="contactMethod" className="w-48 font-medium">Preferred Contact Method:</label>
                                <select
                                    id="contactMethod"
                                    name="contactMethod"
                                    value={formData.contactMethod}
                                    onChange={handleChange}
                                    className="w-full mt-2 mb-4 p-2 rounded-md bg-gray-700/70 border border-gray-600 focus:outline-none focus:bg-gray-600 focus:border-white"
                                >
                                    <option value="">Select an option</option>
                                    <option value="email">Email</option>
                                    <option value="phone">Phone</option>
                                    <option value="text">Text Message</option>
                                </select>
                                <label htmlFor="bestTime" className="w-48 font-medium">Best Time to Contact:</label>
                                <select
                                    id="bestTime"
                                    name="bestTime"
                                    value={formData.bestTime}
                                    onChange={handleChange}
                                    className="w-full mt-2 mb-4 p-2 rounded-md bg-gray-700/70 border border-gray-600 focus:outline-none focus:bg-gray-600 focus:border-white"
                                >
                                    <option value="">Select an option</option>
                                    <option value="morning">Morning</option>
                                    <option value="afternoon">Afternoon</option>
                                    <option value="evening">Evening</option>
                                    <option value="weekend">Weekend</option>
                                </select>
                                <label htmlFor="notes" className="w-48 font-medium">Additional Notes:</label>
                                <textarea
                                    id="notes"
                                    name="notes"
                                    placeholder="Any specific details or questions to include?"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    className="w-full mt-2 p-2 rounded-md bg-gray-700/70 border border-gray-600 focus:outline-none focus:bg-gray-600 focus:border-white"
                                />
                            </div>
                            <div className="flex justify-center">
                                <button type="submit" className="bg-slate-600 hover:bg-slate-500 font-semibold py-2 px-4 rounded-md text-white transition-colors duration-300 disabled:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed" disabled={!formData.name || !formData.email || !formData.phone}>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}