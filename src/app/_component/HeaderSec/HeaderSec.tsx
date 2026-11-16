import React from "react";
import Link from "next/link";

export default function page() {
  return (
    <>
      <div className="bg-gradient-to-br from-primary-600 via-primary-500 to-primary-400 text-white">
        <div className="container mx-auto px-4 py-10 sm:py-12">
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
            <Link
              className="hover:text-white transition-colors duration-200"
              href="/"
            >
              Home
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-white font-medium">My Account</span>
          </nav>
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30">
              <svg
                data-prefix="fas"
                data-icon="user"
                className="svg-inline--fa fa-user text-3xl"
                role="img"
                viewBox="0 0 448 512"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                My Account
              </h1>
              <p className="text-white/80 mt-1">
                Manage your addresses and account settings
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
