// import { useState } from "react";
// import { useUserStore } from "../../../../store/useUserStore";
// import type { USER_TYPE } from "../../../../store/types/UserTypes";

// export const EditUserTypeModal = ({ onClose }: { onClose: () => void }) => {
//   const { selectedUser, updateUser } = useUserStore();
//   const [newType, setNewType] = useState<USER_TYPE>(
//     selectedUser?.type as USER_TYPE
//   );
//   const [loading, setLoading] = useState(false);

//   if (!selectedUser) return null;

//   const handleSave = async () => {
//     if (newType === selectedUser?.type) {
//       onClose();
//       return; // no API call if nothing changed
//     }
//     try {
//       setLoading(true);
//       await updateUser(selectedUser.id, newType);
//       onClose();
//     } catch (err) {
//       console.error("Failed to update user type", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//         <h2 className="text-lg  text-black font-semibold mb-4">Edit User Type</h2>

//         <label className="block mb-2 text-sm font-medium">User Type</label>
//         <select
//           value={newType}
//           onChange={(e) => setNewType(e.target.value as USER_TYPE)}
//           className="w-full border rounded text-black px-3 py-2 mb-4"
//         >
//           <option value="Admin">Admin</option>
//           <option value="Player">Player</option>
//           {/* Add more enum options here */}
//         </select>

//         <div className="flex justify-end gap-2">
//           <button onClick={onClose} className="px-4 py-2 text-black rounded border">
//             Cancel
//           </button>
//           <button
//             onClick={handleSave}
//             disabled={loading}
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
//           >
//             {loading ? "Saving..." : "Save"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
