import { useParams } from 'react-router-dom';
import { useFormContext } from '../context/FormContext';
import { useState } from 'react';

export default function FormFillPage() {
  const { id } = useParams();
  const { formList } = useFormContext();

  const [inputValues, setInputValues] = useState({});

  // Seçilen formu al
  const selectedForm = formList.find(form => form.formName === id);

  function handleInputChange(e, index) {
    const { name, value } = e.target;

    setInputValues(prevState => {
      const updatedValues = { ...prevState[index], [name]: value };
      return { ...prevState, [index]: updatedValues };
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(selectedForm);
    console.log(inputValues);
  };

  return (
    <div className='w-1/3 mx-auto'>
      <h1 className='text-4xl font-bold text-center text-red-700'>Form Fill Page</h1>
      {selectedForm && (
        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
          {selectedForm.formElements.map((formElement, index) => (
            <div className="mb-4" key={index}>
              <label className="block font-bold mb-1">{formElement.label}</label>
              {formElement.type === 'select' ? (
                <select
                  className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  name={formElement.label}
                  onChange={(e) => handleInputChange(e, index)}
                  value={inputValues[index] ? inputValues[index][formElement.label] : ''}
                >
                  <option value="">Seçiniz</option> {/* Varsayılan seçenek */}
                  {formElement.options.map((option, optionIndex) => (
                    <option key={optionIndex} value={option}>{option}</option>
                  ))}
                </select>
              ) : (
                <input
                  className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  type={formElement.type}
                  name={formElement.label}
                  onChange={(e) => handleInputChange(e, index)}
                  value={inputValues[index] ? inputValues[index][formElement.label] : ''}
                />
              )}
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >Submit</button>
        </form>
      )}
    </div>
  );
}
