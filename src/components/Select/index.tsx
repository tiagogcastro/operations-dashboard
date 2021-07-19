import React, { useRef, useEffect, ReactNode } from 'react';

import { useField } from '@unform/core';

interface Props {
  name: string;
  children?: ReactNode;
  defaultValue: any;
}
export default function Select({ name, defaultValue, children, ...rest }: Props) {
  const selectRef = useRef(null);
  const { fieldName,registerField } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef,
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
  return (
    <select
      ref={selectRef}
      defaultValue={defaultValue}
      {...rest}
    >{children}</select>
  );
};