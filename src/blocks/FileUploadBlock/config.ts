import { Block } from "payload"

export const FileUploadBlock: Block = {
    slug: 'fileUpload',
    labels: {
        singular: 'File Upload',
        plural: 'File Upload Fields',
    },
    fields: [
        {
            name: 'name',
            label: 'Name (lowercase, no special characters)',
            type: 'text',
            required: true,
        },
        {
            name: 'label',
            label: 'Label',
            type: 'text',
            required: true,
        },
        {
            name: 'required',
            label: 'Required',
            type: 'checkbox',
        },
        {
            name: 'width',
            label: 'Field Width (percentage)',
            type: 'number',
        },
    ],
}