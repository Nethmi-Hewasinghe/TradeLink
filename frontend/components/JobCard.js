import Link from 'next/link';

export default function JobCard({ job }) {
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

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <Link href={`/jobs/${job._id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 h-full cursor-pointer border border-gray-100 hover:border-indigo-200">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{getCategoryIcon(job.category)}</span>
            <span className="text-sm font-medium text-gray-600">
              {job.category}
            </span>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
              job.status
            )}`}
          >
            {job.status}
          </span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {job.title}
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-3">
          {truncateText(job.description, 120)}
        </p>

        {job.location && (
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <span className="mr-1">📍</span>
            {job.location}
          </div>
        )}

        <div className="text-xs text-gray-400 pt-3 border-t border-gray-100">
          Posted {new Date(job.createdAt).toLocaleDateString()}
        </div>
      </div>
    </Link>
  );
}
