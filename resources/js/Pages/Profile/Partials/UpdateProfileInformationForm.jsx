import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;
    const roleData = usePage().props.roleData;
    const [previewUrl, setPreviewUrl] = useState(null);

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            phone: user.phone || '',
            bio: user.bio || '',
            profile_picture: null,
            _method: 'patch',

            // Student fields
            student_id: roleData?.student_id || '',
            department: roleData?.department || '',
            year: roleData?.year || '',
            semester: roleData?.semester || '',

            // Faculty fields
            faculty_id: roleData?.faculty_id || '',
            designation: roleData?.designation || '',
            specialization: roleData?.specialization || '',

            // Admin fields
            admin_level: roleData?.admin_level || '',

            // Club Admin fields
            club_name: roleData?.club_name || '',
            club_type: roleData?.club_type || '',
            position: roleData?.position || '',
        });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('profile_picture', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('profile.update'), {
            forceFormData: true,
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                {/* Profile Picture */}
                <div>
                    <InputLabel htmlFor="profile_picture" value="Profile Picture" />
                    <div className="mt-2 flex items-center space-x-4">
                        <div className="flex-shrink-0">
                            {previewUrl || user.profile_picture ? (
                                <img
                                    src={previewUrl || `/storage/${user.profile_picture}`}
                                    alt="Profile"
                                    className="h-20 w-20 rounded-full object-cover border-2 border-gray-300"
                                />
                            ) : (
                                <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center">
                                    <svg className="h-12 w-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="profile_picture"
                                className="cursor-pointer rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                                Change Photo
                                <input
                                    id="profile_picture"
                                    name="profile_picture"
                                    type="file"
                                    accept="image/*"
                                    className="sr-only"
                                    onChange={handleImageChange}
                                />
                            </label>
                            <p className="mt-1 text-xs text-gray-500">JPG, PNG, GIF up to 2MB</p>
                        </div>
                    </div>
                    <InputError className="mt-2" message={errors.profile_picture} />
                </div>

                <div>
                    <InputLabel htmlFor="name" value="Name" />
                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />
                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />
                    <InputError className="mt-2" message={errors.email} />
                </div>

                <div>
                    <InputLabel htmlFor="phone" value="Phone Number" />
                    <TextInput
                        id="phone"
                        type="tel"
                        className="mt-1 block w-full"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        autoComplete="tel"
                    />
                    <InputError className="mt-2" message={errors.phone} />
                </div>

                <div>
                    <InputLabel htmlFor="bio" value="Bio" />
                    <textarea
                        id="bio"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={data.bio}
                        onChange={(e) => setData('bio', e.target.value)}
                        rows="3"
                        maxLength="500"
                    />
                    <InputError className="mt-2" message={errors.bio} />
                </div>

                {/* Role-specific fields */}
                {user.role === 'student' && (
                    <>
                        <div className="border-t pt-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Student Information</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <InputLabel htmlFor="student_id" value="Student ID" />
                                <TextInput
                                    id="student_id"
                                    className="mt-1 block w-full"
                                    value={data.student_id}
                                    onChange={(e) => setData('student_id', e.target.value)}
                                />
                                <InputError className="mt-2" message={errors.student_id} />
                            </div>
                            <div>
                                <InputLabel htmlFor="department" value="Department" />
                                <TextInput
                                    id="department"
                                    className="mt-1 block w-full"
                                    value={data.department}
                                    onChange={(e) => setData('department', e.target.value)}
                                />
                                <InputError className="mt-2" message={errors.department} />
                            </div>
                            <div>
                                <InputLabel htmlFor="year" value="Year" />
                                <TextInput
                                    id="year"
                                    className="mt-1 block w-full"
                                    value={data.year}
                                    onChange={(e) => setData('year', e.target.value)}
                                />
                                <InputError className="mt-2" message={errors.year} />
                            </div>
                            <div>
                                <InputLabel htmlFor="semester" value="Semester" />
                                <TextInput
                                    id="semester"
                                    className="mt-1 block w-full"
                                    value={data.semester}
                                    onChange={(e) => setData('semester', e.target.value)}
                                />
                                <InputError className="mt-2" message={errors.semester} />
                            </div>
                        </div>
                    </>
                )}

                {user.role === 'faculty' && (
                    <>
                        <div className="border-t pt-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Faculty Information</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <InputLabel htmlFor="faculty_id" value="Faculty ID" />
                                <TextInput
                                    id="faculty_id"
                                    className="mt-1 block w-full"
                                    value={data.faculty_id}
                                    onChange={(e) => setData('faculty_id', e.target.value)}
                                />
                                <InputError className="mt-2" message={errors.faculty_id} />
                            </div>
                            <div>
                                <InputLabel htmlFor="department" value="Department" />
                                <TextInput
                                    id="department"
                                    className="mt-1 block w-full"
                                    value={data.department}
                                    onChange={(e) => setData('department', e.target.value)}
                                />
                                <InputError className="mt-2" message={errors.department} />
                            </div>
                            <div>
                                <InputLabel htmlFor="designation" value="Designation" />
                                <TextInput
                                    id="designation"
                                    className="mt-1 block w-full"
                                    value={data.designation}
                                    onChange={(e) => setData('designation', e.target.value)}
                                />
                                <InputError className="mt-2" message={errors.designation} />
                            </div>
                            <div>
                                <InputLabel htmlFor="specialization" value="Specialization" />
                                <TextInput
                                    id="specialization"
                                    className="mt-1 block w-full"
                                    value={data.specialization}
                                    onChange={(e) => setData('specialization', e.target.value)}
                                />
                                <InputError className="mt-2" message={errors.specialization} />
                            </div>
                        </div>
                    </>
                )}

                {user.role === 'admin' && (
                    <>
                        <div className="border-t pt-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Admin Information</h3>
                        </div>
                        <div>
                            <InputLabel htmlFor="admin_level" value="Admin Level" />
                            <TextInput
                                id="admin_level"
                                className="mt-1 block w-full"
                                value={data.admin_level}
                                onChange={(e) => setData('admin_level', e.target.value)}
                            />
                            <InputError className="mt-2" message={errors.admin_level} />
                        </div>
                    </>
                )}

                {user.role === 'club_admin' && (
                    <>
                        <div className="border-t pt-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Club Admin Information</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <InputLabel htmlFor="club_name" value="Club Name" />
                                <TextInput
                                    id="club_name"
                                    className="mt-1 block w-full"
                                    value={data.club_name}
                                    onChange={(e) => setData('club_name', e.target.value)}
                                />
                                <InputError className="mt-2" message={errors.club_name} />
                            </div>
                            <div>
                                <InputLabel htmlFor="club_type" value="Club Type" />
                                <TextInput
                                    id="club_type"
                                    className="mt-1 block w-full"
                                    value={data.club_type}
                                    onChange={(e) => setData('club_type', e.target.value)}
                                />
                                <InputError className="mt-2" message={errors.club_type} />
                            </div>
                            <div>
                                <InputLabel htmlFor="position" value="Position" />
                                <TextInput
                                    id="position"
                                    className="mt-1 block w-full"
                                    value={data.position}
                                    onChange={(e) => setData('position', e.target.value)}
                                />
                                <InputError className="mt-2" message={errors.position} />
                            </div>
                        </div>
                    </>
                )}

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">
                            Saved.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
