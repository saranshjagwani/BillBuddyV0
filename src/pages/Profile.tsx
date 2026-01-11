import {  Store,  LogOut,  Phone } from 'lucide-react'; // Assuming Lucide-react is used
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth } from "../firebase/auth";
import { db } from "../firebase/firestore";
import { useAuth } from "../auth/hook/useAuth";
import { useToast } from '../ui/toast/useToast';


export default function ProfilePage() {
  const { user } = useAuth();
  const { showToast } = useToast();
  

  const [shopName, setShopName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [phoneNumber,setPhoneNumber]=useState("");

  // 🔹 Load profile data
  useEffect(() => {
    if (!user) return;

    const loadProfile = async () => {
      const ref = doc(db, "user", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setShopName(snap.data().shopName || "");
        setPhoneNumber(snap.data().phoneNumber || "");
      }

      setLoading(false);
    };

    loadProfile();
  }, [user]);

  

  // 🔹 Save shop name
  const saveShopName = async () => {
    if (!user || !shopName.trim()) return;

    try {
      setSaving(true);
      await updateDoc(doc(db, "user", user.uid), {
        shopName: shopName.trim(),
      });
      showToast("success", "Shop Name Updated");
    } finally {
      setSaving(false);
    }
  };

  // 🔹 Logout
  const handleLogout = async () => {
    await signOut(auth);
  };

  if (loading) {
    return (
      <div className="p-6 text-sm text-gray-500">
        Loading profile…
      </div>
    );
  }

  

return (
  <div className="min-h-screen bg-gray-50/50 pb-10">
    {/* Dynamic Header */}
    <div className="bg-white px-6 pt-12 pb-6 border-b border-gray-100 shadow-sm">
      <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Account</h1>
      <p className="text-sm text-gray-500">Manage your shop and preferences</p>
    </div>

    <div className="p-4 space-y-6 max-w-md mx-auto">
      
      {/* Identity Section (Non-editable Info) */}
      <section className="space-y-2">
        <label className="px-1 text-xs font-bold text-gray-400 uppercase tracking-wider">Identity</label>
        <div className="bg-white rounded-2xl p-4 flex items-center shadow-sm border border-gray-100">
          <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center mr-4">
            <Phone size={18} className="text-blue-600" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-400">Verified Phone</p>
            <p className="font-semibold text-gray-800">{phoneNumber.slice(3)}</p>
          </div>
        </div>
      </section>

      {/* Shop Configuration */}
      <section className="space-y-2">
        <label className="px-1 text-xs font-bold text-gray-400 uppercase tracking-wider">Business Settings</label>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-4">
          <div className="flex items-center space-x-3 mb-2">
            <Store size={18} className="text-gray-400" />
            <span className="font-medium text-gray-700">Shop Identity</span>
          </div>
          
          <div className="relative group">
            <input
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              className="w-full bg-gray-50 border-0 focus:ring-2 focus:ring-blue-500 rounded-xl px-4 py-3 text-gray-900 transition-all placeholder:text-gray-400"
              placeholder="E.g. Central Grocery Store"
            />
          </div>

          <button
            onClick={saveShopName}
            disabled={saving || !shopName.trim()}
            className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-lg shadow-blue-200 active:scale-[0.98] transition-transform disabled:opacity-40"
          >
            {saving ? (
              <span className="flex items-center justify-center space-x-2">
                <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Updating...</span>
              </span>
            ) : "Save Changes"}
          </button>
        </div>
      </section>

      {/* Danger Zone */}
      <div className="pt-6">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center space-x-2 py-4 rounded-2xl text-red-500 font-bold bg-red-50 hover:bg-red-100 border border-red-100 transition-all active:scale-[0.98]"
        >
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
        <p className="text-center text-[10px] text-gray-400 mt-6 uppercase tracking-[0.2em]">BillBuddy Version 0.0.1</p>
      </div>
    </div>
  </div>
);
}
