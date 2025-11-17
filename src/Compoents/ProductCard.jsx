import { Package, Edit, Trash2, Tag } from "lucide-react";

export default function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div className="bg-slate-700 border border-slate-600 rounded-lg p-4 hover:border-slate-500 transition-colors">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          <Package className="w-5 h-5 ml-2 text-blue-400" />
          <h3 className="text-white font-semibold text-lg">{product.name}</h3>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => onEdit(product)}
            className="p-1 text-slate-400 hover:text-blue-400 transition-colors"
            title="تعديل"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(product._id)}
            className="p-1 text-slate-400 hover:text-red-400 transition-colors"
            title="حذف"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        {product.description && (
          <p className="text-slate-300">{product.description}</p>
        )}
        
        <div className="grid grid-cols-2 gap-4">
          {product.category && (
            <div className="flex items-center">
              <Tag className="w-4 h-4 ml-1 text-slate-400" />
              <span className="text-slate-300">{product.category}</span>
            </div>
          )}
          
          {product.size && (
            <div className="text-slate-300">
              <span className="font-medium">الحجم:</span> {product.size}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-600">
          <div>
            <div className="text-slate-400 text-xs">سعر الجملة</div>
            <div className="text-green-400 font-semibold">{product.wholesalePrice} د.أ</div>
          </div>
          
          {product.retailPrice && (
            <div>
              <div className="text-slate-400 text-xs">سعر التجزئة</div>
              <div className="text-blue-400 font-semibold">{product.retailPrice} د.أ</div>
            </div>
          )}
        </div>

        <div className="pt-2 border-t border-slate-600">
          <div className="text-slate-400 text-xs">الكمية في المخزن</div>
          <div className={`font-semibold ${
            product.quantityInStock > 10 ? 'text-green-400' : 
            product.quantityInStock > 0 ? 'text-yellow-400' : 'text-red-400'
          }`}>
            {product.quantityInStock} وحدة
            {product.quantityInStock <= 5 && product.quantityInStock > 0 && (
              <span className="text-xs text-yellow-300 mr-1"> (منخفض)</span>
            )}
            {product.quantityInStock === 0 && (
              <span className="text-xs text-red-300 mr-1"> (نفذت)</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 