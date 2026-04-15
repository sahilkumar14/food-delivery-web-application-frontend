import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/api'
import toast from 'react-hot-toast'
import { getCurrentCoordinates } from '../utils/location'

const roleLabels = {
  customer: 'Customer',
  restaurant: 'Restaurant',
  agent: 'Delivery Agent',
}

const Signup = ({ onAuth }) => {
  const navigate = useNavigate()
  const [role, setRole] = useState('customer')
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    mobile: '',
    dob: '',
    address: '',
    location: '',
    locationCoordinates: null,
    gstNumber: '',
    vehicleNo: '',
    termsAccepted: false,
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [locationLoading, setLocationLoading] = useState(false)

  const nameLabel = role === 'restaurant' ? 'Restaurant Name' : 'Full Name'
  const namePlaceholder = role === 'restaurant' ? 'Enter restaurant name' : 'Your full name'

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    setError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    const requiredFields = ['fullName', 'email', 'password']

    if (role === 'customer') {
      requiredFields.push('mobile', 'dob', 'address')
    } else if (role === 'restaurant') {
      requiredFields.push('location','gstNumber')
    } else if (role === 'agent') {
      requiredFields.push('mobile', 'vehicleNo')
    }

    if (!formData.termsAccepted) {
      setError('Please accept the Terms of Service and Privacy Policy.')
      setLoading(false)
      return
    }

    const missingFields = requiredFields.filter((field) => !formData[field])
    if (missingFields.length > 0) {
      setError(`Please fill in all required fields: ${missingFields.join(', ')}`)
      setLoading(false)
      return
    }

    if (role === 'restaurant' && !formData.locationCoordinates) {
      setError('Please capture restaurant current location before signup.')
      setLoading(false)
      return
    }

    const result = await authService.signup(formData, role)

    if (result.success) {
      authService.saveUser(result.user)
      toast.success('Signed up successfully!')
      onAuth && onAuth(result.data?.token)
      
      // Navigate based on role
      if (result.user.role === 'restaurant') {
        navigate('/orders')
      } else if (result.user.role === 'agent') {
        navigate('/delivery-agent-home')
      } else {
        navigate('/home')
      }
    } else {
      setError(result.error || 'Signup failed. Please try again.')
    }

    setLoading(false)
  }

  const handleUseCurrentLocation = async () => {
    setLocationLoading(true)
    setError('')

    try {
      const coordinates = await getCurrentCoordinates()
      setFormData((prev) => ({
        ...prev,
        locationCoordinates: coordinates,
      }))
      toast.success('Restaurant location captured successfully')
    } catch (error) {
      setError(error.message)
    } finally {
      setLocationLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-orange-50 py-16">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-white shadow-[0_32px_90px_rgba(251,146,60,0.12)] border border-orange-100">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at top left, rgba(255,137,45,0.2), transparent 30%), radial-gradient(circle at bottom right, rgba(254,205,170,0.4), transparent 35%)',
            }}
          />
          <div className="relative flex flex-col justify-between p-10 sm:p-14" style={{ minHeight: '34rem' }}>
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 rounded-full border border-orange-200 bg-orange-100/80 px-4 py-2 text-sm text-orange-800 shadow-sm">
                <span className="text-lg">✨</span>
                <span>Pick your role and get started</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-5xl font-extrabold tracking-tight text-orange-700">Join the movement.</h1>
                <p className="max-w-xl text-lg leading-8 text-slate-600">
                  Experience a food delivery platform designed for beautiful product discovery, fast ordering, and reliable local service.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.75rem] bg-orange-500/10 p-6 shadow-sm ring-1 ring-orange-100">
                  <h2 className="text-xl font-semibold text-orange-700">Curated tastes</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Offer customers the freshest local options and sharpen their appetite with premium service.
                  </p>
                </div>
                <div className="rounded-[1.75rem] bg-orange-100/80 p-6 shadow-sm ring-1 ring-orange-100">
                  <h2 className="text-xl font-semibold text-orange-700">Quick onboarding</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Create an account in seconds and manage orders, menus, or deliveries from a single dashboard.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative rounded-4xl bg-orange-900 px-6 py-7 text-white shadow-2xl mt-5">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at top left, rgba(255,255,255,0.18), transparent 25%), radial-gradient(circle at bottom right, rgba(255,255,255,0.1), transparent 30%)',
                }}
              />
              <div className="relative flex flex-col gap-4">
                <p className="text-sm uppercase tracking-[0.22em] text-orange-200">“Every meal is a curated story waiting to be delivered.”</p>
                <div className="flex items-center gap-3 pt-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-200/20 text-orange-50">🧑‍🍳</div>
                  <div>
                    <p className="text-base font-semibold">Editorial Team</p>
                    <p className="text-sm text-orange-200">Creative cuisine editors</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[2.5rem] bg-white p-8 shadow-[0_30px_60px_rgba(15,23,42,0.08)] ring-1 ring-orange-100 sm:p-12">
          <div className="flex flex-col gap-2">
            <span className="text-sm uppercase tracking-[0.24em] text-orange-500">Join the Curator</span>
            <h1 className="text-4xl font-bold text-slate-900">Select your role to get started.</h1>
            <p className="max-w-2xl text-sm leading-6 text-slate-500">
              Create your account with the details we need to set up your profile and start using the platform.
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {['customer', 'restaurant', 'agent'].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setRole(item)}
                className={`rounded-3xl border px-4 py-3 text-sm font-semibold transition focus:outline-none ${
                  role === item
                    ? 'border-orange-500 bg-orange-500 text-white shadow-lg'
                    : 'border-orange-200 bg-white text-orange-600 hover:border-orange-300 hover:bg-orange-50'
                }`}
              >
                {roleLabels[item]}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mt-10 space-y-5">
            {error && (
              <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold text-slate-700">{nameLabel}</span>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="mt-2 w-full rounded-3xl border border-orange-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100 disabled:bg-slate-100"
                  placeholder={namePlaceholder}
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-slate-700">Email Address</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="mt-2 w-full rounded-3xl border border-orange-200  px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100 disabled:bg-slate-100"
                  placeholder="julianne@example.com"
                />
              </label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold text-slate-700">Password</span>
                <div className="relative mt-2">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full rounded-3xl border border-orange-200 px-4 py-3 pr-12 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100 disabled:bg-slate-100"
                    placeholder="********"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-3 flex items-center text-sm font-medium text-orange-600 hover:text-orange-700"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-slate-700">Phone Number</span>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required={role !== 'restaurant'}
                  disabled={loading}
                  className="mt-2 w-full rounded-3xl border border-orange-200  px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100 disabled:bg-slate-100"
                  placeholder="+91 xxx-xxx-xxxx"
                />
              </label>
            </div>

            {role === 'customer' && (
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">Date of Birth</span>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="mt-2 w-full rounded-3xl border border-orange-200  px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100 disabled:bg-slate-100"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">Address</span>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    rows="3"
                    className="mt-2 w-full rounded-3xl border border-orange-200  px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100 disabled:bg-slate-100 placeholder:text-slate-400"
                    placeholder="Your full address"
                  />
                </label>
              </div>
            )}

            {role === 'restaurant' && (
              <div className="space-y-3">
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">Location</span>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="mt-2 w-full rounded-3xl border border-orange-200  px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100 disabled:bg-slate-100"
                    placeholder="Restaurant location"
                  />
                </label>

                <div className="rounded-3xl border border-orange-200 bg-orange-50 px-4 py-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-700">Restaurant Coordinates</p>
                      <p className="mt-1 text-xs text-slate-500">
                        Capture current location so delivery route works correctly.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleUseCurrentLocation}
                      disabled={loading || locationLoading}
                      className="rounded-3xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
                    >
                      {locationLoading ? 'Capturing...' : 'Use Current Location'}
                    </button>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">
                    {formData.locationCoordinates
                      ? `Lat ${formData.locationCoordinates.lat}, Lng ${formData.locationCoordinates.lng}`
                      : 'Current coordinates not captured yet.'}
                  </p>
                </div>
              </div>
            )}

            {role === 'restaurant' && (
              <label className='block'>
                <span className='text-sm font-semibold text-slate-700'>GST Number</span>
                <input
                  type = "text"
                  inputMode='numeric'
                  pattern='[0-9]*'
                  name = "gstNumber"
                  value = {formData.gstNumber}
                  onChange={handleChange}
                  required
                  disabled = {loading}
                  className="mt-2 w-full rounded-3xl border border-orange-200  px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100 disabled:bg-slate-100"
                  placeholder="GST NUMBER"
                  />
              </label>
            )}

            {role === 'agent' && (
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">Vehicle Number</span>
                  <input
                    type="text"
                    name="vehicleNo"
                    value={formData.vehicleNo}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="mt-2 w-full rounded-3xl border border-orange-200  px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100 disabled:bg-slate-100"
                    placeholder="Vehicle registration number"
                  />
                </label>
              </div>
            )}

            <label className="flex items-start gap-3 rounded-3xl border border-orange-200 bg-orange-50 px-4 py-4">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                disabled={loading}
                className="mt-1 h-5 w-5 rounded-md border-orange-300 text-orange-600 focus:ring-orange-500"
              />
              <span className="text-sm leading-6 text-slate-600">
                I agree to the <span className="font-semibold text-orange-600">Terms of Service</span> and <span className="font-semibold text-orange-600">Privacy Policy</span>.
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-3xl bg-orange-500 px-5 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-orange-600 disabled:bg-orange-300 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>

            <div className="text-center text-sm text-slate-500">
              Already a member?{' '}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="font-semibold text-orange-600 hover:text-orange-700"
              >
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup
