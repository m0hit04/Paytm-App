export function InputBox({label, placeholder, onChange, type}) {
    return <div>
      <div className="text-sm font-medium text-left py-2">
        {label}
      </div>
      <input type={type} placeholder={placeholder} onChange={onChange} required className="w-full px-2 py-1 border rounded border-slate-200" />
    </div>
}