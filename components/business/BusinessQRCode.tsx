'use client'

import { QRCodeSVG } from 'qrcode.react'
import Card from '@/components/ui/Card'

interface BusinessQRCodeProps {
  businessId: string
  businessName: string
}

export default function BusinessQRCode({ businessId, businessName }: BusinessQRCodeProps) {
  const rateUrl = `${typeof window !== 'undefined' ? window.location.origin : 'https://gsi.rw'}/rate?business=${businessId}`

  const handleDownload = () => {
    const svg = document.getElementById('business-qr-code')
    if (!svg) return
    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx?.drawImage(img, 0, 0)
      const a = document.createElement('a')
      a.download = `${businessName}-qrcode.png`
      a.href = canvas.toDataURL('image/png')
      a.click()
    }
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData)
  }

  return (
    <Card padding="md">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Rate QR Code</h3>
      <div className="flex flex-col items-center">
        <div className="bg-white border-4 border-gray-900 rounded-xl p-3 mb-4">
          <QRCodeSVG
            id="business-qr-code"
            value={rateUrl}
            size={160}
            bgColor="#ffffff"
            fgColor="#111827"
            level="H"
            includeMargin={false}
          />
        </div>
        <p className="text-sm text-gray-600 text-center mb-3">
          Scan to rate <span className="font-semibold text-gray-900">{businessName}</span> instantly
        </p>
        <div className="w-full bg-gray-50 rounded-lg px-3 py-2 text-center mb-4">
          <p className="text-xs text-gray-400 mb-1">Direct link</p>
          <code className="text-xs text-gray-700 break-all">{rateUrl}</code>
        </div>
        <button
          onClick={handleDownload}
          className="w-full bg-gray-900 hover:bg-black text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          Download QR Code
        </button>
      </div>
    </Card>
  )
}
