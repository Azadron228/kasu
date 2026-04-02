export type FileUploadFieldProps = {
    name: string
    required: boolean
    disabled?: boolean
    onChange: (name: string, value: File | null) => void
    baseInputClasses: string
}

export function FileUploadField({ name, required, disabled, onChange, baseInputClasses }: FileUploadFieldProps) {
    return (
        <input
            type="file"
            name={name}
            required={required}
            disabled={disabled}
            onChange={(e) => onChange(name, e.target.files?.[0] || null)}
            className={`${baseInputClasses} file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[13px] file:font-bold file:bg-sky-pale file:text-navy hover:file:bg-[#dbe9f6] transition-all cursor-pointer p-2.5`}
        />
    )
}