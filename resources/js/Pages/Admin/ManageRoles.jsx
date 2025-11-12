import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function ManageRoles({ users, auth }) {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const { data: createData, setData: setCreateData, post, errors: createErrors, processing: createProcessing, reset: resetCreate } = useForm({
        name: '',
        email: '',
        password: '',
        role: 'student',
    });

    const { data: editData, setData: setEditData, patch, errors: editErrors, processing: editProcessing } = useForm({
        name: '',
        email: '',
        role: '',
    });

    const handleCreate = (e) => {
        e.preventDefault();
        post(route('admin.users.store'), {
            onSuccess: () => {
                setShowCreateModal(false);
                resetCreate();
            },
        });
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setEditData({
            name: user.name,
            email: user.email,
            role: user.role,
        });
        setShowEditModal(true);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        patch(route('admin.users.update', editingUser.id), {
            onSuccess: () => {
                setShowEditModal(false);
                setEditingUser(null);
            },
        });
    };

    const handleDelete = (user) => {
        if (confirm(`Are you sure you want to delete ${user.name}?`)) {
            router.delete(route('admin.users.destroy', user.id));
        }
    };

    const getRoleBadgeColor = (role) => {
        const colors = {
            admin: 'bg-purple-100 text-purple-800',
            student: 'bg-blue-100 text-blue-800',
            faculty: 'bg-green-100 text-green-800',
            club_admin: 'bg-orange-100 text-orange-800',
        };
        return colors[role] || 'bg-gray-100 text-gray-800';
    };

    const getRoleLabel = (role) => {
        const labels = {
            admin: 'Admin',
            student: 'Student',
            faculty: 'Faculty',
            club_admin: 'Club Admin',
        };
        return labels[role] || role;
    };

    return (
        <AdminLayout header="Manage Roles">
            <Head title="Manage Roles" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {/* Header with Add Button */}
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-2xl font-semibold text-gray-800">Users & Roles Management</h2>
                                <button
                                    onClick={() => setShowCreateModal(true)}
                                    className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    Add New User
                                </button>
                            </div>

                            {/* Users Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Name
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Email
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Role
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Created At
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {users.data.map((user) => (
                                            <tr key={user.id} className="hover:bg-gray-50">
                                                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                                    {user.name}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                    {user.email}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm">
                                                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getRoleBadgeColor(user.role)}`}>
                                                        {getRoleLabel(user.role)}
                                                    </span>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                    {new Date(user.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                                    <button
                                                        onClick={() => handleEdit(user)}
                                                        className="mr-3 text-indigo-600 hover:text-indigo-900"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(user)}
                                                        className="text-red-600 hover:text-red-900"
                                                        disabled={user.id === auth.user.id}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {users.links && users.links.length > 3 && (
                                <div className="mt-4 flex justify-center">
                                    <nav className="inline-flex rounded-md shadow">
                                        {users.links.map((link, index) => (
                                            <button
                                                key={index}
                                                onClick={() => link.url && router.visit(link.url)}
                                                disabled={!link.url}
                                                className={`px-4 py-2 text-sm font-medium ${
                                                    link.active
                                                        ? 'bg-indigo-600 text-white'
                                                        : 'bg-white text-gray-700 hover:bg-gray-50'
                                                } ${index === 0 ? 'rounded-l-md' : ''} ${
                                                    index === users.links.length - 1 ? 'rounded-r-md' : ''
                                                } border ${!link.url ? 'cursor-not-allowed opacity-50' : ''}`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </nav>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Create User Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                        <h3 className="mb-4 text-lg font-semibold text-gray-900">Add New User</h3>
                        <form onSubmit={handleCreate} className="space-y-4">
                            <div>
                                <InputLabel htmlFor="create_name" value="Name" />
                                <TextInput
                                    id="create_name"
                                    className="mt-1 block w-full"
                                    value={createData.name}
                                    onChange={(e) => setCreateData('name', e.target.value)}
                                    required
                                />
                                <InputError message={createErrors.name} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="create_email" value="Email" />
                                <TextInput
                                    id="create_email"
                                    type="email"
                                    className="mt-1 block w-full"
                                    value={createData.email}
                                    onChange={(e) => setCreateData('email', e.target.value)}
                                    required
                                />
                                <InputError message={createErrors.email} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="create_password" value="Password" />
                                <TextInput
                                    id="create_password"
                                    type="password"
                                    className="mt-1 block w-full"
                                    value={createData.password}
                                    onChange={(e) => setCreateData('password', e.target.value)}
                                    required
                                />
                                <InputError message={createErrors.password} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="create_role" value="Role" />
                                <select
                                    id="create_role"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    value={createData.role}
                                    onChange={(e) => setCreateData('role', e.target.value)}
                                    required
                                >
                                    <option value="student">Student</option>
                                    <option value="faculty">Faculty</option>
                                    <option value="club_admin">Club Admin</option>
                                    <option value="admin">Admin</option>
                                </select>
                                <InputError message={createErrors.role} className="mt-2" />
                            </div>

                            <div className="mt-6 flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowCreateModal(false);
                                        resetCreate();
                                    }}
                                    className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <PrimaryButton disabled={createProcessing}>
                                    Create User
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit User Modal */}
            {showEditModal && editingUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                        <h3 className="mb-4 text-lg font-semibold text-gray-900">Edit User</h3>
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div>
                                <InputLabel htmlFor="edit_name" value="Name" />
                                <TextInput
                                    id="edit_name"
                                    className="mt-1 block w-full"
                                    value={editData.name}
                                    onChange={(e) => setEditData('name', e.target.value)}
                                    required
                                />
                                <InputError message={editErrors.name} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="edit_email" value="Email" />
                                <TextInput
                                    id="edit_email"
                                    type="email"
                                    className="mt-1 block w-full"
                                    value={editData.email}
                                    onChange={(e) => setEditData('email', e.target.value)}
                                    required
                                />
                                <InputError message={editErrors.email} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="edit_role" value="Role" />
                                <select
                                    id="edit_role"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    value={editData.role}
                                    onChange={(e) => setEditData('role', e.target.value)}
                                    required
                                >
                                    <option value="student">Student</option>
                                    <option value="faculty">Faculty</option>
                                    <option value="club_admin">Club Admin</option>
                                    <option value="admin">Admin</option>
                                </select>
                                <InputError message={editErrors.role} className="mt-2" />
                            </div>

                            <div className="mt-6 flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowEditModal(false);
                                        setEditingUser(null);
                                    }}
                                    className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <PrimaryButton disabled={editProcessing}>
                                    Update User
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
