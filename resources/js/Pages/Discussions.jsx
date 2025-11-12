import StudentLayout from '@/Layouts/StudentLayout';
import { Head } from '@inertiajs/react';

export default function Discussions() {
    return (
        <StudentLayout header="Discussions">
            <Head title="Discussions" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <p>Discussions Page - Coming Soon</p>
                        </div>
                    </div>
                </div>
            </div>
        </StudentLayout>
    );
}
