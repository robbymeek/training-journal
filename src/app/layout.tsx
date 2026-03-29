import './globals.css'

export const metadata = {
  title: 'Training Journal — ILCA 7',
  description: 'LA 2028 Olympic Campaign Training Journal',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
