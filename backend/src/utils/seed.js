require('dotenv').config();
const mongoose = require('mongoose');
const JobRequest = require('../models/JobRequest');
const connectDB = require('../config/db');

const sampleJobs = [
  {
    title: 'Kitchen Sink Leak Repair',
    description: 'My kitchen sink has been leaking for the past week. Water is dripping from under the sink and I need someone to fix it urgently.',
    category: 'Plumbing',
    location: 'Colombo, Sri Lanka',
    contactName: 'Sarah Johnson',
    contactEmail: 'sarah.j@email.com',
    status: 'Open',
  },
  {
    title: 'Electrical Outlet Installation',
    description: 'Need to install 3 new electrical outlets in the living room for home office setup. Must comply with safety standards.',
    category: 'Electrical',
    location: 'Kandy, Sri Lanka',
    contactName: 'Michael Brown',
    contactEmail: 'mbrown@email.com',
    status: 'In Progress',
  },
  {
    title: 'Bedroom Wall Painting',
    description: 'Looking for a professional painter to paint two bedrooms. Walls are already prepared and ready for painting.',
    category: 'Painting',
    location: 'Galle, Sri Lanka',
    contactName: 'Emma Wilson',
    contactEmail: 'emma.wilson@email.com',
    status: 'Open',
  },
  {
    title: 'Custom Kitchen Cabinets',
    description: 'Need custom-built kitchen cabinets to fit a specific space. Looking for experienced joiner with portfolio.',
    category: 'Joinery',
    location: 'Gampaha, Sri Lanka',
    contactName: 'David Smith',
    contactEmail: 'david.smith@email.com',
    status: 'Open',
  },
  {
    title: 'Bathroom Shower Installation',
    description: 'Complete shower installation needed including plumbing work and tiling. Bathroom is ready for installation.',
    category: 'Plumbing',
    location: 'Jaffna, Sri Lanka',
    contactName: 'Lisa Anderson',
    contactEmail: 'lisa.a@email.com',
    status: 'Closed',
  },
  {
    title: 'Outdoor Deck Staining',
    description: 'Large outdoor deck needs professional staining. Approximately 200 square feet. Weather-resistant stain preferred.',
    category: 'Painting',
    location: 'Kosgama, Sri Lanka',
    contactName: 'James Taylor',
    contactEmail: 'jtaylor@email.com',
    status: 'Open',
  },
  {
    title: 'Light Fixture Replacement',
    description: 'Replace old ceiling light fixtures in 4 rooms with new modern LED fixtures. Fixtures already purchased.',
    category: 'Electrical',
    location: 'Malabe, Sri Lanka',
    contactName: 'Rachel Green',
    contactEmail: 'rachel.green@email.com',
    status: 'Open',
  },
  {
    title: 'Built-in Wardrobe Construction',
    description: 'Need a built-in wardrobe constructed for master bedroom. Measurements and design already finalized.',
    category: 'Joinery',
    location: 'Kadawatha, Sri Lanka',
    contactName: 'Tom Harris',
    contactEmail: 'tom.harris@email.com',
    status: 'In Progress',
  },
  {
    title: 'Exterior House Painting',
    description: 'Full exterior house painting needed. Two-story house, approximately 2000 sq ft. Surface preparation required.',
    category: 'Painting',
    location: 'Kurunegala, Sri Lanka',
    contactName: 'Sophie Martin',
    contactEmail: 'sophie.m@email.com',
    status: 'Open',
  },
  {
    title: 'Boiler Repair Service',
    description: 'Central heating boiler not working properly. Making strange noises and not heating water efficiently.',
    category: 'Plumbing',
    location: 'Chilaw, Sri Lanka',
    contactName: 'Peter Clark',
    contactEmail: 'peter.clark@email.com',
    status: 'Open',
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();
    
    // Clear existing data
    await JobRequest.deleteMany();
    console.log('Existing jobs cleared');
    
    // Insert sample data
    await JobRequest.insertMany(sampleJobs);
    console.log('Sample jobs inserted successfully');
    
    console.log(`${sampleJobs.length} jobs added to database`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
