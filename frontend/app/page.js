'use client';

import { useState, useEffect, useRef } from 'react';
import { getAllJobs } from '../services/api';
import JobCard from '../components/JobCard';
import FilterBar from '../components/FilterBar';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [filterLoading, setFilterLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    search: '',
  });

  const debounceTimer = useRef(null);
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      fetchJobs();
    }, 400);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [filters]);

  const fetchJobs = async () => {
    try {
      if (isFirstLoad.current) {
        setInitialLoading(true);
      } else {
        setFilterLoading(true);
      }

      setError(null);

      const data = await getAllJobs(filters);
      setJobs(data.data || []);
    } catch (err) {
      setError('Failed to load jobs. Please try again later.');
      console.error('Error fetching jobs:', err);
    } finally {
      setInitialLoading(false);
      setFilterLoading(false);
      isFirstLoad.current = false;
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  if (initialLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Available Service Requests
        </h2>
        <p className="text-gray-600">
          Browse available homeowner service requests
        </p>
      </div>

      <FilterBar filters={filters} onFilterChange={handleFilterChange} />

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {filterLoading && (
        <p className="text-sm text-gray-500 mb-4">Updating results...</p>
      )}

      {jobs.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}