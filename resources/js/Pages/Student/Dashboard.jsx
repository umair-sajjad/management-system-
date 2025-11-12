import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function StudentDashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Student Dashboard
                </h2>
            }
        >
            <Head title="Student Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-2xl font-bold mb-4">Welcome, Student!</h3>
                            <p className="mb-4">You are logged in as a Student.</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                <div className="border rounded-lg p-4">
                                    <h4 className="font-semibold mb-2">Events</h4>
                                    <p className="text-sm text-gray-600">View upcoming events and activities</p>
                                </div>
                                <div className="border rounded-lg p-4">
                                    <h4 className="font-semibold mb-2">Discussions</h4>
                                    <p className="text-sm text-gray-600">Participate in discussions</p>
                                </div>
                                <div className="border rounded-lg p-4">
                                    <h4 className="font-semibold mb-2">Downloads</h4>
                                    <p className="text-sm text-gray-600">Access course materials and resources</p>
                                </div>
                                <div className="border rounded-lg p-4">
                                    <h4 className="font-semibold mb-2">Feed</h4>
                                    <p className="text-sm text-gray-600">View latest updates and announcements</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
