import React from 'react';

function About() {
  return (
    <div className="p-6 max-w-4xl mx-auto text-gray-800">
      <h1 className="text-3xl font-bold mb-4">About the Student Attendance Management System</h1>

      <p className="mb-4">
        The <strong>Student Attendance Management System</strong> is a comprehensive web-based application designed to streamline and digitize the attendance process in educational institutions. It caters to the needs of both students and faculty by providing an intuitive interface, real-time updates, and efficient data handling.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Purpose</h2>
      <p className="mb-4">
        The system was developed to reduce manual workload, eliminate paperwork, and improve the accuracy and accessibility of attendance records. It ensures transparency between students and teachers while enabling effective monitoring of attendance data.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Key Features</h2>
      
      <h3 className="text-xl font-semibold mt-4 mb-2">🧑‍🎓 For Students:</h3>
      <ul className="list-disc list-inside mb-4">
        <li>View Enrolled Classes</li>
        <li>Attendance Summary with total working days, days present, and percentage</li>
      </ul>

      <h3 className="text-xl font-semibold mt-4 mb-2">👨‍🏫 For Teachers:</h3>
      <ul className="list-disc list-inside mb-4">
        <li>Select and manage assigned classes</li>
        <li>Mark attendance quickly and accurately</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Technical Overview</h2>
      <ul className="list-disc list-inside mb-4">
        <li><strong>Frontend:</strong> React.js</li>
        <li><strong>Backend:</strong> Node.js & Express.js</li>
        <li><strong>Database:</strong> MongoDB</li>
        <li><strong>Authentication:</strong> Role-based secured login system</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Benefits</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Reduces manual errors in attendance tracking</li>
        <li>Generates quick attendance reports</li>
        <li>Improves transparency and accountability</li>
        <li>Centralizes attendance-related operations</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Future Enhancements</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Biometric or QR code-based automatic attendance</li>
        <li>Admin dashboard for institutional analytics</li>
        <li>Notifications for low attendance and leave updates</li>
      </ul>
    </div>
  );
}

export default About;
