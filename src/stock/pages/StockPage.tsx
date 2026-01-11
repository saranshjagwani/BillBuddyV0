import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import TopBar from "../components/TopBar";
import FloatingActionButton from "../components/FloatingActionButton";
import StockStatusToggle from "../components/StockStatusToggle";
import StockList from "../components/StockList";
import ItemModal from "../modal/ItemModal";
import PdfGeneratedModal from "../modal/PDFGeneratedModal";
import ConfirmDeleteModal from "../modal/ConfirmDeleteModal";

import { useStockItems } from "../hooks/useStockItems";
import { useStockFilters } from "../hooks/useStockFilters";

import type { StockItem } from "../types/stock.types";

import { generateStockPdf } from "../services/pdf.services";
import { getUserProfile } from "../../auth/services/user.services";
import type { AppUserProfile } from "../../auth/types/user.types";
import { useAuth } from "../../auth/hook/useAuth";
import { downloadPdf, sharePdf } from "../services/pdf.action";
import { useToast } from "../../ui/toast/useToast";

/**
 * StockPage (V0)
 *
 * Responsibility:
 * - Acts as the orchestration layer for Stock feature
 * - Owns UI state (modal, editing item)
 * - Wires hooks, components, and navigation together
 *
 * Non-responsibility:
 * - Does NOT talk to Firestore directly
 * - Does NOT contain business logic
 */
const StockPage = () => {
  /**
   * 1️⃣ Fetch stock data + actions from hook
   *
   * useStockItems:
   * - Knows about auth
   * - Knows about services
   * - Exposes simple actions for UI
   */
  const { items, loading, error, addItem, deleteItem, editItem, editStatus } =
    useStockItems();

  /**
   * 2️⃣ Apply UI-level filters
   *
   * useStockFilters:
   * - Pure logic
   * - No side effects
   */
  const {
    filteredItems,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
  } = useStockFilters(items);

  /**
   * 3️⃣ UI-only state
   *
   * editingItem:
   * - null  → add mode
   * - StockItem → edit mode
   */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<StockItem | null>(null);
  const { user } = useAuth();

  const navigate = useNavigate();
  const { showToast } = useToast();
  const [profile, setProfile] = useState<AppUserProfile | null>(null);
  const [stockPdf, setStockPdf] = useState<Blob | null>(null);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  useEffect(() => {
    if (!user?.uid) {
      setProfile(null);
      return;
    }

    const loadProfile = async () => {
      try {
        const data = await getUserProfile(user.uid);
        setProfile(data);
      } catch (error) {
        showToast("error", "Failed to load profile");
      } finally {
      }
    };

    loadProfile();
  }, [user?.uid]);


  const handleGenerateStockPdf = async () => {
    const result = await generateStockPdf(
      items,
      profile?.shopName,
      statusFilter
    );
    setStockPdf(result);
    setShowPdfModal(true);
  };

  const SWIPE_THRESHOLD = 60; // px
  const VERTICAL_LIMIT = 40;

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchStartX(touch.clientX);
    setTouchStartY(touch.clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null || touchStartY === null) return;

    const touch = e.changedTouches[0];
    const diffX = touch.clientX - touchStartX;
    const diffY = touch.clientY - touchStartY;

    // Ignore vertical scroll
    if (Math.abs(diffY) > VERTICAL_LIMIT) return;

    // Swipe right → In Stock
    if (diffX > SWIPE_THRESHOLD) {
      setStatusFilter("inStock");
    }

    // Swipe left → Out of Stock
    if (diffX < -SWIPE_THRESHOLD) {
      setStatusFilter("outOfStock");
    }

    setTouchStartX(null);
    setTouchStartY(null);
  };

  return (
    <>
      {/* Top navigation bar */}
      <TopBar
        onPdfClick={handleGenerateStockPdf}
        onProfileClick={() => navigate("/profile")}
        value={searchQuery}
        statusFilter={statusFilter}
        onChange={setSearchQuery}
      />

      {/* In-stock / Out-of-stock toggle */}
      <StockStatusToggle value={statusFilter} onChange={setStatusFilter} />

      {/* Floating add button */}
      <FloatingActionButton
        onClick={() => {
          setEditingItem(null); // ensure ADD mode
          setIsModalOpen(true);
        }}
      />

      {/* Main content */}
       <div
          className="flex-1 overflow-y-auto"
          style={{ WebkitOverflowScrolling: "touch" }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
      <div className="flex-1 overflow-y-auto">
        {loading && (
          <div className="p-4 text-sm text-gray-500">Loading stock…</div>
        )}

        {error && <div className="p-4 text-sm text-red-600">{error}</div>}

       
          {!loading && !error && (
            <StockList
              items={filteredItems}
              onDelete={(id) => setDeleteId(id)}
              onEdit={(item) => {
                // Open modal in EDIT mode
                setEditingItem(item);
                setIsModalOpen(true);
              }}
              onEditStatus={editStatus}
            />
          )}
        </div>
      </div>

      <ItemModal
        isOpen={isModalOpen}
        mode={editingItem ? "edit" : "add"}
        initialName={editingItem?.itemName}
        initialStatus={editingItem?.status || statusFilter}
        onSubmit={(data) => {
          if (editingItem) {
            // EDIT flow
            editItem(editingItem.id, data.name, data.status);
          } else {
            // ADD flow
            addItem(data);
          }

          setIsModalOpen(false);
          setEditingItem(null);
        }}
        onClose={() => {
          setIsModalOpen(false);
          setEditingItem(null);
        }}
      />
      <PdfGeneratedModal
        isOpen={showPdfModal}
        pdf={stockPdf}
        onClose={() => setShowPdfModal(false)}
        onDownload={() => stockPdf && downloadPdf(stockPdf)}
        onShare={() => stockPdf && sharePdf(stockPdf)}
      />
      <ConfirmDeleteModal
        isOpen={!!deleteId}
        onCancel={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId) {
            deleteItem(deleteId);
            showToast("success", "Item deleted");
          }
          setDeleteId(null);
        }}
      />
    </>
  );
};

export default StockPage;
