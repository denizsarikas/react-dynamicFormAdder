import { useState } from 'react';
import { useFormContext } from '../context/FormContext';
import { Link } from 'react-router-dom';

export default function FormManagePage() {
  const { formList, setFormList } = useFormContext();
  const [editIndex, setEditIndex] = useState(null);
  const [editedForm, setEditedForm] = useState(null);

  const deleteForm = (index) => {
    const updatedFormList = [...formList];
    updatedFormList.splice(index, 1);
    setFormList(updatedFormList);
  };

  const handleEdit = (index, form) => {
    setEditIndex(index);
    setEditedForm({ ...form });
  };

  const handleSave = () => {
    const updatedFormList = [...formList];
    updatedFormList[editIndex] = editedForm;
    setFormList(updatedFormList);
    setEditIndex(null);
    setEditedForm(null);
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditedForm(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleElementChange = (index, e) => {
    const { name, value } = e.target;
    const updatedElements = [...editedForm.formElements];
    updatedElements[index] = {
      ...updatedElements[index],
      [name]: value,
    };
    setEditedForm((prevForm) => ({
      ...prevForm,
      formElements: updatedElements,
    }));
  };

  const handleOptionChange = (elementIndex, optionIndex, e) => {
    const { value } = e.target;
    const updatedElements = [...editedForm.formElements];
    updatedElements[elementIndex].options[optionIndex] = value;
    setEditedForm((prevForm) => ({
      ...prevForm,
      formElements: updatedElements,
    }));
  };

  const addOption = (elementIndex) => {
    const updatedElements = [...editedForm.formElements];
    updatedElements[elementIndex].options.push('');
    setEditedForm((prevForm) => ({
      ...prevForm,
      formElements: updatedElements,
    }));
  };

  const removeOption = (elementIndex, optionIndex) => {
    const updatedElements = [...editedForm.formElements];
    updatedElements[elementIndex].options.splice(optionIndex, 1);
    setEditedForm((prevForm) => ({
      ...prevForm,
      formElements: updatedElements,
    }));
  };

  return (
    <div>
      {formList.map((form, index) => (
        <div key={index} className="border p-4 mb-4">
          {editIndex === index ? (
            <div className='mb-2 flex flex-col items-center justify-center'>
              <div>
                <label >Form Name:</label>
                <input
                  type="text"
                  name="formName"
                  value={editedForm.formName}
                  onChange={handleInputChange}
                  className="border p-2 rounded-md mb-2"
                />
              </div>

              {editedForm.formElements.map((formElement, subIndex) => (
                <div className="mb-2 flex flex-wrap items-center justify-center" key={subIndex}>
                  <label className="mr-2">Label:</label>
                  <input
                    type="text"
                    name="label"
                    value={formElement.label}
                    onChange={(e) => handleElementChange(subIndex, e)}
                    className="border p-2 rounded-md mr-2"
                  />
                  <label className="mr-2">Type:</label>
                  <select
                    name="type"
                    value={formElement.type}
                    onChange={(e) => handleElementChange(subIndex, e)}
                    className="border p-2 rounded-md mr-2"
                  >
                    <option value="">Select type</option>
                    <option value="text">Text</option>
                    <option value="number">Number</option>
                    <option value="select">Select</option>
                  </select>
                  {formElement.type === 'select' && (
                    <div className=''>
                      <label className="ml-4">Options:</label>
                      {formElement.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex mb-2">
                          <input
                            type="text"
                            value={option}
                            onChange={(e) => handleOptionChange(subIndex, optionIndex, e)}
                            className="border p-2 rounded-md mr-2"
                          />
                          <button
                            onClick={() => removeOption(subIndex, optionIndex)}
                            className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                          >
                            Remove Option
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => addOption(subIndex)}
                        className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                      >
                        Add Option
                      </button>
                    </div>
                  )}
                </div>
              ))}
              <div className="">
                <button
                  onClick={handleSave}
                  className="py-2 px-4 mb-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className='flex w-full justify-center items-center'>
              <div className='flex flex-col w-1/2 justify-center items-center'>
                <p className="mb-2 text-lg font-semibold">Form Name: {form.formName}</p>
                {form.formElements.map((formElement, subIndex) => (
                  <div className="flex mb-4" key={subIndex}>
                    <p className="mr-2 text-gray-700">Label:</p>
                    <p className="mr-2">{formElement.label}</p>
                    <p className="mr-2 text-gray-700">Type:</p>
                    <p className="">{formElement.type}</p>
                    {formElement.type === 'select' && (
                      <div className='flex flex-col'>
                        <p className="ml-4">Options:</p>
                        {formElement.options.map((option, optionIndex) => (
                          <div key={optionIndex} className="ml-4 flex items-center justify-center">
                            <p className="mb-1">{option}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-end">
                <button
                  onClick={() => handleEdit(index, form)}
                  className="py-2 px-4 mb-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.867 19.125h.008v.008h-.008v-.008z" />
                  </svg>

                </button>
                <button
                  onClick={() => deleteForm(index)}
                  className="py-2 px-4 mb-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>

                </button>
                <Link
                  to={`/formfill/${form.formName}`}
                  className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>

                </Link>
              </div>
            </div>

          )}
        </div>
      ))}
    </div>
  );
}
