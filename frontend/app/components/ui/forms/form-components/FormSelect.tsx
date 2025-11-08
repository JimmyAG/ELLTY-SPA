import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import Select, { MultiValue, SingleValue } from 'react-select'

const formClasses =
  'block w-full appearance-none text-gray-900 placeholder-gray-400 sm:text-sm'

export type SelectOption = {
  label: string
  value: string
  meta?: Record<string | number, string | number>
}

interface FormSelectProps<T extends FieldValues> {
  className?: string
  control: Control<T>
  name: Path<T>
  disabled?: boolean
  formLabel?: string
  placeholder: string
  showTimeInput?: boolean
  options?: SelectOption[]
  showChevron?: boolean
  value?: string
  isMulti?: boolean
}

const FormSelect = <T extends FieldValues>({
  control,
  name,
  options,
  placeholder,
  ...props
}: FormSelectProps<T>) => {
  return (
    <div
      className={`flex flex-col gap-2 ${props.className} ${formClasses}`}
      onMouseDown={(e) => {
        e.stopPropagation()
      }}
    >
      {props.formLabel}
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => {
          return (
            <div className='relative'>
              <Select<SelectOption, boolean>
                {...field}
                className={'basic-single'}
                filterOption={(option, input) =>
                  option.label.toLowerCase().includes(input.toLowerCase())
                }
                isMulti={props.isMulti}
                isDisabled={props.disabled}
                isClearable
                isSearchable
                name={name}
                options={options}
                onChange={(selectedOption) => {
                  if (props.isMulti) {
                    // For multi-select, return array of values
                    const selectedItems =
                      selectedOption as MultiValue<SelectOption>
                    field.onChange(selectedItems || [])
                  } else {
                    // For single select, return single value
                    const value =
                      (selectedOption as SingleValue<SelectOption>)?.value || ''
                    field.onChange(value)
                  }
                }}
                placeholder={placeholder}
                value={
                  props.isMulti
                    ? options?.filter((opt) => {
                        return (
                          field.value as SelectOption[] | undefined
                        )?.some((item) => item.value === opt.value)
                      })
                    : (options?.find(
                        (opt) => opt.value === (props.value ?? field.value)
                      ) ?? null)
                }
              />

              <p className='text-sm text-red-600'>{error?.message ?? ''}</p>
            </div>
          )
        }}
      />
    </div>
  )
}

export default FormSelect
