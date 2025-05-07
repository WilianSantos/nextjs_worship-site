'use client'

import React from 'react'
import Select, { ActionMeta, MultiValue } from 'react-select'
import makeAnimated from 'react-select/animated'

export type OptionType = {
  value: string | undefined
  label: string | undefined
}

type Props = {
  options: OptionType[]
  defaultValue?: OptionType[]
  onChange: (value: OptionType[]) => void
  placeholder?: string
}

const animatedComponents = makeAnimated()

export default function AnimatedMulti({
  options,
  defaultValue = [],
  onChange,
  placeholder = 'Selecione...'
}: Props) {
  return (
    <Select
      isMulti
      components={animatedComponents}
      options={options}
      defaultValue={defaultValue}
      onChange={(
        newValue: MultiValue<OptionType>,
        _actionMeta: ActionMeta<OptionType>
      ) => {
        onChange([...newValue])
      }}
      placeholder={placeholder}
      filterOption={(candidate, input) =>
        candidate.label.toLowerCase().includes(input.toLowerCase())
      }
      styles={{
        control: (base) => ({
          ...base,
          backgroundColor: '#f9fafb',
          borderColor: '#d1d5db',
          '&:hover': { borderColor: '#4f46e5' },
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
        }),
        menuPortal: (base) => ({
          ...base,
          zIndex: 10
        })
      }}
      menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
      menuShouldBlockScroll
      menuPlacement="auto"
    />
  )
}
