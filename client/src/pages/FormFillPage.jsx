import { useParams } from 'react-router-dom';
import { useFormContext } from '../context/FormContext';

export default function FormFillPage() {
  const { id } = useParams();
  const { formList } = useFormContext();

  // Seçilen formu al
  const selectedForm = formList.find(form => form.formName === id);

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    selectedForm.formElements[index].value = value;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form verilerini gönderme işlemleri burada gerçekleştirilebilir
    console.log(selectedForm);
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
                <select className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formElement.value || ""}
                  onChange={(e) => handleInputChange(e, index)}>
                  {formElement.options.map((option, optionIndex) => (
                    <option key={optionIndex} value={option}>{option}</option>
                  ))}
                </select>
              ) : (
                <input
                  className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  type={formElement.type}
                  value={formElement.value || ""}
                  onChange={(e) => handleInputChange(e, index)}
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
