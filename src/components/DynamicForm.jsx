import React from 'react'
import styles from '../styles/DynamicForm.module.css'
import { useForm } from 'react-hook-form'

const DynamicForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  })
  const firstInput = watch('firstInput')

  const onSubmit = (data) => {
    alert(
      `FORM SENT: 1.First Field:' ${JSON.stringify(
        data.firstInput
      )}, 2. Second Field: ${JSON.stringify(data.secondInput)}`
    )
    console.log(data)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.fieldInput}>
          <label htmlFor="firstInput">First Field</label>
          <input
            id="firstInput"
            className={styles.input}
            placeholder="Enter you text..."
            type="text"
            {...register('firstInput', {
              required: 'The field must be filled',
              minLength: {
                value: 8,
                message: 'Minimum 8 symbols!!!',
              },
            })}
          />
          {errors.firstInput && <p>{firstInput.errors.message}</p>}
        </div>

        {firstInput && firstInput.length >= 5 && (
          <div className={styles.fieldInput}>
            <label htmlFor="secondInput">Second Field</label>
            <input
              id="secondInput"
              className={styles.input}
              type="type"
              placeholder="Enter you text..."
              {...register('secondInput', {
                required: true,
                validate: (value) =>
                  value.includes('@') || 'The symbol @ is required',
              })}
            />
            {errors.secondInput && <p>{errors.secondInput.message}</p>}
          </div>
        )}

        <button
          type="submit"
          disabled={!isValid}
          className={`${styles.button} ${
            isValid ? styles.enable : styles.disabled
          }`}
        >
          Enter
        </button>
      </form>
    </div>
  )
}

export default DynamicForm
