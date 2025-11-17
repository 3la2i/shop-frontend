import { Phone, MapPin, FileText, Edit, Trash2, Eye } from "lucide-react";

export default function ClientCard({ client, onEdit, onDelete, onShowDetails }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-white font-semibold text-lg mb-1">{client.name}</h3>
          {client.phone && (
            <div className="flex items-center text-slate-300 text-sm mb-1">
              <Phone className="w-4 h-4 ml-1" />
              {client.phone}
            </div>
          )}
          {client.address && (
            <div className="flex items-center text-slate-300 text-sm mb-1">
              <MapPin className="w-4 h-4 ml-1" />
              {client.address}
            </div>
          )}
          {client.notes && (
            <div className="flex items-center text-slate-300 text-sm">
              <FileText className="w-4 h-4 ml-1" />
              {client.notes}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex gap-2">
        <button 
          onClick={() => onEdit(client)} 
          className="flex-1 border border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white rounded py-1 flex items-center justify-center text-sm"
        >
          <Edit className="w-4 h-4 ml-1" />
          تعديل
        </button>
        <button 
          onClick={() => onShowDetails(client._id)} 
          className="flex-1 border border-green-600 text-green-400 hover:bg-green-600 hover:text-white rounded py-1 flex items-center justify-center text-sm"
        >
          <Eye className="w-4 h-4 ml-1" />
          تفاصيل
        </button>
        {/* <button 
          onClick={() => onDelete(client._id)} 
          className="border border-red-600 text-red-400 hover:bg-red-600 hover:text-white rounded py-1 flex items-center justify-center text-sm"
        >
          <Trash2 className="w-4 h-4" />
        </button> */}
      </div>
    </div>
  );
} 