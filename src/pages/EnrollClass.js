import React, { useEffect, useState } from 'react';
import { handleError, handleSuccess } from '../util';

const MODAL_STYLES = {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#dfedfe',
    padding: '20px',
    zIndex: 1000,
    width: '400px',
    minHeight: '200px',
    borderRadius: '8px',
    position: 'relative'
};

const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .7)',
    zIndex: 1000
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
    right: '10px'
};

const BUTTON_STYLE_2 = {
    backgroundColor: '#7E8BFF',
    border: 'none',
    color: 'white',
    padding: '5px 10px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '4px',
    marginTop: '10px'
};

function EnrollClass({ open, onClose }) {
    const [classList, setClassList] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [newClassName, setNewClassName] = useState('');
    const [newClassCode, setNewClassCode] = useState('');

    useEffect(() => {
        if (open) {
            fetch('http://localhost:8080/courses')
                .then(res => res.json())
                .then(data => {
                    setClassList(data)
                    console.log(data);
                })
                .catch(err => console.error('Error fetching classes:', err));
        }
    }, [open]);

    const handleEnroll = async (e) => {
        e.preventDefault();
        const id = localStorage.getItem('id');
        const role = localStorage.getItem('role');
        const name = localStorage.getItem('loggedInUser');

        if (!id || !selectedCourse || !role || !name) return handleError("Please select a course!");

        try {
            const res = await fetch('http://localhost:8080/usersub/set', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, role, name, course_name: selectedCourse })
            });

            const result = await res.json();
            if (result.success) {
                handleSuccess(result.message);
            } else {
                handleError(result.error?.details?.[0]?.message || result.message || "Something went wrong.");
            }
        } catch (err) {
            handleError(err.message || "Enrollment failed.");
        }
    };

    const handleAddClass = async () => {
        const id = localStorage.getItem('id');

        if (!newClassName || !newClassCode) {
            return handleError("Both class name and code are required.");
        }

        const teacherName = localStorage.getItem("loggedInUser");
        if (!teacherName) {
            return handleError("Teacher name not found in local storage.");
        }

        try {
            const res = await fetch('http://localhost:8080/courses', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    className: newClassName,
                    classCode: newClassCode,
                    teacher: teacherName, // include this!
                    teacher_id: id
                })
            });

            const result = await res.json();
            if (result.success) {
                handleSuccess("Class added successfully.");
                setClassList(prev => [...prev, {
                    className: newClassName,
                    classCode: newClassCode,
                    teacher: teacherName,
                    _id: Date.now()
                }]);
                setNewClassName('');
                setNewClassCode('');
            } else {
                handleError(result.message || "Failed to add class.");
            }
        } catch (err) {
            handleError(err.message || "Something went wrong.");
        }
    };


    if (!open) return null;

    return (
        <>
            <div style={OVERLAY_STYLES}>
                <div style={MODAL_STYLES}>
                    <button onClick={onClose} style={BUTTON_STYLE}>X</button>
                    <form onSubmit={handleEnroll}>
                        <label htmlFor="classSelect">Choose your class:</label>
                        <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
                            <option value="">--Select a class--</option>
                            {classList.map((course) => (
                                <option key={course._id} value={course.className}>
                                    {course.classCode}
                                </option>
                            ))}
                        </select>
                        <br />
                        <button style={BUTTON_STYLE_2} type="submit">Enroll</button>
                    </form>

                    <h3>Add a New Class</h3>
                    <input
                        type="text"
                        placeholder="Class Name"
                        value={newClassName}
                        onChange={(e) => setNewClassName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Class Code"
                        value={newClassCode}
                        onChange={(e) => setNewClassCode(e.target.value)}
                    />
                    <br />
                    <button style={BUTTON_STYLE_2} onClick={handleAddClass}>Add Class</button>
                </div>
            </div>
        </>
    );
}

export default EnrollClass;
