import { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

export const Input = ({ name, type, ...rest }: any) => {
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