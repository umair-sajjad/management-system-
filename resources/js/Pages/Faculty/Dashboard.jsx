import FacultyLayout from '@/Layouts/FacultyLayout';
import { Head } from '@inertiajs/react';

export default function FacultyDashboard() {
    return (
        <FacultyLayout header="Faculty Dashboard">
            <Head title="Faculty Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-2xl font-bold mb-4">Welcome, Faculty!</h3>
                            <p className="mb-4">You are logged in as Faculty.</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                <div className="border rounded-lg p-4">
                                    <h4 className="font-semibold mb-2">Manage Events</h4>
                                    <p className="text-sm text-gray-600">Create and manage events</p>
                                </div>
                                <div className="border rounded-lg p-4">
                                    <h4 className="font-semibold mb-2">Manage Feed</h4>
                                    <p className="text-sm text-gray-600">Post updates and announcements</p>
                                </div>
                                <div className="border rounded-lg p-4">
                                    <h4 className="font-semibold mb-2">Discussions</h4>
                                    <p className="text-sm text-gray-600">Participate in discussions</p>
                                </div>
                                <div className="border rounded-lg p-4">
                                    <h4 className="font-semibold mb-2">Share Resources</h4>
                                    <p className="text-sm text-gray-600">Share educational resources</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FacultyLayout>
    );
}
