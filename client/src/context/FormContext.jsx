import { createContext, useContext, useState } from 'react';
import { useEffect } from 'react';

const FormContext = createContext();

export const FormProvider = ({ children }) => {


    const [formElements, setFormElements] = useState(
        [
            { name: '', label: '', type: '', options: [] },
        ]
    );

    const [formName, setFormName] = useState('')

    const [formList, setFormList] = useState([]);

    const addField = () => {
        const newFormElements = [...formElements];
        newFormElements.push({ name: '', label: '', type: '', options: []  });
        setFormElements(newFormElements);
    };

    const removeField = (index, event) => {
        event.preventDefault(); // Sayfanın yenilenmesini engeller
        const newFormElements = formElements.filter((_, i) => i !== index);
        setFormElements(newFormElements);
      };

    const addForm = () => {
        const newForm = {
          formName: formName,
          formElements: formElements
        };
        setFormList(prevFormList => [...prevFormList, newForm]);
      };

    useEffect(() => {
        console.log(formList);
    }, [formList]);

    const contextValue = {
        formElements,
        setFormElements,
        addField,
        addForm,
        formList,
        setFormList,
        formName,
        setFormName,
        removeField
    };

    return (
        <FormContext.Provider value={contextValue}>
            {children}
        </FormContext.Provider>
    );

};

export const useFormContext = () => useContext(FormContext);

