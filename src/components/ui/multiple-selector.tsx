'use client'

import React from 'react'

import Select from 'react-select'
import makeAnimated from 'react-select/animated'

type OptionType = {
  value: string
  label: string
}

type SelectOption = {
  options: OptionType[]
  defaultValue?: OptionType[]
  onChange?: (value: OptionType[]) => void
}

const animatedComponents = makeAnimated()

export default function AnimatedMulti({
  options,
  defaultValue,
  onChange
}: SelectOption) {
  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      defaultValue={defaultValue}
      isMulti
      options={options}
      onChange={onChange}
      styles={{
        control: (base) => ({
          ...base,
          backgroundColor: '#f9fafb',
          borderColor: '#d1d5db',
          '&:hover': {
            borderColor: '#4f46e5'
          },
          boxShadow: 'none'
        }),
        option: (base, { isFocused, isSelected }) => ({
          ...base,
          backgroundColor: isSelected
            ? '#6366f1'
            : isFocused
              ? '#e0e7ff'
              : undefined,
          color: isSelected ? 'white' : '#1f2937'
        }),
        multiValue: (base) => ({
          ...base,
          backgroundColor: '#c7d2fe'
        }),
        multiValueLabel: (base) => ({
          ...base,
          color: '#4f46e5'
        }),
        multiValueRemove: (base) => ({
          ...base,
          color: '#4f46e5',
          ':hover': {
            backgroundColor: '#4f46e5',
            color: 'white'
          }
        })
      }}
    />
  )
}
