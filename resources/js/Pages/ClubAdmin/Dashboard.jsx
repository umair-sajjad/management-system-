import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function ClubAdminDashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Club Admin Dashboard
                </h2>
            }
        >
            <Head title="Club Admin Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-2xl font-bold mb-4">Welcome, Club Admin!</h3>
                            <p className="mb-4">You are logged in as a Club Administrator.</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                                <div className="border rounded-lg p-4">
                                    <h4 className="font-semibold mb-2">Manage Students</h4>
                                    <p className="text-sm text-gray-600">Manage club members</p>
                                </div>
                                <div className="border rounded-lg p-4">
                                    <h4 className="font-semibold mb-2">Manage Events</h4>
                                    <p className="text-sm text-gray-600">Create and manage club events</p>
                                </div>
                                <div className="border rounded-lg p-4">
                                    <h4 className="font-semibold mb-2">Discussions</h4>
                                    <p className="text-sm text-gray-600">Moderate club discussions</p>
                                </div>
                                <div className="border rounded-lg p-4">
                                    <h4 className="font-semibold mb-2">Feedbacks</h4>
                                    <p className="text-sm text-gray-600">View club feedback</p>
                                </div>
                                <div className="border rounded-lg p-4">
                                    <h4 className="font-semibold mb-2">Share Resources</h4>
                                    <p className="text-sm text-gray-600">Share club resources</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
