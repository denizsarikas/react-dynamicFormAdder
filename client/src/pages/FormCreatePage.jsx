import { useFormContext } from '../context/FormContext';

export default function FormCreatePage() {
    const {
        formElements,
        setFormElements,
        addField,
        removeField,
        addForm,
        formName,
        setFormName,
    } = useFormContext();

    const handleLabelChange = (e, index) => {
        const newFormElements = [...formElements];
        const newLabel = e.target.value;
        newFormElements[index] = { ...newFormElements[index], label: newLabel };
        setFormElements(newFormElements);
    };

    const handleTypeChange = (e, index) => {
        const newFormElements = [...formElements];
        const selectedType = e.target.value;
        newFormElements[index] = { ...newFormElements[index], type: selectedType };
        setFormElements(newFormElements);
    };

    const handleOptionChange = (e, elementIndex, optionIndex) => {
        const newFormElements = [...formElements];
        newFormElements[elementIndex].options[optionIndex] = e.target.value;
        setFormElements(newFormElements);
    };

    const addOption = (elementIndex, event) => {
        event.preventDefault();
        const newFormElements = [...formElements];
        newFormElements[elementIndex].options.push('');
        setFormElements(newFormElements);
    };

    const removeOption = (elementIndex, optionIndex, event) => {
        event.preventDefault();
        const newFormElements = [...formElements];
        newFormElements[elementIndex].options.splice(optionIndex, 1);
        setFormElements(newFormElements);
    };

    return (
        <div className="w-2/3 mx-auto">
            <h1 className="p-4 text-2xl font-bold text-center">Create a form here.</h1>
            <div className="flex items-center justify-center mb-4">
                <label className="font-bold mr-2">Name:</label>
                <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="py-2 px-4 border border-gray-300 rounded-2xl shadow-sm"
                />
            </div>
            <form className=''>
                {formElements.map((formElement, index) => {
                    const elementCopy = JSON.parse(JSON.stringify(formElement));
                    return (
                        <div key={index} className="flex items-center gap-4 mb-4">
                            <button
                                onClick={(e) => removeField(index, e)}
                                className="p-2 bg-red-500 text-white rounded-2xl hover:bg-red-600"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>

                            </button>
                            <label className="font-bold mr-2">Label:</label>
                            <input
                                type="text"
                                value={elementCopy.label}
                                onChange={(e) => handleLabelChange(e, index)}
                                className="flex-grow py-2 px-4 border border-gray-300 rounded-md shadow-sm"
                            />

                            <label className="mr-2">Type:</label>
                            <select
                                value={elementCopy.type}
                                onChange={(e) => handleTypeChange(e, index)}
                                className="flex-grow py-2 px-4 border border-gray-300 rounded-md shadow-sm"
                            >
                                <option value="">Select type</option>
                                <option value="text">Text</option>
                                <option value="number">Number</option>
                                <option value="select">Select</option>
                            </select>

                            {elementCopy.type === 'select' && (
                                <div className="flex flex-col items-center justify-center gap-2">
                                    <label className="">Options:</label>
                                    {elementCopy.options.map((option, optionIndex) => (
                                        <div key={optionIndex} className="flex mb-2">
                                            <input
                                                type="text"
                                                value={option}
                                                onChange={(e) => handleOptionChange(e, index, optionIndex)}
                                                className="py-2 px-4 mr-2 border border-gray-300 rounded-md shadow-sm"
                                            />
                                            <button
                                                onClick={(e) => removeOption(index, optionIndex, e)}
                                                className="p-2 bg-red-500 text-white rounded-2xl hover:bg-red-600"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                                                </svg>

                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        onClick={(e) => addOption(index, e)}
                                        className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>

                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </form>
            <div className="flex flex-col w-full gap-4 p-3">
                <div className='w-full'>
                    <button
                        onClick={addField}
                        className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Add Field
                    </button>
                </div>
                <div className='flex justify-end'>
                    <button
                        onClick={addForm}
                        className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Save Form
                    </button>
                </div>
            </div>
        </div>
    );
}
