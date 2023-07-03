import { useParams } from 'react-router-dom';
import { useFormContext } from '../context/FormContext';

export default function FormFillPage() {
    const { id } = useParams();
    const { formList } = useFormContext();

    // Seçilen formun indeksini al
    const formIndex = parseInt(id);

    // Seçilen formu al
    const selectedForm = formList[formIndex];

    return (
        <div>
            <h1>Form Fill Page</h1>
            {selectedForm && (
                <form>
                    {selectedForm.map((formElement, index) => (
                        <div key={index}>
                            <label>{formElement.label}</label>
                            <input type={formElement.type} />
                        </div>
                    ))}
                    <button>Submit</button>
                </form>
            )}
        </div>
    );
}
