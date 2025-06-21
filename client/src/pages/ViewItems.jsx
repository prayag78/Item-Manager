import React, { useState, useEffect, useContext } from "react"
import { Package } from 'lucide-react';
import ItemCard from "../components/ItemCard"
import ItemModal from "../components/ItemModal"
import { AppContext } from '../context/AppContext'

const ViewItemsPage = () => {
  const { items, getAllItems } = useContext(AppContext)
  const [selectedItem, setSelectedItem] = useState(null)
  useEffect(() => {
    getAllItems() 
   }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">View Items</h1>
      <p className="text-gray-600 mb-8">Browse all items in your inventory</p>

      {items.length === 0 ? (
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No items</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by adding your first item.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item, key) => (
            <ItemCard key={key} item={item} onClick={() => setSelectedItem(item)} />
          ))}
        </div>
      )}

      {selectedItem && (
        <ItemModal
          item={selectedItem}
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  )
}
export default ViewItemsPage;