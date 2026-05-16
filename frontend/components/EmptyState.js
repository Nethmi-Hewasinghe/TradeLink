export default function EmptyState() {
  return (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">📋</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        No jobs found
      </h3>
      <p className="text-gray-600 mb-6">
        There are no service requests matching your criteria.
      </p>
      <a
        href="/new-job"
        className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
      >
        Post the First Job
      </a>
    </div>
  );
}
