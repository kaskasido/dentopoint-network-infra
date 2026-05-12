/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'

export interface TemplateEntry {
  component: React.ComponentType<any>
  subject: string | ((data: Record<string, any>) => string)
  to?: string
  displayName?: string
  previewData?: Record<string, any>
}

import { template as contactInquiryAdmin } from './contact-inquiry-admin.tsx'
import { template as contactInquiryConfirmation } from './contact-inquiry-confirmation.tsx'

export const TEMPLATES: Record<string, TemplateEntry> = {
  'contact-inquiry-admin': contactInquiryAdmin,
  'contact-inquiry-confirmation': contactInquiryConfirmation,
}
