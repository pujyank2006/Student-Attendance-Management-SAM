import { React, useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { handleError, handleSuccess } from '../util';

const MODAL_STYLES = {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#dfedfe',
    padding: '20px',
    zIndex: 1000,
    width: '900px',
    minHeight: '600px',
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

function MarkAttendance({ open, onClose }) {
    const [classList, setClassList] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [students, setStudents] = useState([]);
    const [attendanceStatus, setAttendanceStatus] = useState({});


    useEffect(() => {
        const id = localStorage.getItem('id');
        if (id) {
            fetch('http://localhost:8080/usersub')
                .then((res) => res.json())
                .then((data) => {
                    const teacher = data.find(
                        (t) => t.role === 'teacher' && t.id === id
                    );

                    if (teacher && teacher.course_name) {
                        setClassList(teacher.course_name);
                        console.log('Teacher courses:', teacher.course_name);
                    } else {
                        console.warn('No courses found for teacher');
                        setClassList([]);
                    }
                })
                .catch((err) => console.error('Error fetching teacher data:', err));
        }
    }, []);


    useEffect(() => {
        if (selectedCourse) {
            fetch('http://localhost:8080/usersub')
                .then((res) => res.json())
                .then((data) => {
                    const enrolled = data.filter((student) =>
                        student.course_name.includes(selectedCourse) && student.role === 'student'
                    );
                    setStudents(enrolled);
                })
                .catch((err) => console.error('Error fetching students:', err));
        } else {
            setStudents([]);
        }
    }, [selectedCourse]);

    const handleStatusChange = (studentID, status) => {
        setAttendanceStatus((prev) => ({
            ...prev,
            [studentID]: status
        }));
    }

    const handleSubmitAttendance = async () => {
        const teacherName = localStorage.getItem('loggedInUser');
        const records = Object.entries(attendanceStatus).map(([student_id, status]) => ({
            student_id,
            status,
        }));

        if (!selectedCourse || records.length === 0) {
            alert('Please select a class and mark attendance first.');
            return;
        }

        try {
            const res = await fetch('http://localhost:8080/attendance/mark', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    className: selectedCourse,
                    today_date: new Date(),
                    marked_by: teacherName,
                    attendance: records,
                }),
            });

            const data = await res.json();
            if (res.ok) {
                handleSuccess('Attendance submitted successfully!');
                setAttendanceStatus({});
            } else {
                handleError(data.error || 'Failed to mark attendance');
            }
        } catch (err) {
            console.error(err);
            handleError('Error sending attendance');
        }
    };

    const columns = [
        {
            name: 'S.No',
            cell: (row, index) => index + 1,
            width: '100px'
        },
        {
            name: 'Student ID',
            selector: row => row.id,
            sortable: true,
            width: '150px'
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
            width: '500px'
        },
        {
            name: 'Action',
            cell: (row) => (
                <>
                    <button style={{
                        backgroundColor: attendanceStatus[row.id] === 'present' ? '#808080' : '#7E8BFF',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '4px 10px',
                        cursor: 'pointer',
                        marginRight: '8px',
                    }} onClick={() => handleStatusChange(row.id, 'present')}>P</button>

                    <button style={{
                        backgroundColor: attendanceStatus[row.id] === 'absent' ? '#808080' : '#F82C22',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '4px 10px',
                        cursor: 'pointer',
                    }} onClick={() => handleStatusChange(row.id, 'absent')}>A</button>
                </>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        }
    ];

    const customStyles = {
        headCells: {
            style: {
                backgroundColor: '#7E8BFF',
                color: 'Black',
                fontSize: '14px',
                borderRadius: '20px'
            },
        },
        cells: {
            style: {
                fontSize: '14px',
                padding: '8px',
                borderRadius: '20px'
            },
        },
        rows: {
            style: {
                minHeight: '48px',
                backgroundColor: '#dfedfe',
                borderRadius: '20px'
            },
        },
    };

    if (!open) return null;

    return (
        <>
            <div style={OVERLAY_STYLES}>
                <div style={MODAL_STYLES}>
                    <button onClick={onClose} style={BUTTON_STYLE}>X</button>

                    <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold">Mark Attendance</h3>
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

                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-2">Enrolled Students:</h4>

                        <DataTable
                            columns={columns}
                            data={students}
                            pagination
                            dense
                            customStyles={customStyles}
                        />
                        <div>
                            <button
                                onClick={handleSubmitAttendance}
                                style={{
                                    backgroundColor: '#2ecc71',
                                    padding: '10px 20px',
                                    border: 'none',
                                    borderRadius: '6px',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: '16px',
                                    cursor: 'pointer',
                                }}
                            >
                                Submit Attendance
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default MarkAttendance;