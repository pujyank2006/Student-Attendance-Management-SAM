import React, { useEffect, useState } from 'react';
import { handleError, handleSuccess } from '../util';

const MODAL_STYLES = {
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#dfedfe',
  padding: '20px',
  zIndex: 1000,
  width: '300px',
  height: '100px',
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
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '16px',
  cursor: 'pointer',
  borderRadius: '4px',
  position: 'absolute',
  top: '95px',
  right: '140px'
};

function Enroll({ open, onClose }) {
  const [classList, setClassList] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');


  useEffect(() => {
    if (open) {
      fetch('http://localhost:8080/courses')
        .then(res => res.json())
        .then(data => {
          setClassList(data);
        })
        .catch(err => console.error('Error fetching classes:', err));
    }
  }, [open]);


  const handleset = async (e) => {
    e.preventDefault();

    const id = localStorage.getItem('id');
    const role = localStorage.getItem('role');
    const name = localStorage.getItem('loggedInUser');
    if (!id || !selectedCourse || !role || !name) {
      return handleError("Please select a course!");
    }
    console.log({ id, role, name, selectedCourse });

    try {
      const res = await fetch('http://localhost:8080/usersub/set', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: id,
          role: role,
          name: name,
          course_name: selectedCourse
        })
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

  if (!open) {
    return null;
  }

  return (
    <>
      <div style={OVERLAY_STYLES}>
        <div style={MODAL_STYLES}>
          <button onClick={onClose} style={BUTTON_STYLE}>
            X
          </button>
          <form onSubmit={handleset}>
            <label htmlFor="classSelect">Choose your class:</label>
            <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
              <option value="">--Select a class--</option>
              {classList.map((course) => (
                <option key={course._id} value={course.className}>
                  {course.classCode}
                </option>
              ))}
            </select>
            <button style={BUTTON_STYLE_2} type="submit"> Enroll </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Enroll
