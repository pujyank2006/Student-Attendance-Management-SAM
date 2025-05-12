import { React, useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';


const MODAL_STYLES = {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#dfedfe',
    padding: '20px',
    zIndex: 1000,
    width: '600px',
    borderRadius: '8px',
    position: 'relative',
};

const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .7)',
    zIndex: 1000,
};

const BUTTON_STYLE = {
    backgroundColor: '#7E8BFF',
    border: 'none',
    color: 'white',
    padding: '5px 10px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '4px',
    position: 'absolute',
    top: '10px',
    right: '10px',
};

const DROPDOWN_CONTAINER_STYLE = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '20px',
    marginBottom: '15px',
};

const PIE_STYLES = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '20px',
    marginBottom: '15px',
}

const DETAILS_STYLES = {
    display: 'flex',
    flexDirection: 'column',
    margin: '40px',
}

function MarkAttendance({ open, onClose }) {
    const [classList, setClassList] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [attendanceData, setAttendanceData] = useState(null);

    useEffect(() => {
        const id = localStorage.getItem('id');
        if (id) {
            fetch('http://localhost:8080/usersub')
                .then((res) => res.json())
                .then((data) => {
                    const student = data.find(
                        (t) => t.role === 'student' && t.id === id
                    );

                    if (student && student.course_name) {
                        setClassList(student.course_name);
                        console.log('student courses:', student.course_name);
                    } else {
                        console.warn('No courses found for student');
                        setClassList([]);
                    }
                })
                .catch((err) => console.error('Error fetching student data:', err));
        }
    }, []);

    useEffect(() => {
        const id = localStorage.getItem('id');
        if (selectedCourse && id) {
            fetch(`http://localhost:8080/attendanceDetails/check/${id}`)
                .then((res) => res.json())
                .then((data) => {
                    const matchedCourse = data.details.find(d => d.className === selectedCourse);
                    if (matchedCourse) {
                        setAttendanceData(matchedCourse);
                    } else {
                        setAttendanceData(null);
                    }
                })
                .catch((err) => console.error('Error fetching attendance:', err));
        }
    }, [selectedCourse]);


    if (!open) return null;

    return (
        <>
            <div style={OVERLAY_STYLES}>
                <div style={MODAL_STYLES}>
                    <button onClick={onClose} style={BUTTON_STYLE}>X</button>

                    <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold">Check Attendance</h3>
                    </div>

                    <div style={DROPDOWN_CONTAINER_STYLE}>
                        <div className="flex items-center space-x-2">
                            <label htmlFor="classSelect" className="font-medium">
                                Choose the class:
                            </label>
                            <select
                                id="classSelect"
                                value={selectedCourse}
                                onChange={(e) => setSelectedCourse(e.target.value)}
                                className="border px-2 py-1 rounded"
                            >
                                <option value="">--Select a class--</option>
                                {classList.map((courseName) => (
                                    <option key={courseName} value={courseName}>
                                        {courseName}
                                    </option>
                                ))}
                            </select>
                            {attendanceData && (
                                <div style={PIE_STYLES}>
                                    <PieChart width={200} height={400}>
                                        <Pie
                                            data={[
                                                { name: 'Present', value: attendanceData.PresentDays },
                                                { name: 'Absent', value: attendanceData.PresentDays - attendanceData.WorkingDays },
                                            ]}
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={100}
                                            fill="#8884d8"
                                            dataKey="value"
                                            label
                                        >
                                            <Cell fill="#18cc2a" />
                                            <Cell fill="#f22222" />
                                        </Pie>
                                        <Tooltip />
                                        <Legend />
                                    </PieChart>
                                    <div style={DETAILS_STYLES}>
                                        <p><strong>Class:</strong> {attendanceData.className}</p>
                                        <p><strong>Working Days:</strong> {attendanceData.WorkingDays}</p>
                                        <p><strong>Present Days:</strong> {attendanceData.PresentDays}</p>
                                        <p><strong>Attendance %:</strong> {((attendanceData.PresentDays / attendanceData.WorkingDays) * 100).toFixed(2)}%</p>
                                    </div>
                                </div>
                            )}
                            {selectedCourse && !attendanceData && (
                                <div className="mt-4 p-3 rounded bg-white text-center">
                                    <strong>Attendance details not found for {selectedCourse}</strong>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MarkAttendance;