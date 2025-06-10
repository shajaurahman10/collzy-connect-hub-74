// COLLEGE TEMPLATE - Copy this format to add new colleges to any regional file
// Just copy this structure and fill in the real data

// IMPORTANT: Make sure the ID is unique across ALL files (use priv-XXX format where XXX is the next number)
// IMPORTANT: Use real college data - verify website, phone, email, and city/state information

export const newCollegeTemplate = {
  id: "priv-XXX", // Replace XXX with next available number (currently up to 110)
  name: "Real College Name",
  city: "Real City Name",
  state: "Real State Name",
  type: "Private", // Keep as "Private" for private colleges
  established_year: 2000, // Real establishment year
  naac_grade: "A", // A++, A+, A, B++, B+, B, C, or "Not Rated"
  website: "www.realcollegewebsite.edu", // Real website URL
  admission_email: "admissions@realcollegewebsite.edu", // Real admission email
  phone: "+91-XXX-XXXXXXX", // Real phone number with country code
  affiliation: "UGC", // UGC, AICTE, VTU, Anna University, etc.
  courses_offered: ["B.Tech", "MBA", "BBA", "B.Com"], // Array of real courses
  total_fees: 150000, // Annual fees in INR
  hostel_available: true, // true or false
  placement_percentage: 85, // Percentage (0-100)
  average_package: 5.5, // In lakhs INR
  highest_package: 18, // In lakhs INR
  student_strength: 4500, // Total students
  created_at: "2024-01-01T00:00:00Z" // Keep this same for all entries
};

// HOW TO ADD NEW COLLEGES:
// 1. Go to the appropriate regional file:
//    - North India: src/data/northIndiaPrivateColleges.ts
//    - West India: src/data/westIndiaPrivateColleges.ts
//    - South India: src/data/southIndiaPrivateColleges.ts
//    - Central India: src/data/centralIndiaPrivateColleges.ts
//    - East India: src/data/eastIndiaPrivateColleges.ts
//    - Karnataka/Bangalore: src/data/karnatakaBangalorePrivateColleges.ts
//    - Hyderabad/Chennai: src/data/hyderabadChennaiPrivateColleges.ts

// 2. Add your new college object to the array (before the closing ];)

// 3. Make sure to use a unique ID number (next available is priv-111)

// 4. Verify all information is real and accurate

// 5. Save the file - the college will automatically appear on the website!

// EXAMPLE OF ADDING TO northIndiaPrivateColleges.ts:
/*
export const northIndiaPrivateColleges = [
  // ... existing colleges ...
  {
    id: "priv-111",
    name: "Your New College Name",
    city: "Delhi",
    state: "Delhi",
    type: "Private",
    established_year: 2005,
    naac_grade: "A",
    website: "www.yournewcollege.edu",
    admission_email: "admissions@yournewcollege.edu",
    phone: "+91-11-12345678",
    affiliation: "UGC",
    courses_offered: ["B.Tech", "MBA"],
    total_fees: 180000,
    hostel_available: true,
    placement_percentage: 88,
    average_package: 6.0,
    highest_package: 20,
    student_strength: 3000,
    created_at: "2024-01-01T00:00:00Z"
  }
];
*/
