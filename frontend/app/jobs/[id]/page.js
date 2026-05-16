'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getJobById, updateJobStatus, deleteJob } from '../../../services/api';
import LoadingSpinner from '../../../components/LoadingSpinner';
import Toast from '../../../components/Toast';

export default function JobDetail({ params }) {
  const router = useRouter();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  const statuses = ['Open', 'In Progress', 'Closed'];

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    try {
      setLoading(true);
      const data = await getJobById(params.id);
      setJob(data.data);
      setSelectedStatus(data.data.status);
    } catch (err) {
      setToast({
        show: true,
        message: 'Failed to load job details',
        type: 'error',
      });
      console.error('Error fetching job:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    if (selectedStatus === job.status) {
      setToast({
        show: true,
        message: 'Status is already set to ' + selectedStatus,
        type: 'error',
      });
      return;
    }

    try {
      setUpdating(true);
      const data = await updateJobStatus(params.id, selectedStatus);
      setJob(data.data);
      setToast({
        show: true,
        message: 'Status updated successfully!',
        type: 'success',
      });
    } catch (err) {
      setToast({
        show: true,
        message: err.response?.data?.message || 'Failed to update status',
        type: 'error',
      });
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteJob(params.id);
      setToast({
        show: true,
        message: 'Job deleted successfully!',
        type: 'success',
      });
      setTimeout(() => {
        router.push('/');
      }, 1500);
    } catch (err) {
      setToast({
        show: true,
        message: err.response?.data?.message || 'Failed to delete job',
        type: 'error',
      });
      setShowDeleteConfirm(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'Closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Plumbing':
        return '🔧';
      case 'Electrical':
        return '⚡';
      case 'Painting':
        return '🎨';
      case 'Joinery':
        return '🪚';
      default:
        return '🛠️';
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!job) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          Job not found
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button
        onClick={() => router.push('/')}
        className="mb-6 text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-2"
      >
        ← Back to Jobs
      </button>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {job.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-2xl">{getCategoryIcon(job.category)}</span>
                <span className="text-lg font-medium text-gray-700">
                  {job.category}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(job.status)}`}>
                  {job.status}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Description
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {job.description}
              </p>
            </div>

            {job.location && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Location
                </h2>
                <p className="text-gray-700">📍 {job.location}</p>
              </div>
            )}

            {(job.contactName || job.contactEmail) && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Contact Information
                </h2>
                <div className="space-y-1">
                  {job.contactName && (
                    <p className="text-gray-700">👤 {job.contactName}</p>
                  )}
                  {job.contactEmail && (
                    <p className="text-gray-700">
                      ✉️{' '}
                      <a
                        href={`mailto:${job.contactEmail}`}
                        className="text-indigo-600 hover:underline"
                      >
                        {job.contactEmail}
                      </a>
                    </p>
                  )}
                </div>
              </div>
            )}

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Posted
              </h2>
              <p className="text-gray-700">
                {new Date(job.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Update Status
            </h2>
            <div className="flex flex-wrap gap-4">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <button
                onClick={handleStatusUpdate}
                disabled={updating || selectedStatus === job.status}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {updating ? 'Updating...' : 'Update Status'}
              </button>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
            >
              Delete Job
            </button>
          </div>
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Confirm Delete
            </h3>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this job? This action cannot be undone.
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ show: false, message: '', type: '' })}
        />
      )}
    </div>
  );
}
