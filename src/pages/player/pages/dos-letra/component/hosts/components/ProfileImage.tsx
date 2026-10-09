export const ProfileImage = ({ image, name, badge }: { image: string; name: string; badge: string }) => {
  return (
    <div className="relative flex-shrink-0 w-full">
      <div className="w-full h-full rounded-2xl overflow-hidden border-2 border-blue-400 bg-gray-100">
        <img src={image} alt={name} className="w-full h-full object-contain" />
      </div>
      <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
        <div className="relative">
          <span className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-lg">👑</span>
          <span className="text-white font-bold text-sm mt-1">{badge}</span>
        </div>
      </div>
    </div>
  )
}