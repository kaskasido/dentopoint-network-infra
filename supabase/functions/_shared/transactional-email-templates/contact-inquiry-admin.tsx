import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Section, Text, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'DentoPoint'
const BRAND = '#0f766e' // emerald/jade accent

interface AdminInquiryProps {
  name?: string
  email?: string
  company?: string
  role?: string
  phone?: string
  message?: string
}

const ContactInquiryAdminEmail = ({
  name, email, company, role, phone, message,
}: AdminInquiryProps) => (
  <Html lang="de" dir="ltr">
    <Head />
    <Preview>Neue Anfrage über die {SITE_NAME} Website</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Neue Kontaktanfrage</Heading>
        <Text style={subtle}>Eingegangen über die {SITE_NAME} Website</Text>

        <Section style={card}>
          <Row label="Name" value={name} />
          <Row label="E-Mail" value={email} />
          <Row label="Firma" value={company} />
          <Row label="Rolle" value={role} />
          <Row label="Telefon" value={phone} />
        </Section>

        <Heading as="h2" style={h2}>Nachricht</Heading>
        <Text style={messageBox}>{message || '—'}</Text>

        <Hr style={hr} />
        <Text style={footer}>{SITE_NAME} · Precision-driven dental infrastructure</Text>
      </Container>
    </Body>
  </Html>
)

const Row = ({ label, value }: { label: string; value?: string }) => (
  <Text style={rowStyle}>
    <span style={rowLabel}>{label}: </span>
    <span style={rowValue}>{value || '—'}</span>
  </Text>
)

export const template = {
  component: ContactInquiryAdminEmail,
  subject: (d: Record<string, any>) =>
    `Neue Anfrage von ${d?.name || 'Interessent'}${d?.company ? ` (${d.company})` : ''}`,
  displayName: 'Kontaktanfrage – Admin-Benachrichtigung',
  to: 'info@dentopoint.care',
  previewData: {
    name: 'Dr. Anna Müller',
    email: 'a.mueller@klinik-beispiel.de',
    company: 'Klinik Beispiel GmbH',
    role: 'Klinik',
    phone: '+49 30 1234567',
    message: 'Wir interessieren uns für ein Pilotprojekt im DACH-Raum.',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Inter, Arial, sans-serif' }
const container = { padding: '32px 28px', maxWidth: '560px' }
const h1 = { fontSize: '22px', fontWeight: 'bold', color: '#0f172a', margin: '0 0 4px' }
const h2 = { fontSize: '14px', fontWeight: 600, color: '#0f172a', margin: '24px 0 8px', textTransform: 'uppercase' as const, letterSpacing: '0.08em' }
const subtle = { fontSize: '13px', color: '#64748b', margin: '0 0 24px' }
const card = { border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px 20px', backgroundColor: '#f8fafc' }
const rowStyle = { fontSize: '14px', color: '#0f172a', margin: '6px 0', lineHeight: '1.5' }
const rowLabel = { color: '#64748b', fontWeight: 500 }
const rowValue = { color: '#0f172a' }
const messageBox = { fontSize: '14px', color: '#0f172a', lineHeight: '1.6', padding: '16px 20px', border: '1px solid #e2e8f0', borderRadius: '8px', whiteSpace: 'pre-wrap' as const, margin: '0' }
const hr = { borderColor: '#e2e8f0', margin: '32px 0 16px' }
const footer = { fontSize: '11px', color: '#94a3b8', margin: '0' }
