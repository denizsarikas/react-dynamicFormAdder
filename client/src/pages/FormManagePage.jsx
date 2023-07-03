//imports
import { useState } from 'react';
import { useFormContext } from '../context/FormContext';
import { Link } from 'react-router-dom';

export default function FormManagePage() {

    const { formList, setFormList } = useFormContext();
    const [editIndex, setEditIndex] = useState(null);
    const [editedSubList, setEditedSubList] = useState([]);


    const deleteForm = (index) => {
        const updatedFormList = [...formList];
        updatedFormList.splice(index, 1);
        setFormList(updatedFormList);
    }


    const handleEdit = (index, subList) => {
        setEditIndex(index);
        setEditedSubList(subList);
    };

    const handleSave = () => {
        const updatedFormList = [...formList];
        updatedFormList[editIndex] = editedSubList;
        setFormList(updatedFormList);
        setEditIndex(null);
        setEditedSubList([]);
    };

    const handleCancel = () => {
        setEditIndex(null);
        setEditedSubList([]);
    };

    const handleInputChange = (subIndex, fieldName, value) => {
        const updatedSubList = [...editedSubList];
        updatedSubList[subIndex] = {
            ...updatedSubList[subIndex],
            [fieldName]: value
        };
        setEditedSubList(updatedSubList);
    };

    return (
        <div>
            {formList.map((subList, index) => (
                <div key={index}>
                    <h2>Form {index + 1}</h2>
                    {editIndex === index ? (
                        <div>
                            {editedSubList.map((formElement, subIndex) => (
                                <div className='flex' key={subIndex}>
                                    <label>Label:</label>
                                    <input
                                        type="text"
                                        value={formElement.label}
                                        onChange={(e) => handleInputChange(subIndex, 'label', e.target.value)}
                                    />
                                    <label>Type:</label>
                                    <select
                                        value={formElement.type}
                                        onChange={(e) => handleInputChange(subIndex, 'type', e.target.value)}
                                    >
                                        <option value="">Select type</option>
                                        <option value="text">Text</option>
                                        <option value="number">Number</option>
                                    </select>
                                </div>
                            ))}
                            <button onClick={handleSave}>Save</button>
                            <button onClick={handleCancel}>Cancel</button>
                        </div>
                    ) : (
                        <div>
                            {subList.map((formElement, subIndex) => (
                                <div className='flex' key={subIndex}>
                                    <p>Label: {formElement.label}</p>
                                    <p>Type: {formElement.type}</p>
                                </div>
                            ))}
                            <button onClick={() => handleEdit(index, subList)}>Edit Form</button>
                            <button onClick={() => deleteForm(index)}>Delete Form</button>
                            <Link to={`/formfill/${index}`}>Form {index + 1}yi doldur</Link>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
