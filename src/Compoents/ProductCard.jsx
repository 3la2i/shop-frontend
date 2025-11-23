import { Package, Edit, Trash2, Tag, AlertCircle } from "lucide-react";

export default function ProductCard({ product, onEdit, onDelete }) {
  const stockStatus =
    product.quantityInStock > 10 ? "text-emerald-400" : product.quantityInStock > 0 ? "text-amber-400" : "text-red-400";

  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300">
      {/* Header with product name and actions */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="p-2 bg-cyan-500/10 rounded-lg">
            <Package className="w-5 h-5 text-cyan-400" />
          </div>
          <h3 className="text-slate-100 font-semibold text-base line-clamp-2">{product.name}</h3>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(product)}
            className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-all"
            title="تعديل المنتج"
            aria-label="Edit"
          >
            <Edit className="w-4 h-4" />
          </button>
          {/* <button
            onClick={() => onDelete(product._id)}
            className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
            title="حذف المنتج"
            aria-label="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button> */}
        </div>
      </div>

      {/* Description */}
      {product.description && <p className="text-slate-400 text-sm mb-4 line-clamp-2">{product.description}</p>}

      {/* Category and Size */}
      <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-slate-700/50">
        {product.category && (
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-slate-500" />
            <span className="text-slate-300 text-xs">{product.category}</span>
          </div>
        )}
        {product.size && (
          <div className="text-slate-300 text-xs">
            <span className="text-slate-400">الحجم:</span> {product.size}
          </div>
        )}
      </div>

      {/* Pricing */}
      <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-slate-700/50">
        <div>
          <p className="text-slate-500 text-xs mb-1">الجملة</p>
          <p className="text-emerald-400 font-semibold text-sm">{product.wholesalePrice?.toFixed(2)} د.أ</p>
        </div>
        {product.retailPrice && (
          <div>
            <p className="text-slate-500 text-xs mb-1">التجزئة</p>
            <p className="text-cyan-400 font-semibold text-sm">{product.retailPrice?.toFixed(2)} د.أ</p>
          </div>
        )}
      </div>

      {/* Stock Status */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-500 text-xs mb-1">في المخزن</p>
          <p className={`font-semibold text-sm ${stockStatus}`}>{product.quantityInStock} وحدة</p>
        </div>
        {product.quantityInStock <= 5 && product.quantityInStock > 0 && (
          <div className="flex items-center gap-1 bg-amber-500/10 px-2 py-1 rounded-lg">
            <AlertCircle className="w-3 h-3 text-amber-400" />
            <span className="text-xs text-amber-400">منخفض</span>
          </div>
        )}
        {product.quantityInStock === 0 && (
          <div className="flex items-center gap-1 bg-red-500/10 px-2 py-1 rounded-lg">
            <AlertCircle className="w-3 h-3 text-red-400" />
            <span className="text-xs text-red-400">نفذت</span>
          </div>
        )}
      </div>
    </div>
  );
} 