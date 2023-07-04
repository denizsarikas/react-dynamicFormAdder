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
            <div className='mb-2 bg-yellow-100 flex flex-col items-center justify-center'>
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
                      <label className="mr-2">Options:</label>
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
            <div className='flex w-full bg-blue-300 justify-center items-center'>
              <div className='flex flex-col bg-yellow-200 w-1/2 justify-center items-center'>
                <p className="mb-2 text-lg font-semibold">Form Name: {form.formName}</p>
                {form.formElements.map((formElement, subIndex) => (
                  <div className="flex mb-4" key={subIndex}>
                    <p className="mr-2 text-gray-700">Label:</p>
                    <p className="mr-2">{formElement.label}</p>
                    <p className="mr-2 text-gray-700">Type:</p>
                    <p className="">{formElement.type}</p>
                    {formElement.type === 'select' && (
                      <div>
                        <p className="mb-1">Options:</p>
                        {formElement.options.map((option, optionIndex) => (
                          <div key={optionIndex} className="ml-4">
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
                  Edit
                </button>
                <button
                  onClick={() => deleteForm(index)}
                  className="py-2 px-4 mb-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Delete
                </button>
                <Link
                  to={`/formfill/${form.formName}`}
                  className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Fill
                </Link>
              </div>
            </div>

          )}
        </div>
      ))}
    </div>
  );
}
