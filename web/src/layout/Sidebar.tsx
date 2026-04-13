export function Sidebar() {
  return (
    <aside className="dark:border-border-dark dark:bg-background-dark fixed flex h-full w-64 flex-col border-r border-slate-200 bg-white">
      <div className="flex items-center gap-3 p-6">
        <div className="bg-primary flex h-8 w-8 items-center justify-center rounded text-white">
          <span className="material-symbols-outlined text-xl">image</span>
        </div>
        <h1 className="text-xl font-bold tracking-tight">PicURL</h1>
      </div>
      <nav className="mt-4 flex-1 space-y-1 px-3">
        <a
          className="active-nav text-primary flex items-center gap-3 rounded-lg px-3 py-2.5 font-medium"
          href="#"
        >
          <span className="material-symbols-outlined">dashboard</span>
          Dashboard
        </a>
        <a
          className="dark:hover:bg-card-dark flex items-center gap-3 rounded-lg px-3 py-2.5 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-400"
          href="#"
        >
          <span className="material-symbols-outlined">folder</span>
          Projects
        </a>
        <a
          className="dark:hover:bg-card-dark flex items-center gap-3 rounded-lg px-3 py-2.5 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-400"
          href="#"
        >
          <span className="material-symbols-outlined">key</span>
          API Keys
        </a>
        <a
          className="dark:hover:bg-card-dark flex items-center gap-3 rounded-lg px-3 py-2.5 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-400"
          href="#"
        >
          <span className="material-symbols-outlined">bar_chart</span>
          Usage
        </a>
        <a
          className="dark:hover:bg-card-dark flex items-center gap-3 rounded-lg px-3 py-2.5 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-400"
          href="#"
        >
          <span className="material-symbols-outlined">settings</span>
          Settings
        </a>
      </nav>
      <div className="dark:border-border-dark border-t border-slate-200 p-4">
        <div className="dark:hover:bg-card-dark flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-slate-100">
          <img
            alt="User Avatar"
            className="dark:border-border-dark h-8 w-8 rounded-full border border-slate-200"
            data-alt="User profile avatar of Alex"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCdHZJzD_9BC-Lbu14daj3LvvYX1mcECRur_LhD_tR7uEGnduKTFvy8D7jWGvHyud91oKTj18YCwmJwtoqxJhk9hMM27mAK5bajQOG6AH-ZuSVeecjgTQ6A5fOZG65OS6-7CrDQ_NfM512AGgQJyrXGfDbGSBPucaSxH20JSZ-pLLmg9u4a--d5F8r1CMNoFn3Uangrv_GC1Clrppr1-nt7clkS9Pyky42vcNWcoVMAqenNTsjPvBbtL2IG_12VRGyf25o62hPf1k"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">Alex Rivera</p>
            <p className="truncate text-xs text-slate-500">Pro Developer</p>
          </div>
          <span className="material-symbols-outlined text-lg text-slate-400">
            logout
          </span>
        </div>
      </div>
    </aside>
  );
}
