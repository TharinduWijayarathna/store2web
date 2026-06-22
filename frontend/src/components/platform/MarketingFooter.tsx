import { Link } from "react-router-dom";

import { Logo } from "@/components/common/Logo";

function MarketingFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="container-page py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600">
              The complete platform for local businesses to launch, manage, and grow
              their online store — without the complexity.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Product</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li><a href="#features" className="hover:text-indigo-600">Features</a></li>
              <li><a href="#pricing" className="hover:text-indigo-600">Pricing</a></li>
              <li><Link to="/register" className="hover:text-indigo-600">Get started</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Account</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li><Link to="/login" className="hover:text-indigo-600">Sign in</Link></li>
              <li><Link to="/register" className="hover:text-indigo-600">Create account</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-500">
          © {new Date().getFullYear()} Store2Web. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export { MarketingFooter };
