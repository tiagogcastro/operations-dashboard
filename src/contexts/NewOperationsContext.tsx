import { createContext, ReactNode, useContext, useState } from 'react';
import { NewOperation } from '../components/Jexcel';

type NewOperationsContextData = {
  newOperations: NewOperation[];
  setNewOperations: React.Dispatch<React.SetStateAction<NewOperation[]>>;
};

type NewOperationsProps = {
  children: ReactNode;
}

const NewOperationsContext = createContext({} as NewOperationsContextData);

export function NewOperationProvider({children}: NewOperationsProps) {
  const [newOperations, setNewOperations] = useState<NewOperation[]>([]);
  return (
    <NewOperationsContext.Provider value={{newOperations, setNewOperations}}>
      {children}
    </NewOperationsContext.Provider>
  );
}

export function useNewOperation(): NewOperationsContextData {
  const context = useContext(NewOperationsContext);

  if(!context) {
    throw new Error('useNewOperation must be used within an NewOperationProvider');
  }

  return context;
}