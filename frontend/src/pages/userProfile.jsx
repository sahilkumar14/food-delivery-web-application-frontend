import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { authService } from '../services/api'

const UserProfile = () => {
  const [user, setUser] = useState(null)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    dob: '',
    address: ''
  })

  const formatFormDob = (dob) => {
    if (!dob) return ''
    const date = new Date(dob)
    return Number.isNaN(date.getTime()) ? dob : date.toISOString().split('T')[0]
  }

  useEffect(() => {
    const currentUser = authService.getCurrentUser()
    setUser(currentUser)
  }, [])

  useEffect(() => {
    if (!user) return
    setFormData({
      name: user.name || '',
      phone: user.mob || user.phone || '',
      dob: formatFormDob(user.dob),
      address: user.address || ''
    })
  }, [user])

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCancelEdit = () => {
    setEditing(false)
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.mob || user.phone || '',
        dob: formatFormDob(user.dob),
        address: user.address || ''
      })
    }
  }

  const handleSaveProfile = async () => {
    if (!user?.id) return
    setSaving(true)
    setSaveError('')

    const payload = {
      name: formData.name,
      mob: formData.phone,
      dob: formData.dob || null,
      address: formData.address
    }

    const result = await authService.updateUser(user.id, payload)

    if (!result.success) {
      setSaveError(result.error || 'Failed to update profile')
      setSaving(false)
      return
    }

    const updatedUser = {
      ...user,
      ...result.data,
      role: user.role
    }

    authService.saveUser(updatedUser)
    setUser(updatedUser)
    setEditing(false)
    setSaving(false)
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-orange-50 px-4 py-8 md:px-10 md:py-12">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white p-10 shadow-lg text-center">
          <h1 className="text-2xl font-semibold text-slate-900">Profile not available</h1>
          <p className="mt-4 text-sm text-slate-500">
            Please log in to view your account details.
          </p>
        </div>
      </div>
    )
  }

  const addresses = user.address
    ? [
        {
          label: 'Primary',
          line1: user.address,
          line2: '',
          city: '',
          primary: true
        }
      ]
    : []

  const phone = user.mob || user.phone || 'Not available'
  const email = user.email || 'Not provided'
  const name = user.name || 'User'

  const membership = user.role === 'agent'
    ? 'Delivery Agent'
    : user.role === 'restaurant'
    ? 'Restaurant'
    : 'Customer'

  const status = user.address ? 'Verified Account' : 'Incomplete Profile'
  const totalOrders = user.totalOrders || 0
  const benefits = user.benefits || []

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
              {status}
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.3fr_1fr]">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-[0_0_15px_rgba(255,102,0,0.6)] hover:border-orange-500">
              <div className="flex items-center gap-5">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-orange-500 text-3xl font-bold text-white shadow-md">
                  {(user.name || 'User')
                    .split(' ')
                    .map((part) => part[0] || '')
                    .join('')}
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">{name}</h2>
                  <p className="text-sm text-slate-500">{email}</p>
                  <p className="mt-2 inline-flex rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-700">
                    {membership}
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-orange-50 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Phone</p>
                  <p className="mt-2 text-base font-medium text-slate-900">{phone}</p>
                </div>
                <div className="rounded-3xl bg-orange-50 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Date of birth</p>
                  <p className="mt-2 text-base font-medium text-slate-900">{formatFormDob(user.dob) || 'Not provided'}</p>
                </div>
                <div className="rounded-3xl bg-orange-50 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Orders</p>
                  <p className="mt-2 text-base font-medium text-slate-900">{totalOrders}</p>
                </div>
                <div className="rounded-3xl bg-orange-50 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Account</p>
                  <p className="mt-2 text-base font-medium text-slate-900">{membership}</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-[0_0_15px_rgba(255,102,0,0.6)] hover:border-orange-500">
              <div className="flex items-center justify-between ">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Profile summary</h3>
                  <p className="mt-1 text-sm text-slate-500">Your account is fully verified and benefits are active.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setEditing(true)}
                  className="rounded-2xl border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
                >
                  Edit Profile
                </button>
              </div>

              {editing ? (
                <div className="mt-6 space-y-4 text-slate-600">
                  {saveError && (
                    <div className="rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                      {saveError}
                    </div>
                  )}
                  <div className="grid gap-4">
                    <label className="block">
                      <span className="text-sm font-medium text-slate-700">Full Name</span>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        className="mt-2 w-full rounded-3xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm font-medium text-slate-700">Phone</span>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleFormChange}
                        className="mt-2 w-full rounded-3xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm font-medium text-slate-700">Date of Birth</span>
                      <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleFormChange}
                        className="mt-2 w-full rounded-3xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm font-medium text-slate-700">Address</span>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleFormChange}
                        rows={3}
                        className="mt-2 w-full rounded-3xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                      />
                    </label>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={handleSaveProfile}
                      disabled={saving}
                      className="rounded-3xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-orange-300"
                    >
                      {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      disabled={saving}
                      className="rounded-3xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-6 space-y-4 text-slate-600">
                  <div>
                    <p className="text-sm text-slate-500">Email</p>
                    <p className="mt-1 font-medium text-slate-900">{email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Phone</p>
                    <p className="mt-1 font-medium text-slate-900">{phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Membership</p>
                    <p className="mt-1 font-medium text-slate-900">{membership}</p>
                  </div>
                </div>
              )}
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
              {addresses.length === 0 ? (
                <div className="rounded-3xl border border-slate-200 bg-white p-5 text-slate-600">
                  No saved address found. Update your profile to save an address.
                </div>
              ) : (
                addresses.map((address) => (
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
                ))
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Subscription Benefits</h2>
            <p className="mt-1 text-sm text-slate-500">Enjoy premium perks available to your membership tier.</p>

            <div className="mt-6 grid gap-4">
              {benefits.length > 0 ? (
                benefits.map((benefit) => (
                  <div
                    key={benefit.title}
                    className={`rounded-3xl p-5 ${benefit.color || 'bg-slate-100'} ${benefit.text || 'text-slate-900'}`}
                  >
                    <p className="text-sm font-semibold">{benefit.title}</p>
                    <p className="mt-2 text-sm text-slate-700">{benefit.desc}</p>
                  </div>
                ))
              ) : (
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
                  No subscription benefits available for this account.
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default UserProfile