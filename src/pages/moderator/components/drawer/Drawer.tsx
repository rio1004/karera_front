import { useDrawerStore } from "@/store/moderator/useDrawerStore"
import { X } from "lucide-react"

const Drawer = () => {
  const { isOpen, content, closeDrawer } = useDrawerStore()

  return (
    <div
      className={`fixed inset-0 z-50 transition-all ${
        isOpen ? "visible" : "invisible"
      }`}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={closeDrawer}
      />

      {/* Drawer Panel */}
      <div
        className={`absolute right-0 top-0 h-full w-72 bg-white shadow-xl p-4 transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <button onClick={closeDrawer}>
            <X className="w-5 h-5" />
          </button>
        </div>
        <div>{content}</div>
      </div>
    </div>
  )
}

export default Drawer
