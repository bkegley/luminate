import React from 'react'
import {Field} from 'formik'
import {Input, Combobox, Button} from '@luminate/gatsby-theme-luminate/src'

interface ModalForm {
  coffeeOptions?: Array<{name: string; value: string}>
  onSubmit: ({sampleNumber, coffee}: {sampleNumber: string; coffee: string}) => void
  onCancel: () => void
  sampleNumber?: string
  coffee?: string
  index: number
}

const CreateSessionCoffee = ({
  coffeeOptions,
  onSubmit,
  onCancel,
  sampleNumber: initialSampleNumber,
  coffee: initialCoffee,
  index,
}: ModalForm) => {
  const [sampleNumber, setSampleNumber] = React.useState(initialSampleNumber || '')
  const [coffee, setCoffee] = React.useState(initialCoffee || '')

  const resetForm = () => {
    setSampleNumber('')
    setCoffee('')
  }

  React.useEffect(() => {
    setCoffee(initialCoffee || '')
  }, [initialCoffee])

  return (
    <div className="bg-white p-10">
      <div className="w-5/12">
        <label htmlFor={`sampleNumber-${index}`}>Sample Number</label>
        <Input
          id={`sampleNumber-${index}`}
          type="text"
          value={sampleNumber}
          onChange={(e: React.FormEvent<HTMLInputElement>) => setSampleNumber(e.currentTarget.value)}
        />
      </div>
      <div className="w-5/12">
        <label htmlFor={`coffeeOption-${index}`}>Coffee</label>
        <Combobox
          id={`coffeeOption-${index}`}
          options={coffeeOptions}
          initialSelectedItem={coffeeOptions?.find(option => option.value === coffee)}
          onChange={value => {
            if (value.selectedItem) {
              setCoffee(value.selectedItem.value)
            }
          }}
        />
      </div>
      <div>
        <Button
          variant="text"
          onClick={() => {
            resetForm()
            onCancel()
          }}
        >
          Cancel
        </Button>
      </div>
      <div>
        <Button
          onClick={() => {
            resetForm()
            onSubmit({sampleNumber, coffee})
          }}
        >
          Save
        </Button>
      </div>
    </div>
  )
}

export default CreateSessionCoffee
