import React, { useState } from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import moment from 'moment';

export default function RegistrationForm(props) {

    window.moment = moment;

    const [course, setCourse] = useState(0);
    const [subject, setSubject] = useState(0);
    const [startDate, setStartDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState(null);
    const [additionalError, setAdditionalError] = useState(null);

    const courses = [
        {
            name: 'Technical Report Writing',
            subjects: [
                'Short Reports',
                'Annual Reports',
                'Presentations'
            ]
        },
        {
            name: 'English Literature',
            subjects: [
                'Poetry',
                'Short Stories',
                'Drama'
            ]
        },
        {
            name: 'Computer Sciences',
            subjects: [
                'Web Development',
                'Desktop Software Development',
                'Research and Analysis'
            ]
        },
    ];

    const allowedDates = [
        new Date(2019, 11, 20),
        new Date(2020, 0, 15),
        new Date(2020, 1, 1)
    ]

    const changeCourse = event => {
        setCourse(event.target.value);
        setSubject(0);
    }

    const changeSubject = event => {
        setSubject(event.target.value);
    }

    const changeDate = date => {
        validateDate(date);
        setStartDate(date);
    }

    const validateDate = (date = startDate) => {
        if (allowedDates.findIndex(a => moment(a).isSame(moment(date), 'day')) < 0) {
            setError('Your selected course and subject is not offered beginning from your selected date');
            return false;
        } else {
            setError(null);
            return true;
        }
    }

    const validateAdditional = event => {
        const text = event.target.value;
        if (text && text.length > 0) {
            if (text.length < 20 || text.length > 500) {
                setAdditionalError('Additional details should not be less than 20 characters and not more than 500 characters.');
                return false;
            } else {
                setAdditionalError('');
                return true;
            }
        } else {
            setAdditionalError('');
            return true;
        }
    };

    const submit = event => {
        event.preventDefault();
        // validate
        const form = event.target;
        const additionalField = form.additional;
        if (!validateDate() || !validateAdditional({ target: { value: additionalField.value } })) {
            return false;
        } else {
            setIsLoading(true);
            const data = {
                course: courses[course].name,
                subject: courses[course].subjects[subject],
                startDate,
                additional: additionalField.value
            };
            console.log(data);
            setTimeout(() => {
                setIsLoading(false);
                setIsSubmitted(true);
            }, 3000);
            return true;
        }

    }

    return (
        <div className="RegistrationForm">
            <form onSubmit={submit}>
                <select name="course" className="select" onChange={changeCourse}>
                    {
                        courses.map((c, i) => <option key={i} value={i}>{c.name}</option>)
                    }
                </select>
                <select name="subject" className="select" value={subject} onChange={changeSubject}>
                    {
                        courses[course].subjects.map((s, i) => <option key={i} value={i}>{s}</option>)
                    }
                </select>
                <DatePicker selected={startDate} onChange={changeDate} className="input"></DatePicker>
                {
                    error ? <span className="error">{error}</span> : ''
                }
                <textarea name="additional" className="textarea" onChange={validateAdditional}>
                </textarea>
                {
                    additionalError ? <span className="error">{additionalError}</span> : ''
                }
                <button type="submit" className="button">
                    {
                        !isLoading ? <span className="text">SUBMIT</span>
                            : <span className="loader"></span>
                    }
                </button>
            </form>
            {
                isSubmitted ?
                    <div className="modal">
                        <div className="modalBody">
                            Submit Successful!!!
                            <button className="closeModal" onClick={() => { setIsSubmitted(false) }}>Close</button>
                        </div>
                    </div>
                    : ''
            }
        </div>
    );
}