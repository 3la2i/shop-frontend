# Components Documentation

This directory contains reusable React components for the shop management application.

## Components

### Toast
A toast notification component for displaying success, error, and info messages.

**Props:**
- `toasts`: Array of toast objects
- `remove`: Function to remove a toast

### useToast
Custom hook for managing toast notifications.

**Returns:**
- `toast`: Function to add a new toast
- `toasts`: Array of current toasts
- `remove`: Function to remove a toast

### ClientForm
Form component for adding and editing clients.

**Props:**
- `showForm`: Boolean to control form visibility
- `editingClient`: Client object being edited (null for new client)
- `formData`: Form data object
- `setFormData`: Function to update form data
- `onSubmit`: Function called when form is submitted
- `onCancel`: Function called when form is cancelled

### ClientCard
Card component for displaying individual client information.

**Props:**
- `client`: Client object
- `onEdit`: Function called when edit button is clicked
- `onDelete`: Function called when delete button is clicked
- `onShowDetails`: Function called when view details button is clicked

### ClientDetailsModal
Modal component for displaying detailed client information including purchases and payments.

**Props:**
- `isOpen`: Boolean to control modal visibility
- `onClose`: Function called when modal is closed
- `clientDetails`: Object containing client, purchases, and payments data
- `detailsLoading`: Boolean indicating if details are being loaded
- `onAddPayment`: Function called when a payment is added to a purchase

### PaymentForm
Modal form component for adding payments to purchases.

**Props:**
- `isOpen`: Boolean to control form visibility
- `onClose`: Function called when form is closed
- `onSubmit`: Function called when payment form is submitted
- `purchase`: Purchase object to add payment to
- `remainingDebt`: Remaining debt amount for the purchase

### PurchaseForm
Modal form component for creating new purchases with product selection.

**Props:**
- `isOpen`: Boolean to control form visibility
- `onClose`: Function called when form is closed
- `onSubmit`: Function called when purchase form is submitted
- `clientId`: ID of the client to create purchase for

### ProductForm
Form component for adding and editing products.

**Props:**
- `showForm`: Boolean to control form visibility
- `editingProduct`: Product object being edited (null for new product)
- `formData`: Form data object
- `setFormData`: Function to update form data
- `onSubmit`: Function called when form is submitted
- `onCancel`: Function called when form is cancelled

### ProductCard
Card component for displaying individual product information.

**Props:**
- `product`: Product object
- `onEdit`: Function called when edit button is clicked
- `onDelete`: Function called when delete button is clicked

### EmptyState
Component displayed when no data is available.

### LoadingSpinner
Loading indicator component.

**Props:**
- `message`: Loading message to display (default: "جاري التحميل...")

## Hooks

### useClients
Custom hook for managing client-related state and operations.

**Returns:**
- `clients`: Array of clients
- `loading`: Boolean indicating if clients are being loaded
- `showAddForm`: Boolean to control add form visibility
- `editingClient`: Client object being edited
- `formData`: Form data object
- `detailsModalOpen`: Boolean to control details modal visibility
- `clientDetails`: Client details object
- `detailsLoading`: Boolean indicating if details are being loaded
- `setShowAddForm`: Function to control add form visibility
- `setFormData`: Function to update form data
- `fetchClients`: Function to fetch all clients
- `handleSubmit`: Function to handle form submission
- `handleEdit`: Function to handle client editing
- `handleDelete`: Function to handle client deletion
- `handleShowDetails`: Function to handle showing client details
- `resetForm`: Function to reset form state
- `closeDetailsModal`: Function to close details modal
- `addPaymentToPurchase`: Function to add payment to a purchase
- `createPurchaseForClient`: Function to create a new purchase for a client

### useProducts
Custom hook for managing product-related state and operations.

**Returns:**
- `products`: Array of products
- `loading`: Boolean indicating if products are being loaded
- `showAddForm`: Boolean to control add form visibility
- `editingProduct`: Product object being edited
- `formData`: Form data object
- `setShowAddForm`: Function to control add form visibility
- `setFormData`: Function to update form data
- `fetchProducts`: Function to fetch all products
- `handleSubmit`: Function to handle form submission
- `handleEdit`: Function to handle product editing
- `handleDelete`: Function to handle product deletion
- `resetForm`: Function to reset form state 

### useInventory
Custom hook for listing and summarizing purchases for the sales inventory (جرد المبيعات).

**Filters:**
- `startDate`: Filter purchases from date (YYYY-MM-DD)
- `endDate`: Filter purchases to date (YYYY-MM-DD)
- `status`: One of `paid`, `partial`, `unpaid` (or empty for all)
- `customerId`: Filter by a specific customer (or empty for all)

**Returns:**
- `purchases`: Array of populated purchases (with `items.productId` and `customerId`)
- `summary`: `{ overall, byDay }` where `overall` contains totals (sales, paid, debt, count)
- `loading`: Boolean indicating if data is loading
- `clients`: Array of clients for the customer filter dropdown
- `filters`: Current filter values `{ startDate, endDate, status, customerId }`
- `setFilters`: Function to update filters
- `refetch`: Function to manually refetch list and summary

Notes:
- The hook uses the `Authorization` token from `localStorage`.
- On request failure, it returns an empty list/summary to keep the UI stable.