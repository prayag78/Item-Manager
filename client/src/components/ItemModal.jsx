import React, { useState } from "react"
import { ChevronsLeft, ChevronsRight, Mail  } from 'lucide-react';
import sendEmail from "./SendEmail"
import { toast, Toaster } from 'react-hot-toast';

export default function ItemModal({ item, isOpen, onClose }) {
  const [idx, setIdx] = useState(0)
  const images = [item.coverImage, ...item.additionalImages]

  if (!isOpen) return null

  const next = () => setIdx((c) => (c + 1) % images.length)
  const prev = () => setIdx((c) => (c - 1 + images.length) % images.length)

  const enquire = () => {
    sendEmail(item)
    const notify = () => toast(`Enquiry Sent!`); 
    notify()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-4">{item.name}</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="relative aspect-square bg-gray-100 overflow-hidden rounded-lg">
              <img
                src={images[idx] || "/placeholder.svg"}
                alt={`${item.name} - ${idx + 1}`}
                className="object-cover w-full h-full"
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
                  >
                    <ChevronsLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
                  >
                    <ChevronsRight className="h-4 w-4" />
                  </button>
                </>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg border-2 overflow-hidden ${
                      idx === i ? "border-blue-500" : "border-gray-200"
                    }`}
                  >
                    <img src={img || "/placeholder.svg"} alt={`Thumb ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {images.length > 1 && (
              <div className="text-center text-sm text-gray-500">
                {idx + 1} of {images.length}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <span className="inline-block border px-3 py-1 rounded text-gray-700">{item.type}</span>
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>

            <button
              onClick={enquire}
              className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded"
            >
              <Mail className="h-4 w-4 mr-2" /> Enquire
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
