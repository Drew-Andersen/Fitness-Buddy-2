import { useState, useRef, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import './dashboard.css'
import "@fortawesome/fontawesome-free/css/all.min.css"

export default function Dashboard() {
    const [date, setDate] = useState(new Date())
    const [showModal, setShowModal] = useState(false)
    const [showModalSettings, setShowModalSettings] = useState(false)
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 })
    const [modalPositionSettings, setModalPositionSettings] = useState({ top: 0, left: 0 })

    const modalRef = useRef(null);
    const datepickerRef = useRef(null);
    const dropdownRef = useRef(null);

    const formatDate = (date) => {
        const dayOfWeek = date.getDay();
        const monthOfYear = date.getMonth();
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
        return `${days[dayOfWeek]}, ${months[monthOfYear]}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
    }

    const dateInc = () => {
        const newDate = new Date(date);
        newDate.setDate(date.getDate() + 1);
        setDate(newDate);
    };

    const dateDec = () => {
        const newDate = new Date(date);
        newDate.setDate(date.getDate() - 1);
        setDate(newDate);
    };

    const toggleModalDatepicker = () => {
        setShowModal(!showModal);

        if (!showModal && datepickerRef.current) {
            const rect = datepickerRef.current.getBoundingClientRect();
            setModalPosition({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX
            });
        }
    }

    const toggleModalSettings = () => {
        setShowModalSettings(!showModalSettings);

        if (!showModalSettings && dropdownRef.current) {
            const rect = dropdownRef.current.getBoundingClientRect();
            setModalPositionSettings({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX
            });
        }
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target) &&
                datepickerRef.current && !datepickerRef.current.contains(event.target)) {
                setShowModal(false);
            }

            if (modalRef.current && !modalRef.current.contains(event.target) &&
                dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowModalSettings(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [])


  return (
    <>
        <h1>Welcome User</h1>
        <a href="./goals">Log Body Weight</a>
        {/* This is where the user will log their weight to keep track of progress */}
        {/* It will also have a progress bar to show how far the user has come */}
        <section id="date-picker">
            {/* Where the user can select a past date and view an old workout 
            or see an upcoming workout*/}

            <div className='flex font15'>
                <div className="arrow-btn left-arrow p-2 fa-solid fa-arrow-left" onClick={dateDec}></div>
                <div className='date-btn px-2 py-1 text-center'>{formatDate(date)}</div>
                <div className="arrow-btn right-arrow p-2 fa-solid fa-arrow-right" onClick={dateInc}></div>
                <i
                    ref={datepickerRef}
                    id='datepicker'
                    className="datepicker p-1 fa-solid fa-calendar-days"
                    onClick={toggleModalDatepicker}
                ></i>
            </div>

            {/* Modal for Date Picker */}
            {showModal && (
                <div className="modal-overlay" onClick={toggleModalDatepicker}>
                    <div
                        className="modal-content"
                        ref={modalRef}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            position: 'absolute',
                            top: `${modalPosition.top}px`,
                            left: `${modalPosition.left}px`,
                        }}
                    >
                        <DatePicker
                            selected={date}
                            onChange={(date) => {
                                setDate(date);
                                setShowModal(false);
                            }}
                            inline
                        />
                    </div>
                </div>
            )}
            
        </section>
    </>
  );
}
