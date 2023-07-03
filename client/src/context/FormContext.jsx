import { createContext, useContext, useState } from 'react';
import { useEffect } from 'react';

const FormContext = createContext();

export const FormProvider = ({ children }) => {


    const [formElements, setFormElements] = useState(
        [
            { label: '', type: '' },
        ]
    );

    const [formList, setFormList] = useState([]);

    const addField = () => {
        const newFormElements = [...formElements];
        newFormElements.push({ label: '', type: '' });
        setFormElements(newFormElements);
    };

    const addForm = () => {
        setFormList(prevFormList => [...prevFormList, [...formElements]]);
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
    };

    return (
        <FormContext.Provider value={contextValue}>
            {children}
        </FormContext.Provider>
    );

};

export const useFormContext = () => useContext(FormContext);

