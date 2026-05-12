import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'DentoPoint'

interface ConfirmationProps {
  name?: string
  message?: string
}

const ContactInquiryConfirmationEmail = ({ name, message }: ConfirmationProps) => (
  <Html lang="de" dir="ltr">
    <Head />
    <Preview>Vielen Dank für Ihre Anfrage bei {SITE_NAME}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>
          {name ? `Vielen Dank, ${name}!` : 'Vielen Dank für Ihre Anfrage!'}
        </Heading>
        <Text style={text}>
          Wir haben Ihre Nachricht erhalten und melden uns innerhalb von 1–2 Werktagen
          persönlich bei Ihnen.
        </Text>

        {message ? (
          <>
            <Text style={subtle}>Ihre Nachricht:</Text>
            <Text style={messageBox}>{message}</Text>
          </>
        ) : null}

        <Hr style={hr} />
        <Text style={footer}>
          {SITE_NAME} · Precision-driven dental infrastructure<br />
          info@dentopoint.care
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ContactInquiryConfirmationEmail,
  subject: 'Wir haben Ihre Anfrage erhalten – DentoPoint',
  displayName: 'Kontaktanfrage – Bestätigung an Absender',
  previewData: {
    name: 'Dr. Anna Müller',
    message: 'Wir interessieren uns für ein Pilotprojekt im DACH-Raum.',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Inter, Arial, sans-serif' }
const container = { padding: '32px 28px', maxWidth: '560px' }
const h1 = { fontSize: '22px', fontWeight: 'bold', color: '#0f172a', margin: '0 0 16px' }
const text = { fontSize: '14px', color: '#334155', lineHeight: '1.6', margin: '0 0 20px' }
const subtle = { fontSize: '12px', color: '#64748b', margin: '24px 0 6px', textTransform: 'uppercase' as const, letterSpacing: '0.08em', fontWeight: 600 }
const messageBox = { fontSize: '14px', color: '#0f172a', lineHeight: '1.6', padding: '16px 20px', border: '1px solid #e2e8f0', borderRadius: '8px', whiteSpace: 'pre-wrap' as const, margin: '0', backgroundColor: '#f8fafc' }
const hr = { borderColor: '#e2e8f0', margin: '32px 0 16px' }
const footer = { fontSize: '11px', color: '#94a3b8', margin: '0', lineHeight: '1.6' }
