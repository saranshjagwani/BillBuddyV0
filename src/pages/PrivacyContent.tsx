export function PrivacyContent() {
  return (
    <div className="space-y-4 text-sm leading-relaxed">
      <p>
        BillBuddy respects your privacy. This app is built for small shopkeepers
        and collects only the information required to function properly.
      </p>

      <p>
        <strong>Information we collect:</strong>
      </p>
      <ul className="list-disc pl-5">
        <li>Phone number (for login and identification)</li>
        <li>Shop name and stock data entered by you</li>
      </ul>

      <p>
        <strong>How we use your data:</strong>
      </p>
      <ul className="list-disc pl-5">
        <li>To authenticate your account</li>
        <li>To generate stock lists and PDFs</li>
        <li>To improve app reliability</li>
      </ul>

      <p>
        We do <strong>not</strong> sell your data, share it with advertisers, or
        use it for marketing.
      </p>

      <p>
        Your data is stored securely using Firebase services provided by Google.
      </p>

      <p>
        If you have any questions about privacy, please contact BillBuddy
        support.
      </p>
    </div>
  );
}
