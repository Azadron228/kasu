'use client'

import React, { useState } from 'react'
import type { Form as FormType } from '@/payload-types'
import { useTranslations } from 'next-intl'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import RichText from '@/fields/RichText'
import { FileUploadField } from '@/blocks/FileUploadBlock/Component'

type Field = NonNullable<FormType['fields']>[number]

type FieldProps = {
  field: Field
  value: any
  onChange: (name: string, value: any) => void
  disabled?: boolean
  error?: boolean
}

function FormField({ field, value, onChange, disabled, error }: FieldProps) {
  const baseInput =
    `w-full px-4 py-3.5 border rounded-2xl focus:ring-4 focus:ring-sky/10 outline-none bg-white transition-all text-navy placeholder:text-brand-muted/50 disabled:opacity-50 text-sm shadow-sm ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10' : 'border-silver-lt/70 focus:border-sky'
    }`

  const label = 'label' in field ? field.label : null
  const name = 'name' in field ? field.name : null
  const placeholder = 'placeholder' in field ? (field as any).placeholder : null
  const required = 'required' in field ? field.required : false
  const width = 'width' in field ? (field as any).width : null

  const isFullWidth = !width || width === 100 || field.blockType === 'textarea' || field.blockType === 'fileUpload'

  if (field.blockType === 'message') {
    return (
      <div className="col-span-full py-2">
        {field.message && <RichText data={field.message as any} enableGutter={false} enableProse={false} className="text-sm text-brand-muted italic" />}
      </div>
    )
  }

  if (!name) return null

  return (
    <div className={`flex flex-col gap-2 ${isFullWidth ? 'col-span-full' : 'col-span-1'}`}>
      {label && (
        <label className={`text-[13px] font-bold ml-1 transition-colors ${error ? 'text-red-500' : 'text-navy/70'}`}>
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
          rows={5}
          value={value ?? ''}
          onChange={(e) => onChange(name, e.target.value)}
          className={`${baseInput} resize-none`}
        />
      ) : field.blockType === 'select' ? (
        <div className="relative">
          <select
            name={name}
            required={!!required}
            disabled={disabled}
            value={value ?? ''}
            onChange={(e) => onChange(name, e.target.value)}
            className={`${baseInput} appearance-none cursor-pointer`}
          >
            <option value="">—</option>
            {(field.options ?? []).map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-navy/30">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
          </div>
        </div>
      ) : field.blockType === 'checkbox' ? (
        <label className="flex items-center gap-3 cursor-pointer group mt-1 ml-1">
          <div className="relative flex items-center justify-center">
            <input
              type="checkbox"
              name={name}
              required={!!required}
              disabled={disabled}
              checked={value === 'true'}
              onChange={(e) => onChange(name, String(e.target.checked))}
              className={`peer w-5 h-5 appearance-none border-2 rounded-lg checked:bg-sky checked:border-sky transition-all cursor-pointer ${error ? 'border-red-400' : 'border-silver-lt'
                }`}
            />
            <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
          </div>
          {label && <span className={`text-sm font-medium transition-colors ${error ? 'text-red-500' : 'text-navy/80 group-hover:text-navy'}`}>{label}</span>}
        </label>
      ) : field.blockType === 'fileUpload' ? (
        // --- Now using the extracted component ---
        <FileUploadField
          name={name}
          required={!!required}
          disabled={disabled}
          onChange={onChange}
          baseInputClasses={baseInput}
        />
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
          value={value ?? ''}
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
  const [values, setValues] = useState<Record<string, any>>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error' | 'validation_error'>('idle')
  const [errorFields, setErrorFields] = useState<string[]>([])

  const handleChange = (name: string, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }))
    if (status === 'validation_error') {
      setErrorFields(prev => prev.filter(f => f !== name))
      if (errorFields.length <= 1) setStatus('idle')
    }
  }

  const validate = () => {
    const missingFields: string[] = []
    const invalidFields: string[] = []

      ; (form.fields ?? []).forEach((field) => {
        const name = 'name' in field ? field.name : null
        if (!name) return

        const required = 'required' in field ? field.required : false
        const val = values[name]
        const label = 'label' in field ? field.label : name

        if (required && (!val || (typeof val === 'string' && val.trim() === '') || val === 'false')) {
          missingFields.push(name)
        } else if (val && typeof val === 'string' && val.trim() !== '') {
          if (field.blockType === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(val)) {
              invalidFields.push(name)
            }
          }
        }
      })

    const allErrors = [...missingFields, ...invalidFields]
    if (allErrors.length > 0) {
      setErrorFields(allErrors)
      setStatus('validation_error')
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validate()) return

    setStatus('submitting')

    try {
      const submissionData: { field: string; value: string }[] = []
      let uploadedFileId: string | null = null

      for (const [field, value] of Object.entries(values)) {
        if (value instanceof File) {
          const formData = new FormData()
          formData.append('file', value)
          const mediaRes = await fetch('/api/media', {
            method: 'POST',
            body: formData,
          })

          if (!mediaRes.ok) throw new Error('File upload failed')

          const mediaData = await mediaRes.json()

          uploadedFileId = mediaData.doc?.id

          submissionData.push({ field, value: mediaData.doc?.url || `File ID: ${mediaData.doc?.id}` })
        } else {
          submissionData.push({ field, value })
        }
      }

      const res = await fetch(`/api/form-submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form: form.id,
          submissionData,
          ...(uploadedFileId && { uploadedFile: uploadedFileId })
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
      <div className="flex flex-col items-center justify-center text-center py-16 px-6 gap-6">
        <div className="w-24 h-24 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 shadow-[0_0_40px_rgba(16,185,129,0.1)] ring-8 ring-emerald-50/50">
          <CheckCircle2 size={56} strokeWidth={2} />
        </div>
        <div>
          <h3 className="font-serif text-3xl text-navy font-bold mb-3">{t('successTitle')}</h3>
          {form.confirmationMessage ? (
            <div className="text-brand-muted text-base max-w-md mx-auto prose-p:leading-relaxed">
              <RichText data={form.confirmationMessage as any} enableGutter={false} enableProse={false} />
            </div>
          ) : (
            <p className="text-brand-muted text-base max-w-sm">{t('successMessage')}</p>
          )}
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8" noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
        {(form.fields ?? []).map((field) => {
          const name = 'name' in field ? field.name : field.id ?? ''
          return (
            <FormField
              key={field.id ?? name}
              field={field}
              value={values[name]}
              onChange={handleChange}
              disabled={status === 'submitting'}
              error={errorFields.includes(name)}
            />
          )
        })}
      </div>

      {status === 'validation_error' && (
        <div className="flex items-start gap-3 text-sm font-medium text-amber-700 bg-amber-50/80 border border-amber-200 rounded-2xl px-6 py-4 animate-in fade-in slide-in-from-top-1 duration-300">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p>
            {t('requiredFields', {
              fields: (form.fields ?? [])
                .filter(f => 'name' in f && errorFields.includes(f.name as string))
                .map(f => 'label' in f ? f.label : (f as any).name)
                .join(', ')
            })}
          </p>
        </div>
      )}

      {status === 'error' && (
        <div className="flex items-start gap-3 text-sm font-medium text-red-600 bg-red-50/50 border border-red-100 rounded-2xl px-6 py-4 animate-in fade-in slide-in-from-top-1 duration-300">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p>{t('errorMessage')}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-2 w-full bg-gradient-to-r from-navy to-navy-mid text-white font-bold py-4 px-8 rounded-2xl hover:shadow-[0_12px_24px_rgba(30,53,96,0.2)] hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:translate-y-0 text-sm tracking-widest uppercase shadow-md flex items-center justify-center gap-3"
      >
        {status === 'submitting' ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            {t('submitting')}
          </>
        ) : (
          <>
            {form.submitButtonLabel ?? t('submitting')}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
          </>
        )}
      </button>
    </form>
  )
}