

import React, { useState, useEffect } from 'react';
import { Notes as initialNotes } from './Data';

function Main() {
    const [Notes, setNotes] = useState(() => {
        const savedNotes = localStorage.getItem('notes');
        return savedNotes ? JSON.parse(savedNotes) : initialNotes;
    });

    const [isNoteSelected, setSelectedNote] = useState(null);
    const [inputImage, setinputImage] = useState('');
    const [isAdditionNotesVisible, setAdditionNotesVisible] = useState(false);

    const handleInputChange = (event) => {
        setinputImage(event.target.value);
    };

    const handleNoteClick = (note) => {
        setSelectedNote(note);
    };

    const handleAddDescription = () => {
        if (inputImage.trim() === '' || !isNoteSelected) return;

        const newDescription = {
            text: inputImage,
            timestamp: new Date().toISOString(),
        };

        const updatedNotes = Notes.map((note) => {
            if (note === isNoteSelected) {
                return {
                    ...note,
                    descriptions: [...note.descriptions, newDescription],
                };
            }
            return note;
        });

        setNotes(updatedNotes);
        setSelectedNote((prev) => ({
            ...prev,
            descriptions: [...prev.descriptions, newDescription],
        }));

        setinputImage('');
    };

    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(Notes));
    }, [Notes]);

    const handleAddButtonClick = () => {
        setAdditionNotesVisible(true);
    };

    const DateandTime = (timestamp) => {
        const dateObj = new Date(timestamp);
        const dateOptions = { day: 'numeric', month: 'long', year: 'numeric' };
        const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
        const formattedDate = dateObj.toLocaleDateString('en-GB', dateOptions);
        const time = dateObj.toLocaleTimeString('en-GB', timeOptions);
        return `${formattedDate} •  ${time}`;
    };

    const [newNoteName, setNewNoteName] = useState('');
    const [newNoteColor, setNewNoteColor] = useState('');
    const [newNoteShortForm, setNewNoteShortForm] = useState('');

    const handleNewNoteNameChange = (event) => {
        const name = event.target.value;
        setNewNoteName(name);

        const shortForm = name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase();
        setNewNoteShortForm(shortForm);
    };

    const handleColorSelect = (color) => {
        setNewNoteColor(color);
    };

    const handleCreateNote = () => {
        if (newNoteName.trim() === '' || newNoteColor === '') return;

        const newNote = {
            name: newNoteName,
            short: newNoteShortForm,
            color: newNoteColor,
            descriptions: [],
        };

        setNotes([...Notes, newNote]);

        setNewNoteName('');
        setNewNoteColor('');
        setNewNoteShortForm('');
        setAdditionNotesVisible(false);
    };

    // Handle back navigation
    const handleBackButtonClick = () => {
        setSelectedNote(null);
    };

    return (
        <div className='Main_container'>
            <div className={`Container1 ${isAdditionNotesVisible ? 'dim-background' : ''} ${isNoteSelected ? 'hidden' : ''}`}>
                <h1 className='Heading1'>Pocket Notes</h1>
                <ul className='notesList'>
                    {Notes.map((note, index) => (
                        <li key={index} className='notesName' onClick={() => handleNoteClick(note)}>
                            <div className='shortForm' style={{ backgroundColor: note.color }}>
                                {note.short}
                            </div>
                            <h4 className='GroupName'>{note.name}</h4>
                        </li>
                    ))}
                </ul>
                <button className='AddButton' onClick={handleAddButtonClick}>+</button>
            </div>

            <div className={`Container2 ${isAdditionNotesVisible ? 'dim-background' : ''} ${isNoteSelected ? 'visible' : ''}`}>
                {isNoteSelected ? (
                    <div className='Content_container2'>
                        <div className='component1'>
                        <img className="arrowimage" src={`${process.env.PUBLIC_URL}/Arrow.png`} alt="Back" onClick={handleBackButtonClick} />
                            <div className='shortForm' style={{ backgroundColor: isNoteSelected.color }}>
                                {isNoteSelected.short}
                            </div>
                            <h1 className='groupNameinContainer2'>{isNoteSelected.name}</h1>
                        </div>
                        <ul className='descriptionList'>
                            {isNoteSelected.descriptions && isNoteSelected.descriptions.map((desc, index) => (
                                <li key={index} className='individualDescription'>
                                    <p>{desc.text}</p>
                                    <span className='timestamp'>{DateandTime(desc.timestamp)}</span>
                                </li>
                            ))}
                        </ul>
                        <div className='addDescription'>
                            <input
                                type='text'
                                placeholder='Enter your text here...........'
                                value={inputImage}
                                onChange={handleInputChange}
                            />
                            <button onClick={handleAddDescription}>
                                <img
                                    src={`${process.env.PUBLIC_URL}/${inputImage.trim() ? 'message.png' : 'noText.png'}`}
                                    alt="message sender"
                                />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className='Content_container'>
                        <img className='OnlyImg' src={`${process.env.PUBLIC_URL}/image-removebg-preview 1.png`} alt="Only ige" />
                        <h1 className='H2'>Pocket Notes</h1>
                        <p id="para">Send and receive messages without keeping your phone online. Use Pocket Notes on up to 4 linked devices and 1 mobile phone.</p>
                        <div className='footer'>
                            <img className='lock lower' src={`${process.env.PUBLIC_URL}/Vector.png`} alt="Lock" />
                            <p className='lower'>end-to-end encrypted</p>
                        </div>
                    </div>
                )}
            </div>

            {isAdditionNotesVisible && (
                <div className="AdditionNotes">
                    <div className="MainBox">
                        <h3>Create New Group</h3>
                        <div className="input1">
                            <label className='addlables'>Group Name:</label>
                            <input
                                type="text"
                                placeholder="Enter group name"
                                value={newNoteName}
                                onChange={handleNewNoteNameChange}
                            />
                        </div>
                        <div className="color-selection">
                            <label className='addlables'>Choose Color:</label>
                            <div className="color-circles">
                                <button
                                    className="circle"
                                    style={{ backgroundColor: 'rgba(179, 139, 250, 1)' }}
                                    onClick={() => handleColorSelect('rgba(179, 139, 250, 1)')}
                                ></button>
                                <button
                                    className="circle"
                                    style={{ backgroundColor: 'rgba(255, 102, 240, 1)' }}
                                    onClick={() => handleColorSelect('rgba(255, 102, 240, 1)')}
                                ></button>
                                <button
                                    className="circle"
                                    style={{ backgroundColor: 'rgba(6, 217, 217, 1)' }}
                                    onClick={() => handleColorSelect('rgba(6, 217, 217, 1)')}
                                ></button>
                                <button
                                    className="circle"
                                    style={{ backgroundColor: 'rgba(255, 175, 120, 1)' }}
                                    onClick={() => handleColorSelect('rgba(255, 175, 120, 1)')}
                                ></button>
                                <button
                                    className="circle"
                                    style={{ backgroundColor: 'rgba(255, 193, 7, 1)' }}
                                    onClick={() => handleColorSelect('rgba(255, 193, 7, 1)')}
                                ></button>
                                <button
                                    className="circle"
                                    style={{ backgroundColor: 'rgba(102, 145, 255, 1)' }}
                                    onClick={() => handleColorSelect('rgba(102, 145, 255, 1)')}
                                ></button>
                                
                            </div>
                        </div>
                        <button className='CreateNote' onClick={handleCreateNote}>Create</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Main;
