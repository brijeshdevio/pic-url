export function Footer() {
  return (
    <footer className="w-full rounded-t-2xl border-t border-white/10 px-3 py-5 shadow">
      <div className="mx-auto w-full sm:w-[90%]">
        <div className="text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} <span className="logo">PicURL</span>.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
