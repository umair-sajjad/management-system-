import ClubAdminLayout from '@/Layouts/ClubAdminLayout';
import { Head } from '@inertiajs/react';

export default function Feedbacks() {
    return (
        <ClubAdminLayout header="Feedbacks">
            <Head title="Feedbacks" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <p>Feedbacks Page - Coming Soon</p>
                        </div>
                    </div>
                </div>
            </div>
        </ClubAdminLayout>
    );
}
