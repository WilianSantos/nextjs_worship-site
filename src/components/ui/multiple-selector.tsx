'use client'

import React from 'react'
import Select, { ActionMeta, MultiValue, SingleValue } from 'react-select'
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
  isMultiple?: boolean
}

const animatedComponents = makeAnimated()

export default function AnimatedMulti({
  options,
  defaultValue = [],
  onChange,
  placeholder = 'Selecione...',
  isMultiple = true
}: Props) {
  return (
    <>
      {isMultiple ? (
        <Select
          isMulti
          components={animatedComponents}
          options={options}
          defaultValue={defaultValue}
          className="w-full"
          onChange={(
            newValue: MultiValue<OptionType>,
            // @ts-expect-error // eslint-disable-next-line @typescript-eslint/no-unused-vars
            _actionMeta: ActionMeta<OptionType>
          ) => {
            onChange([...newValue])
          }}
          placeholder={placeholder}
          filterOption={(candidate, input) =>
            candidate.label?.toLowerCase().includes(input.toLowerCase()) ??
            false
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
          menuPortalTarget={
            typeof window !== 'undefined' ? document.body : null
          }
          menuShouldBlockScroll
          menuPlacement="auto"
        />
      ) : (
        <Select
          components={animatedComponents}
          options={[{ value: '', label: 'Selecione...' }, ...options]}
          defaultValue={defaultValue[0] || null}
          className="w-full"
          onChange={(
            newValue: SingleValue<OptionType>,
            // @ts-expect-error // eslint-disable-next-line @typescript-eslint/no-unused-vars
            _actionMeta: ActionMeta<OptionType>
          ) => {
            if (newValue) {
              onChange([newValue])
            } else {
              onChange([])
            }
          }}
          placeholder={placeholder}
          filterOption={(candidate, input) =>
            candidate.label?.toLowerCase().includes(input.toLowerCase()) ??
            false
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
            menuPortal: (base) => ({
              ...base,
              zIndex: 10
            })
          }}
          menuPortalTarget={
            typeof window !== 'undefined' ? document.body : null
          }
          menuShouldBlockScroll
          menuPlacement="auto"
        />
      )}
    </>
  )
}
