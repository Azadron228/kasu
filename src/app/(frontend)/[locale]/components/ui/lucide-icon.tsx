import React from 'react'
import * as LucideIcons from 'lucide-react'
import { LucideProps } from 'lucide-react'

export type IconName = keyof typeof LucideIcons

interface LucideIconProps extends LucideProps {
  name: string
}

export const LucideIcon: React.FC<LucideIconProps> = ({ name, ...props }) => {
  const Icon = (LucideIcons as any)[name]

  if (!Icon) {
    // If not a valid Lucide icon name, it might be an emoji or just plain text
    return <span className={props.className}>{name}</span>
  }

  return <Icon {...props} />
}
