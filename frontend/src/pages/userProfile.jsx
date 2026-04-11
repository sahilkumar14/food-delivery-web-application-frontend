import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const UserProfile = () => {
  const user = {
    name: 'Alex Sterling',
    email: 'alex.sterling@premium.com',
    phone: '+1 (555) 234-8890',
    dob: 'May 14, 1992',
    membership: 'Gold Member',
    status: 'Verified Account',
    totalOrders: 134,
    addresses: [
      {
        label: 'Home',
        line1: '4522 Oakwood Heights Dr.',
        line2: 'Apartment 48',
        city: 'Austin, TX 78701',
        primary: true
      },
      {
        label: 'Office',
        line1: '800 Congress Ave.',
        line2: 'Suite 1200',
        city: 'Austin, TX 78701',
        primary: false
      },
      {
        label: "Parent's House",
        line1: '1290 Whisper Lane',
        line2: '',
        city: 'Round Rock, TX 78664',
        primary: false
      }
    ],
    benefits: [
      {
        title: 'Free Delivery',
        desc: 'Unlimited on all orders above $25',
        color: 'bg-amber-100',
        text: 'text-amber-700'
      },
      {
        title: 'Exclusive Access',
        desc: 'Priority booking for Michelin events',
        color: 'bg-sky-100',
        text: 'text-sky-700'
      },
      {
        title: '10% Cashback',
        desc: 'Earn points on every premium order',
        color: 'bg-emerald-100',
        text: 'text-emerald-700'
      },
      {
        title: 'Concierge',
        desc: '24/7 priority support line',
        color: 'bg-violet-100',
        text: 'text-violet-700'
      }
    ]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-gray-100 px-4 py-8 md:px-10 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto w-full max-w-6xl space-y-8"
      >
        <div className="flex flex-col gap-4 rounded-3xl bg-white/90 p-6 md:p-8 shadow-[0_25px_60px_-40px_rgba(251,146,60,0.45)]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-orange-500 font-semibold">Profile</p>
              <h1 className="text-3xl font-semibold text-slate-900">Account details</h1>
              <p className="mt-2 text-sm text-slate-500 max-w-xl">
                Manage your personal information, saved addresses, and subscription benefits in one place.
              </p>
            </div>
            <div className="inline-flex items-center gap-3 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-orange-700 shadow-sm">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              {user.status}
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.3fr_1fr]">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-[0_0_15px_rgba(255,102,0,0.6)] hover:border-orange-500">
              <div className="flex items-center gap-5">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-orange-500 text-3xl font-bold text-white shadow-md">
                  {user.name
                    .split(' ')
                    .map((name) => name[0])
                    .join('')}
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">{user.name}</h2>
                  <p className="text-sm text-slate-500">{user.email}</p>
                  <p className="mt-2 inline-flex rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-700">
                    {user.membership}
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-orange-50 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Phone</p>
                  <p className="mt-2 text-base font-medium text-slate-900">{user.phone}</p>
                </div>
                <div className="rounded-3xl bg-orange-50 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Date of birth</p>
                  <p className="mt-2 text-base font-medium text-slate-900">{user.dob}</p>
                </div>
                <div className="rounded-3xl bg-orange-50 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Orders</p>
                  <p className="mt-2 text-base font-medium text-slate-900">{user.totalOrders}</p>
                </div>
                <div className="rounded-3xl bg-orange-50 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Account</p>
                  <p className="mt-2 text-base font-medium text-slate-900">Premium member</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-[0_0_15px_rgba(255,102,0,0.6)] hover:border-orange-500">
              <div className="flex items-center justify-between ">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Profile summary</h3>
                  <p className="mt-1 text-sm text-slate-500">Your account is fully verified and benefits are active.</p>
                </div>
                <Link
                  to="/profile"
                  className="rounded-2xl border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
                >
                  Edit
                </Link>
              </div>

              <div className="mt-6 space-y-4 text-slate-600">
                <div>
                  <p className="text-sm text-slate-500">Email</p>
                  <p className="mt-1 font-medium text-slate-900">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Phone</p>
                  <p className="mt-1 font-medium text-slate-900">{user.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Membership</p>
                  <p className="mt-1 font-medium text-slate-900">{user.membership}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
          <div className="space-y-6 rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Saved Addresses</h2>
                <p className="mt-1 text-sm text-slate-500">Keep your favorite delivery locations ready.</p>
              </div>
              <button className="rounded-2xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 transition">
                + Add New
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {user.addresses.map((address) => (
                <div
                  key={address.label}
                  className={`rounded-3xl border p-5 shadow-sm ${address.primary ? 'border-orange-200 bg-orange-50' : 'border-slate-200 bg-white'}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{address.label}</p>
                      {address.primary && (
                        <span className="mt-2 inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                          Primary
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-slate-600">{address.line1}</p>
                  {address.line2 && <p className="text-sm text-slate-600">{address.line2}</p>}
                  <p className="mt-2 text-sm font-medium text-slate-900">{address.city}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Subscription Benefits</h2>
            <p className="mt-1 text-sm text-slate-500">Enjoy premium perks available to your membership tier.</p>

            <div className="mt-6 grid gap-4">
              {user.benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className={`rounded-3xl p-5 ${benefit.color} ${benefit.text}`}
                >
                  <p className="text-sm font-semibold">{benefit.title}</p>
                  <p className="mt-2 text-sm text-slate-700">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default UserProfile