import FacultyLayout from '@/Layouts/FacultyLayout';
import { Head } from '@inertiajs/react';

export default function Feed() {
    return (
        <FacultyLayout header="Feed">
            <Head title="Feed" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <p>Feed Page - Coming Soon</p>
                        </div>
                    </div>
                </div>
            </div>
        </FacultyLayout>
    );
}
