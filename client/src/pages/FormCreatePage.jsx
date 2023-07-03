// import { useState } from 'react';
import { useFormContext } from '../context/FormContext'

export default function FormCreatePage() {

    const { formElements, setFormElements, addField, addForm } = useFormContext()


    return (
        <div>
            <h1>Create a form here.</h1>
            <hr />
            <form>
                {formElements.map((formElement, index) => (

                    <div key={index}>
                        <hr />
                        <label>Label:</label>
                        <input

                            type="text"
                            value={formElement.label}
                            onChange={(e) => {
                                const newFormElements = JSON.parse(JSON.stringify(formElements));
                                newFormElements[index].label = e.target.value;
                                setFormElements(newFormElements);
                            }}
                        />

                        <label>Type:</label>
                        <select
                            value={formElement.type}
                            onChange={(e) => {
                                const newFormElements = JSON.parse(JSON.stringify(formElements));
                                newFormElements[index].type = e.target.value;
                                setFormElements(newFormElements);
                            }}
                        >
                            <option value="">Select type</option>
                            <option value="text">Text</option>
                            <option value="number">Number</option>
                        </select>
                    </div>
                ))}
            </form>
            <hr />
            <button onClick={addField}>Alan ekle</button>
            <hr />
            <button onClick={addForm}>Kaydet</button>
        </div>
    );
}
