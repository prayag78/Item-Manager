import React from "react"

export default function ItemCard({ item, onClick }) {
    
  return (
    <div
      className="cursor-pointer hover:shadow-lg transition-shadow rounded-lg border overflow-hidden"
      onClick={onClick}
    >
      <div className="aspect-square relative overflow-hidden p-3.5 bg-gray-200">
        <img
          src={item.coverImage || "/placeholder.svg"}
          alt={item.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
        />
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-lg truncate">{item.name}</h3>
        <span className="inline-block bg-gray-200 text-xs px-2 py-1 rounded-full">
          {item.type}
        </span>
        <p className="text-gray-600 text-sm truncate">{item.description}</p>
      </div>
    </div>
  )
}
