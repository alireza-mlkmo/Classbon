/* eslint-disable react/display-name */
'use client'

import React, { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { AuthCodeProps, AuthCodeRef, AuthInputProps } from "./auth-code.types";
import classNames from "classnames";

const AuthCode = forwardRef<AuthCodeRef , AuthCodeProps>(({
  variant = "primary",
  autoFocus = true,
  className,
  isDisabled,
  length = 5,
  onChange,
} , ref) => {
  if (length < 1) {
    throw new Error("تعداد ارقام باید بزرگتر از صفر باشد");
  }
  const inputsRef = useRef<Array<HTMLInputElement>>([]);

  const inputProps: AuthInputProps = {  
    min: '0',   
    max: "9",
    pattern: '[0-9]{1}'
  };

  useEffect(() => {
    if(autoFocus) {
      inputsRef.current[0].focus()
    }
  },[autoFocus])

  function sendResult(){
    const result = inputsRef.current.map(input => input.value).join('');
    onChange(result)
  }

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const {target: {value , nextElementSibling}} = e;

    if(value.match(inputProps.pattern)){
      if(nextElementSibling !== null){
        (nextElementSibling as HTMLInputElement).focus();
      }
    } else{
      e.target.value = "";
    }

    sendResult()
  }

  function handleOnFocus(e: React.FocusEvent<HTMLInputElement>){
    e.target.select();
  }

  function handleOnKeyDown(e: React.KeyboardEvent<HTMLInputElement>){
    const {key} = e;

    const target = e.target as HTMLInputElement;

    if(key == 'Backspace'){
      if(target.value == ''){
        if(target.previousElementSibling !== null){
          const previousElement = target.previousElementSibling as HTMLInputElement;
          previousElement.value = '';
          previousElement.focus();
        }
      }else { 
        target.value = ''
      }
    }

    sendResult();
  }

  useImperativeHandle(ref , () => ({
    focus: () => {
      if(inputsRef.current){
        inputsRef.current[0].focus;
      }
    },
    clear: () => {
      if(inputsRef.current){
        for(let i = 0; i < inputsRef.current.length; i++){
          inputsRef.current[i].value = '';
        }
        inputsRef.current[0].focus()
      }
      sendResult()
    }
  }))

  const classes = classNames("textbox flex-1 w-1 text-center" , {
    className,
    [`textbox-${variant}`] : variant,
  })

  const inputs = [];
  for(let i = 0; i< length; i++){
    inputs.push(<input
    key={i}
      type="text"
      maxLength={1}
      disabled={isDisabled}
      onChange={handleOnChange}
      onFocus={handleOnFocus}
      onKeyDown={handleOnKeyDown}
      className={classes}
      ref={(el:HTMLInputElement) => {
        inputsRef.current[i] = el;
      }}
    />)
  }
  return <>
  <div className={`flex flex-row-reverse items-center gap-4 `}>
    {
      inputs
    }
  </div>
  </>;
});

export default AuthCode;
