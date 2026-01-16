import { useState } from 'react';
import { useGetUsersQuery, useDeleteUserMutation, useUpdateUserMutation } from '../../slices/usersApiSlice';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Shield, User as UserIcon } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const AdminUsers = () => {
    const { data: users, isLoading, refetch } = useGetUsersQuery({});
    const [deleteUser] = useDeleteUserMutation();
    const [updateUser] = useUpdateUserMutation();
    const [editingUser, setEditingUser] = useState<any>(null);

    const deleteHandler = async (id: string, name: string) => {
        if (window.confirm(`Are you sure you want to delete ${name}?`)) {
            try {
                await deleteUser(id).unwrap();
                toast.success('User deleted successfully!');
                refetch();
            } catch (err: any) {
                toast.error(err?.data?.message || 'Failed to delete user');
            }
        }
    };

    const toggleAdminHandler = async (user: any) => {
        try {
            await updateUser({
                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: !user.isAdmin,
            }).unwrap();
            toast.success(`${user.name} is now ${!user.isAdmin ? 'an admin' : 'a regular user'}`);
            refetch();
        } catch (err: any) {
            toast.error(err?.data?.message || 'Failed to update user');
        }
    };

    if (isLoading) return <div className="pt-32 text-center">Loading...</div>;

    return (
        <div className="pt-24 pb-12 bg-gradient-to-br from-secondary-latte via-white to-secondary-latte min-h-screen">
            <Toaster position="top-right" />
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-8">
                    <h1 className="text-4xl font-serif font-bold text-primary-espresso mb-2">User Management</h1>
                    <p className="text-gray-600">Manage all registered users and their permissions</p>
                </div>

                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-primary-brown to-primary-espresso text-primary-cream">
                                <tr>
                                    <th className="text-left py-5 px-6 font-bold">User</th>
                                    <th className="text-left py-5 px-6 font-bold">Email</th>
                                    <th className="text-left py-5 px-6 font-bold">Role</th>
                                    <th className="text-left py-5 px-6 font-bold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users?.map((user: any, index: number) => (
                                    <tr key={user._id} className={`border-b hover:bg-gradient-to-r hover:from-accent-gold/5 hover:to-transparent transition-all ${index % 2 === 0 ? 'bg-gray-50/50' : ''}`}>
                                        <td className="py-5 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-gold to-accent-mocha flex items-center justify-center text-white font-bold">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-primary-espresso">{user.name}</p>
                                                    <p className="text-xs text-gray-500">ID: {user._id.slice(-8)}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-5 px-6 text-gray-700">{user.email}</td>
                                        <td className="py-5 px-6">
                                            {user.isAdmin ? (
                                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 border border-purple-300">
                                                    <Shield size={16} />
                                                    Admin
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 border border-blue-300">
                                                    <UserIcon size={16} />
                                                    Customer
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-5 px-6">
                                            <div className="flex gap-2">
                                                <button 
                                                    onClick={() => toggleAdminHandler(user)}
                                                    className="p-2.5 bg-gradient-to-r from-purple-100 to-purple-200 text-purple-600 rounded-lg hover:from-purple-200 hover:to-purple-300 transition-all shadow-sm hover:shadow-md"
                                                    title={user.isAdmin ? 'Remove admin' : 'Make admin'}
                                                >
                                                    <Shield size={18} />
                                                </button>
                                                <button 
                                                    onClick={() => deleteHandler(user._id, user.name)}
                                                    className="p-2.5 bg-gradient-to-r from-red-100 to-red-200 text-red-600 rounded-lg hover:from-red-200 hover:to-red-300 transition-all shadow-sm hover:shadow-md"
                                                    disabled={user.isAdmin}
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-8 flex items-center justify-between">
                    <Link to="/admin" className="text-accent-gold font-bold hover:text-accent-mocha transition-colors flex items-center gap-2">
                        ← Back to Dashboard
                    </Link>
                    <p className="text-gray-600">Total Users: <span className="font-bold text-primary-espresso">{users?.length || 0}</span></p>
                </div>
            </div>
        </div>
    );
};

export default AdminUsers;
