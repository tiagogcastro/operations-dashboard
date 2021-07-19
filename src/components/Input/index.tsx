import { useEffect, useRef, InputHTMLAttributes } from 'react';
import { useField } from '@unform/core';

interface InputProps extends InputHTMLAttributes<HTMLInputElement>  {
  name: string;
  type: string;
};

export const Input = ({ name, type, ...rest }: InputProps) => {
  const inputRef = useRef(null);

  const { fieldName, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: ref => {
        return ref.current.value
      },
      setValue: (ref, value) => {
        ref.current.value = value
      },
      clearValue: ref => {
        ref.current.value = ''
      },
    })
  }, [fieldName, registerField]);

  useEffect(() => {}, [])
  return (
    <input
      name={name}
      ref={inputRef}
      type={type}
      {...rest}
    />
  );
}