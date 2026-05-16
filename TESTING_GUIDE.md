# Testing Guide

## Manual Testing Checklist

### Backend API Testing

You can test the API using tools like Postman, Insomnia, or curl.

#### 1. Health Check
```bash
GET http://localhost:5000/api/health
```
Expected: `{ "success": true, "message": "Server is running" }`

#### 2. Get All Jobs
```bash
GET http://localhost:5000/api/jobs
```
Expected: Array of jobs with 200 status

#### 3. Filter by Category
```bash
GET http://localhost:5000/api/jobs?category=Plumbing
```
Expected: Only plumbing jobs

#### 4. Filter by Status
```bash
GET http://localhost:5000/api/jobs?status=Open
```
Expected: Only open jobs

#### 5. Search Jobs
```bash
GET http://localhost:5000/api/jobs?search=kitchen
```
Expected: Jobs with "kitchen" in title or description

#### 6. Create New Job
```bash
POST http://localhost:5000/api/jobs
Content-Type: application/json

{
  "title": "Test Job",
  "description": "This is a test job",
  "category": "Plumbing",
  "location": "Test City",
  "contactName": "Test User",
  "contactEmail": "test@example.com"
}
```
Expected: 201 status with created job

#### 7. Get Single Job
```bash
GET http://localhost:5000/api/jobs/{job_id}
```
Expected: Single job object

#### 8. Update Job Status
```bash
PATCH http://localhost:5000/api/jobs/{job_id}
Content-Type: application/json

{
  "status": "In Progress"
}
```
Expected: 200 status with updated job

#### 9. Delete Job
```bash
DELETE http://localhost:5000/api/jobs/{job_id}
```
Expected: 200 status with success message

#### 10. Error Cases

**Invalid Job ID:**
```bash
GET http://localhost:5000/api/jobs/invalid_id
```
Expected: 404 error

**Missing Required Fields:**
```bash
POST http://localhost:5000/api/jobs
Content-Type: application/json

{
  "title": "Test"
}
```
Expected: 400 error with validation message

**Invalid Email:**
```bash
POST http://localhost:5000/api/jobs
Content-Type: application/json

{
  "title": "Test",
  "description": "Test",
  "category": "Plumbing",
  "contactEmail": "invalid-email"
}
```
Expected: 400 error

### Frontend Testing

#### 1. Home Page Tests

**Test: Page Loads**
- Navigate to `http://localhost:3000`
-  Page loads without errors
-  Navigation bar is visible
-  "Service Request Board" title is displayed
-  "Post New Job" button is visible

**Test: Jobs Display**
-  Jobs are displayed as cards
-  Each card shows title, category, status, location
-  Category icons are displayed
-  Status badges have correct colors

**Test: Empty State**
- Clear all filters
- If no jobs exist:
  -  Empty state message is displayed
  -  "Post the First Job" button is visible

**Test: Filters**
-  Category dropdown works
-  Status dropdown works
-  Search input works
-  Filters update job list
-  "Clear all filters" button appears when filters are active
-  Clear button resets all filters

**Test: Search**
- Type "kitchen" in search
-  Only jobs with "kitchen" in title/description show
- Clear search
-  All jobs return

**Test: Navigation**
- Click on a job card
-  Navigates to job detail page

#### 2. New Job Page Tests

**Test: Page Loads**
- Click "Post New Job" button
-  Form is displayed
-  All fields are present
-  Cancel button works

**Test: Form Validation**
- Try to submit empty form
-  Validation errors appear
-  Required fields are marked

**Test: Email Validation**
- Enter invalid email
-  Email validation error appears
- Enter valid email
-  Error clears

**Test: Create Job**
- Fill all required fields:
  - Title: "Test Kitchen Repair"
  - Description: "Need urgent kitchen repair"
  - Category: "Plumbing"
  - Location: "London"
  - Contact Name: "John Doe"
  - Contact Email: "john@example.com"
- Click "Create Job Request"
-  Loading state appears
-  Success toast appears
-  Redirects to home page
-  New job appears in list

**Test: Cancel**
- Click "Cancel" button
-  Returns to home page
-  No job is created

#### 3. Job Detail Page Tests

**Test: Page Loads**
- Click on any job card
-  Detail page loads
-  All job information is displayed
-  Back button is visible
-  Status dropdown is visible
-  Update button is visible
-  Delete button is visible

**Test: Job Information Display**
-  Title is displayed
-  Category with icon is displayed
-  Status badge is displayed
-  Description is displayed
-  Location is displayed (if exists)
-  Contact name is displayed (if exists)
-  Contact email is displayed (if exists)
-  Posted date is displayed

**Test: Update Status**
-  Change status in dropdown
-  Click "Update Status"
-  Loading state appears
-  Success toast appears
-  Status badge updates
-  Try to update to same status
-  Error message appears

**Test: Delete Job**
- Click "Delete Job" button
-  Confirmation modal appears
- Click "Cancel"
-  Modal closes, job not deleted
- Click "Delete Job" again
- Click "Delete" in modal
-  Success toast appears
-  Redirects to home page
-  Job is removed from list

**Test: Back Button**
- Click "← Back to Jobs"
-  Returns to home page

#### 4. Responsive Design Tests

**Test: Mobile View (< 768px)**
- Resize browser to mobile size
-  Navigation is responsive
-  Job cards stack vertically
-  Filters stack vertically
-  Form is usable
-  Buttons are accessible

**Test: Tablet View (768px - 1024px)**
- Resize browser to tablet size
-  Job cards display in 2 columns
-  Layout is balanced

**Test: Desktop View (> 1024px)**
- Resize browser to desktop size
-  Job cards display in 3 columns
-  Maximum width is maintained

#### 5. Error Handling Tests

**Test: Backend Offline**
- Stop backend server
- Refresh frontend
-  Error message is displayed
- Start backend server
- Refresh page
-  Jobs load normally

**Test: Invalid Job ID**
- Navigate to `http://localhost:3000/jobs/invalid_id`
-  Error message or "Job not found" is displayed

**Test: Network Error**
- Disconnect internet (or use browser DevTools to simulate)
- Try to create a job
-  Error toast appears with appropriate message

### Integration Testing

#### Test: Complete User Flow

**Scenario: Homeowner Posts a Job**
1.  Open home page
2.  Click "Post New Job"
3.  Fill form with job details
4.  Submit form
5.  See success message
6.  Return to home page
7.  See new job in list

**Scenario: Tradesperson Browses Jobs**
1.  Open home page
2.  See list of available jobs
3.  Filter by category "Plumbing"
4.  See only plumbing jobs
5.  Click on a job
6.  View full details
7.  See contact information

**Scenario: Tradesperson Updates Job Status**
1.  Open job detail page
2.  Change status to "In Progress"
3.  Click "Update Status"
4.  See success message
5.  Status badge updates
6.  Return to home page
7.  Filter by "In Progress"
8.  See updated job

**Scenario: Complete Job and Delete**
1.  Open job detail page
2.  Update status to "Closed"
3.  Click "Delete Job"
4.  Confirm deletion
5.  Return to home page
6.  Job is removed from list

### Performance Testing

**Test: Load Time**
-  Home page loads in < 2 seconds
-  Job detail page loads in < 1 second
-  Form submission completes in < 2 seconds

**Test: Multiple Jobs**
- Seed database with 50+ jobs
-  Home page loads without lag
-  Filtering is responsive
-  Search is fast

### Browser Compatibility

Test in multiple browsers:
-  Chrome
-  Firefox
-  Safari
-  Edge

### Accessibility Testing

**Test: Keyboard Navigation**
-  Can tab through all interactive elements
-  Can submit forms with Enter key
-  Can close modals with Escape key

**Test: Screen Reader**
-  Form labels are properly associated
-  Buttons have descriptive text
-  Error messages are announced

## Automated Testing (Future Enhancement)

For production, consider adding:
- Jest for unit tests
- React Testing Library for component tests
- Cypress for E2E tests
- Supertest for API tests

## Bug Report Template

If you find any issues:

```
**Bug Description:**
[Describe the bug]

**Steps to Reproduce:**
1. [First step]
2. [Second step]
3. [...]

**Expected Behavior:**
[What should happen]

**Actual Behavior:**
[What actually happens]

**Environment:**
- Browser: [e.g., Chrome 120]
- OS: [e.g., Windows 11]
- Node Version: [e.g., 18.17.0]

**Screenshots:**
[If applicable]
```

---

## Testing Completion Checklist

- [ ] All backend endpoints tested
- [ ] All frontend pages tested
- [ ] All user flows tested
- [ ] Responsive design tested
- [ ] Error handling tested
- [ ] Browser compatibility tested
- [ ] Performance is acceptable
- [ ] No console errors
- [ ] All features working as expected


