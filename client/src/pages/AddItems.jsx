import React, { useState, useContext } from "react"
import { toast } from "react-hot-toast"
import { AppContext } from "../context/AppContext"

const itemTypes = [
  "Shirt",
  "Pant",
  "Shoes",
  "Sports Gear",
  "Accessories",
  "Electronics",
  "Books",
  "Other",
]

const AddItems = () => {
  const { createItem } = useContext(AppContext)

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    coverImage: null,
    additionalImages: [],
  })
  const [previewCover, setPreviewCover] = useState(null)
  const [previewAdditional, setPreviewAdditional] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleImageUpload = (e, isCover = false) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (isCover) {
      setFormData(prev => ({ ...prev, coverImage: file }))
      setPreviewCover(URL.createObjectURL(file))
    } else {
      setFormData(prev => ({
        ...prev,
        additionalImages: [...prev.additionalImages, file],
      }))
      setPreviewAdditional(prev => [...prev, URL.createObjectURL(file)])
    }
  }

  const removeCoverImage = () => {
    setFormData(prev => ({ ...prev, coverImage: null }))
    setPreviewCover(null)
  }

  const removeAdditionalImage = index => {
    setFormData(prev => ({
      ...prev,
      additionalImages: prev.additionalImages.filter((_, i) => i !== index),
    }))
    setPreviewAdditional(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (
      !formData.name ||
      !formData.type ||
      !formData.description ||
      !formData.coverImage
    ) {
      toast.error("Please fill all required fields including a cover image.")
      return
    }

    setIsSubmitting(true)
    const data = new FormData()
    data.append("name", formData.name)
    data.append("type", formData.type)
    data.append("description", formData.description)
    data.append("coverImage", formData.coverImage)
    formData.additionalImages.forEach(img => {
      data.append("additionalImages", img)
    })

    try {
      await createItem(data)
      //
      toast.success("Item successfully added.")
      setFormData({
        name: "",
        type: "",
        description: "",
        coverImage: null,
        additionalImages: [],
      })
      setPreviewCover(null)
      setPreviewAdditional([])
    } catch (error) {
      console.error("Error creating item:", error)
      toast.error("Failed to create item.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Add New Item</h1>
      <p className="text-gray-600 mb-6">
        Fill in the details to add a new item to your inventory.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg p-6 space-y-6 shadow-md"
        encType="multipart/form-data"
      >
        {/* Item Name */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            Item Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={e =>
              setFormData({ ...formData, name: e.target.value })
            }
            placeholder="Enter item name"
            className="w-full border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Item Type */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="type">
            Item Type <span className="text-red-500">*</span>
          </label>
          <select
            id="type"
            value={formData.type}
            onChange={e =>
              setFormData({ ...formData, type: e.target.value })
            }
            className="w-full border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select item type</option>
            {itemTypes.map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="description"
          >
            Item Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            rows="4"
            value={formData.description}
            onChange={e =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Describe the item..."
            className="w-full border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Cover Image */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="cover">
            Cover Image <span className="text-red-500">*</span>
          </label>
          <input
            id="cover"
            type="file"
            accept="image/*"
            onChange={e => handleImageUpload(e, true)}
            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-md file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            required
          />
          {previewCover && (
            <div className="mt-3 relative inline-block">
              <img
                src={previewCover}
                alt="Cover Preview"
                className="w-32 h-32 object-cover rounded-md border"
              />
              <button
                type="button"
                onClick={removeCoverImage}
                className="absolute top-1 right-1 bg-red-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs hover:bg-red-700"
                aria-label="Remove cover image"
              >
                &times;
              </button>
            </div>
          )}
        </div>

        {/* Additional Images */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="additional">
            Additional Images
          </label>
          <input
            id="additional"
            type="file"
            accept="image/*"
            onChange={e => handleImageUpload(e, false)}
            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-md file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {previewAdditional.length > 0 && (
            <div className="mt-3 grid grid-cols-4 gap-3">
              {previewAdditional.map((img, index) => (
                <div key={index} className="relative">
                  <img
                    src={img}
                    alt={`Additional ${index + 1}`}
                    className="w-20 h-20 object-cover rounded-md border"
                  />
                  <button
                    type="button"
                    onClick={() => removeAdditionalImage(index)}
                    className="absolute top-1 right-1 bg-red-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs hover:bg-red-700"
                    aria-label={`Remove additional image ${index + 1}`}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition-opacity disabled:opacity-50"
        >
          {isSubmitting ? "Adding Item..." : "Add Item"}
        </button>
      </form>
    </div>
  )
}

export default AddItems
