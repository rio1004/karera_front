export const ProfileField = ({
  icon,
  label,
  heading = false,
}: {
  icon: string | React.ReactNode
  label: string
  heading?: boolean
}) => {
  return (
    <div className="flex items-center gap-2">
      {typeof icon === "string" ? <span className="text-red-500">{icon}</span> : icon}
      {heading ? (
        <h2 className="text-xl font-bold text-gray-800">{label}</h2>
      ) : (
        <span className="text-gray-700 text-sm font-medium">{label}</span>
      )}
    </div>
  )
}
