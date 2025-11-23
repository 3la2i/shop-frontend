import { Phone, MapPin, FileText, Edit, Eye } from "lucide-react";

export default function ClientCard({ client, onEdit, onDelete, onShowDetails }) {
  return (
    <div className="bg-surface border border-border rounded-2xl p-4 hover:bg-surface-light transition-all duration-200 active:scale-95">
      <div className="flex justify-between items-start gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-semibold text-base mb-2 line-clamp-1">{client.name}</h3>
          {/* Contact info with better spacing */}
          <div className="space-y-1.5">
            {client.phone && (
              <div className="flex items-center gap-2 text-text-secondary text-sm">
                <Phone className="w-4 h-4 flex-shrink-0 text-primary" />
                <span className="truncate">{client.phone}</span>
              </div>
            )}
            {client.address && (
              <div className="flex items-center gap-2 text-text-secondary text-sm">
                <MapPin className="w-4 h-4 flex-shrink-0 text-primary" />
                <span className="truncate">{client.address}</span>
              </div>
            )}
            {client.notes && (
              <div className="flex items-start gap-2 text-text-tertiary text-xs">
                <FileText className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span className="line-clamp-2">{client.notes}</span>
              </div>
            )}
          </div>
        </div>
        {/* Status indicator */}
        <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
          <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onShowDetails(client._id)}
          className="flex-1 bg-primary hover:bg-primary-dark text-white rounded-lg py-2.5 flex items-center justify-center gap-2 text-sm font-medium transition-colors active:scale-95"
        >
          <Eye className="w-4 h-4" />
          تفاصيل
        </button>
        <button
          onClick={() => onEdit(client)}
          className="flex-1 border border-border bg-surface-light hover:bg-border/20 text-text rounded-lg py-2.5 flex items-center justify-center gap-2 text-sm font-medium transition-colors active:scale-95"
        >
          <Edit className="w-4 h-4" />
          تعديل
        </button>
      </div>
    </div>
  );
} 