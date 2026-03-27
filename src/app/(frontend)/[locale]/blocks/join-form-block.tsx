'use client'

import React, { useState } from 'react'
import type { Form as FormType } from '@/payload-types'
import { useTranslations } from 'next-intl'

type Field = NonNullable<FormType['fields']>[number]

type FieldProps = {
  field: Field
  value: string
  onChange: (name: string, value: string) => void
  disabled?: boolean
}

function FormField({ field, value, onChange, disabled }: FieldProps) {
  const baseInput =
    'w-full px-4 py-3 border border-silver-lt rounded-xl focus:ring-2 focus:ring-sky/40 focus:border-sky outline-none bg-white transition-all text-navy placeholder:text-brand-muted disabled:opacity-50'

  const label = 'label' in field ? field.label : null
  const name = 'name' in field ? field.name : null
  const placeholder = 'placeholder' in field ? (field as any).placeholder : null
  const required = 'required' in field ? field.required : false
  const width = 'width' in field ? field.width : null

  const widthClass =
    width && width < 100
      ? `w-[${width}%]`
      : 'w-full'

  if (field.blockType === 'message') {
    return null // messages are decorative; skip
  }

  if (!name) return null

  return (
    <div className={`flex flex-col gap-1.5 ${widthClass}`}>
      {label && (
        <label className="text-sm font-semibold text-navy/80">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {field.blockType === 'textarea' ? (
        <textarea
          name={name}
          placeholder={placeholder ?? ''}
          required={!!required}
          disabled={disabled}
          rows={4}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          className={`${baseInput} resize-y`}
        />
      ) : field.blockType === 'select' ? (
        <select
          name={name}
          required={!!required}
          disabled={disabled}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          className={baseInput}
        >
          <option value="">—</option>
          {(field.options ?? []).map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : field.blockType === 'checkbox' ? (
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            name={name}
            required={!!required}
            disabled={disabled}
            checked={value === 'true'}
            onChange={(e) => onChange(name, String(e.target.checked))}
            className="w-4 h-4 accent-sky rounded"
          />
          {label && <span className="text-sm text-navy/80">{label}</span>}
        </label>
      ) : (
        <input
          type={
            field.blockType === 'email'
              ? 'email'
              : field.blockType === 'number'
                ? 'number'
                : 'text'
          }
          name={name}
          placeholder={placeholder ?? ''}
          required={!!required}
          disabled={disabled}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          className={baseInput}
        />
      )}
    </div>
  )
}

type Props = {
  form: FormType
}

export default function JoinFormBlock({ form }: Props) {
  const t = useTranslations('join')
  const [values, setValues] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('submitting')

    const submissionData = Object.entries(values).map(([field, value]) => ({ field, value }))

    try {
      const res = await fetch(`/api/form-submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form: form.id,
          submissionData,
        }),
      })

      if (!res.ok) throw new Error('Failed')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 px-6 gap-5">
        <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center text-4xl shadow-lg">
          ✅
        </div>
        <h3 className="font-serif text-2xl text-navy font-bold">{t('successTitle')}</h3>
        <p className="text-brand-muted text-base max-w-sm">{t('successMessage')}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <div className="flex flex-wrap gap-4">
        {(form.fields ?? []).map((field) => {
          const name = 'name' in field ? field.name : field.id ?? ''
          return (
            <FormField
              key={field.id ?? name}
              field={field}
              value={values[name] ?? ''}
              onChange={handleChange}
              disabled={status === 'submitting'}
            />
          )
        })}
      </div>

      {status === 'error' && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          {t('errorMessage')}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-2 w-full bg-gradient-to-r from-navy-deep to-navy text-white font-bold py-4 rounded-xl hover:-translate-y-0.5 hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:translate-y-0 text-sm tracking-wide"
      >
        {status === 'submitting' ? t('submitting') : (form.submitButtonLabel ?? t('submitting'))}
      </button>
    </form>
  )
}
