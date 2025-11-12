import ClubAdminLayout from '@/Layouts/ClubAdminLayout';
import { Head } from '@inertiajs/react';

export default function ManageStudents() {
    return (
        <ClubAdminLayout header="Manage Students">
            <Head title="Manage Students" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <p>Manage Students Page - Coming Soon</p>
                        </div>
                    </div>
                </div>
            </div>
        </ClubAdminLayout>
    );
}
