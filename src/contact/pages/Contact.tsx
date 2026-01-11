import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";
import { useState } from "react";
import { submitFeedback } from "../services/feedback.services";
import { useAuth } from "../../auth/hook/useAuth";
import { getUserProfile } from "../../auth/services/user.services";
import { useToast } from "../../ui/toast/useToast";

export default function ContactPage() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!message.trim()) {
      showToast("error", "Please write a message");
      return;
    }

    try {
      setLoading(true);

      const profile = await getUserProfile(user!.uid);

      await submitFeedback({
        userId: user!.uid,
        phoneNumber: profile?.phoneNumber || "",
        shopName: profile?.shopName || "",
        message,
      });

      showToast("success", "Thanks! Your message was sent.");
      setMessage("");
    } catch {
      showToast("error", "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen py-12 px-4 sm:px-6"
      style={{ backgroundColor: "var(--bb-bg-soft)" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div
              className="h-20 w-20 flex items-center justify-center shadow-lg"
              style={{
                borderRadius: "20px",
                backgroundColor: "var(--bb-secondary)",
              }}
            >
              <img
                src="/src/assets/logo/BillBuddyLogo2.png"
                alt="BillBuddy Logo"
                className="h-16 w-16 object-contain"
              />
            </div>
          </div>
          
          <h1
            className="text-3xl sm:text-4xl font-bold mb-3"
            style={{ color: "var(--bb-text)" }}
          >
            Get in Touch
          </h1>
          <p
            className="text-base sm:text-lg max-w-2xl mx-auto"
            style={{ color: "var(--bb-text-muted)" }}
          >
            Have questions about BillBuddy? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: "#dbeafe" }}
              >
                <MessageCircle
                  className="w-6 h-6"
                  style={{ color: "var(--bb-primary)" }}
                />
              </div>
              <div>
                <h2
                  className="text-2xl font-bold"
                  style={{ color: "var(--bb-text)" }}
                >
                  Send a Message
                </h2>
                <p className="text-xs mt-1" style={{ color: "var(--bb-text-muted)" }}>
                  Your shop details will be shared automatically
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label
                  className="block text-sm font-semibold mb-2"
                  style={{ color: "var(--bb-text)" }}
                >
                  Your Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us how we can help..."
                  disabled={loading}
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-50 rounded-2xl outline-none
                           focus:bg-white focus:ring-2 focus:ring-blue-500/20
                           disabled:opacity-50 transition-all resize-none"
                  style={{ color: "var(--bb-text)" }}
                />
                {message.length > 0 && (
                  <div className="mt-2 text-right">
                    <span className="text-xs" style={{ color: "var(--bb-text-muted)" }}>
                      {message.length} characters
                    </span>
                  </div>
                )}
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading || !message.trim()}
                className="w-full py-3.5 rounded-2xl font-semibold text-white
                         transition-all flex items-center justify-center gap-2
                         shadow-lg disabled:opacity-50"
                style={{
                  backgroundColor: loading || !message.trim()
                    ? "#93c5fd"
                    : "var(--bb-primary)",
                }}
                onMouseEnter={(e) => {
                  if (!loading && message.trim())
                    e.currentTarget.style.backgroundColor =
                      "var(--bb-primary-hover)";
                }}
                onMouseLeave={(e) => {
                  if (!loading && message.trim())
                    e.currentTarget.style.backgroundColor =
                      "var(--bb-primary)";
                }}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Cards */}
            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <h3
                className="text-xl font-bold mb-4"
                style={{ color: "var(--bb-text)" }}
              >
                Contact Information
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "#fef3c7" }}
                  >
                    <Mail className="w-6 h-6" style={{ color: "#f59e0b" }} />
                  </div>
                  <div>
                    <p
                      className="font-semibold mb-1"
                      style={{ color: "var(--bb-text)" }}
                    >
                      Email
                    </p>
                    <p
                      className="text-sm"
                      style={{ color: "var(--bb-text-muted)" }}
                    >
                      billbuddyai.app@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "#dcfce7" }}
                  >
                    <Phone className="w-6 h-6" style={{ color: "#16a34a" }} />
                  </div>
                  <div>
                    <p
                      className="font-semibold mb-1"
                      style={{ color: "var(--bb-text)" }}
                    >
                      Phone
                    </p>
                    <p
                      className="text-sm"
                      style={{ color: "var(--bb-text-muted)" }}
                    >
                      +91 80853 98090
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "#dbeafe" }}
                  >
                    <MapPin
                      className="w-6 h-6"
                      style={{ color: "var(--bb-primary)" }}
                    />
                  </div>
                  <div>
                    <p
                      className="font-semibold mb-1"
                      style={{ color: "var(--bb-text)" }}
                    >
                      Location
                    </p>
                    <p
                      className="text-sm"
                      style={{ color: "var(--bb-text-muted)" }}
                    >
                      Indore, Madhya Pradesh, India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Hours */}
            <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-3xl p-6 shadow-lg">
              <h3
                className="text-xl font-bold mb-4"
                style={{ color: "var(--bb-text)" }}
              >
                Support Hours
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span style={{ color: "var(--bb-text-muted)" }}>
                    Monday - Friday
                  </span>
                  <span
                    className="font-semibold"
                    style={{ color: "var(--bb-text)" }}
                  >
                    9:00 AM - 6:00 PM
                  </span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "var(--bb-text-muted)" }}>
                    Saturday
                  </span>
                  <span
                    className="font-semibold"
                    style={{ color: "var(--bb-text)" }}
                  >
                    10:00 AM - 4:00 PM
                  </span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "var(--bb-text-muted)" }}>Sunday</span>
                  <span
                    className="font-semibold"
                    style={{ color: "var(--bb-text)" }}
                  >
                    Closed
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Note */}
            <div className="bg-yellow-50 rounded-3xl p-6 shadow-lg">
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--bb-text-muted)" }}
              >
                💡 <strong>Pro Tip:</strong> For faster support, include your
                shop name and a detailed description of your issue in the
                message.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}