"use client";

export function NewsletterForm() {
  return (
    <form
      className="flex gap-3 max-w-sm mx-auto"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="email"
        placeholder="you@company.com"
        className="form-input flex-1"
        aria-label="Email address"
      />
      <button type="submit" className="btn-primary whitespace-nowrap px-5 py-3">
        Subscribe
      </button>
    </form>
  );
}
