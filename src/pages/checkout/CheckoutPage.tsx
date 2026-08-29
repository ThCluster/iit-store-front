import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

type PaymentMethod = 'card' | 'mobile_money' | 'cash' | 'transfer'

const paymentMethods: { id: PaymentMethod; label: string; description: string }[] = [
  { id: 'card', label: 'Carte bancaire', description: 'Visa, Mastercard' },
  { id: 'mobile_money', label: 'Mobile Money', description: 'Orange Money, MTN, Wave' },
  { id: 'cash', label: 'Espèces', description: 'Paiement à la livraison' },
  { id: 'transfer', label: 'Virement', description: 'Virement bancaire' },
]

// Données de démonstration (à remplacer par l'API django-cities-light)
const demoCountries: { code: string; name: string; cities: string[] }[] = [
  {
    code: 'CI',
    name: 'Côte d\'Ivoire',
    cities: ['Abidjan', 'Bouaké', 'Daloa', 'Yamoussoukro', 'San-Pédro', 'Korhogo'],
  },
  {
    code: 'SN',
    name: 'Sénégal',
    cities: ['Dakar', 'Thiès', 'Saint-Louis', 'Touba', 'Kaolack'],
  },
  {
    code: 'ML',
    name: 'Mali',
    cities: ['Bamako', 'Sikasso', 'Mopti', 'Koutiala', 'Ségou'],
  },
  {
    code: 'BF',
    name: 'Burkina Faso',
    cities: ['Ouagadougou', 'Bobo-Dioulasso', 'Koudougou', 'Ouahigouya'],
  },
  {
    code: 'FR',
    name: 'France',
    cities: ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Bordeaux'],
  },
]

export default function CheckoutPage() {
  const [payment, setPayment] = useState<PaymentMethod>('mobile_money')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [country, setCountry] = useState('CI')
  const [city, setCity] = useState('')
  const [address, setAddress] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [cardName, setCardName] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv, setCardCvv] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [mobileOperator, setMobileOperator] = useState('orange')
  const [success, setSuccess] = useState(false)

  const selectedCountry = demoCountries.find((c) => c.code === country)
  const navigate = useNavigate()

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    // TODO: envoyer la commande à l'API
    setSuccess(true)
    setTimeout(() => navigate('/products'), 2500)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-black">Passer la commande</h1>

      <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-3">
        {/* Formulaires */}
        <div className="space-y-6 lg:col-span-2">
          {/* Adresse de livraison */}
          <section className="card bg-base-100 shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-lg">
                Adresse de livraison
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="form-control sm:col-span-2">
                  <label className="label" htmlFor="fullName">
                    <span className="label-text">Nom complet</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Votre nom complet"
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label" htmlFor="phone">
                    <span className="label-text">Téléphone</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+225 07 00 00 00 00"
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label" htmlFor="country">
                    <span className="label-text">Pays</span>
                  </label>
                  <select
                    id="country"
                    value={country}
                    onChange={(e) => {
                      setCountry(e.target.value)
                      setCity('')
                    }}
                    className="select select-bordered w-full"
                    required
                  >
                    {demoCountries.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-control">
                  <label className="label" htmlFor="city">
                    <span className="label-text">Ville</span>
                  </label>
                  <select
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="" disabled>
                      Sélectionnez une ville
                    </option>
                    {selectedCountry?.cities.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-control sm:col-span-2">
                  <label className="label" htmlFor="address">
                    <span className="label-text">Adresse</span>
                  </label>
                  <input
                    id="address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Quartier, rue, immeuble..."
                    className="input input-bordered w-full"
                    required
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Mode de règlement */}
          <section className="card bg-base-100 shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-lg">Mode de règlement</h2>
              <div className="mt-4 space-y-3">
                {paymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition ${
                      payment === method.id
                        ? 'border-primary bg-primary/5'
                        : 'border-base-300 hover:border-base-content/30'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={payment === method.id}
                      onChange={() => setPayment(method.id)}
                      className="radio radio-primary"
                    />
                    <div>
                      <p className="font-semibold">{method.label}</p>
                      <p className="text-sm text-base-content/60">{method.description}</p>
                    </div>
                  </label>
                ))}
              </div>

              {/* Champs de paiement dynamiques */}
              {payment === 'card' && (
                <div className="mt-4 rounded-xl border border-base-300 bg-base-100 p-4">
                  <h3 className="mb-3 text-sm font-semibold">Informations de la carte</h3>
                  <div className="space-y-3">
                    <div className="form-control">
                      <label className="label" htmlFor="cardName">
                        <span className="label-text">Nom sur la carte</span>
                      </label>
                      <input
                        id="cardName"
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="Nom du titulaire"
                        className="input input-bordered w-full"
                        required
                      />
                    </div>
                    <div className="form-control">
                      <label className="label" htmlFor="cardNumber">
                        <span className="label-text">Numéro de carte</span>
                      </label>
                      <input
                        id="cardNumber"
                        type="text"
                        inputMode="numeric"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="1234 5678 9012 3456"
                        className="input input-bordered w-full"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="form-control">
                        <label className="label" htmlFor="cardExpiry">
                          <span className="label-text">Expiration</span>
                        </label>
                        <input
                          id="cardExpiry"
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/AA"
                          className="input input-bordered w-full"
                          required
                        />
                      </div>
                      <div className="form-control">
                        <label className="label" htmlFor="cardCvv">
                          <span className="label-text">CVV</span>
                        </label>
                        <input
                          id="cardCvv"
                          type="text"
                          inputMode="numeric"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="123"
                          className="input input-bordered w-full"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {payment === 'mobile_money' && (
                <div className="mt-4 rounded-xl border border-base-300 bg-base-100 p-4">
                  <h3 className="mb-3 text-sm font-semibold">Informations Mobile Money</h3>
                  <div className="space-y-3">
                    <div className="form-control">
                      <label className="label" htmlFor="mobileOperator">
                        <span className="label-text">Opérateur</span>
                      </label>
                      <select
                        id="mobileOperator"
                        value={mobileOperator}
                        onChange={(e) => setMobileOperator(e.target.value)}
                        className="select select-bordered w-full"
                        required
                      >
                        <option value="orange">Orange Money</option>
                        <option value="mtn">MTN Mobile Money</option>
                        <option value="wave">Wave</option>
                      </select>
                    </div>
                    <div className="form-control">
                      <label className="label" htmlFor="mobileNumber">
                        <span className="label-text">Numéro de téléphone</span>
                      </label>
                      <input
                        id="mobileNumber"
                        type="tel"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        placeholder="+225 07 00 00 00 00"
                        className="input input-bordered w-full"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Récapitulatif */}
        <div className="lg:col-span-1">
          <div className="card bg-base-100 shadow-sm lg:sticky lg:top-24">
            <div className="card-body">
              <h2 className="card-title text-lg">Récapitulatif</h2>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-3">
                  <img
                    src="https://picsum.photos/seed/phone/60"
                    alt="Smartphone X200"
                    className="h-14 w-14 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold">Smartphone X200</p>
                    <p className="text-xs text-base-content/60">x1</p>
                  </div>
                  <span className="text-sm font-bold">299 990 FCFA</span>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    src="https://picsum.photos/seed/headset/60"
                    alt="Casque Bluetooth"
                    className="h-14 w-14 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold">Casque Bluetooth</p>
                    <p className="text-xs text-base-content/60">x2</p>
                  </div>
                  <span className="text-sm font-bold">99 980 FCFA</span>
                </div>
              </div>

              <div className="divider" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-base-content/60">Sous-total</span>
                  <span className="font-semibold">399 970 FCFA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base-content/60">Livraison</span>
                  <span className="font-semibold">5 990 FCFA</span>
                </div>
              </div>
              <div className="divider" />
              <div className="flex items-center justify-between">
                <span className="font-bold">Total</span>
                <span className="text-xl font-black text-primary">405 960 FCFA</span>
              </div>

              <button type="submit" className="btn btn-primary btn-block mt-6">
                Confirmer la commande
              </button>
              <Link to="/cart" className="btn btn-ghost btn-block mt-2">
                Retour au panier
              </Link>
            </div>
          </div>
        </div>
      </form>

      {/* Message de succès */}
      {success && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="card w-full max-w-sm bg-white shadow-2xl">
            <div className="card-body items-center p-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="mt-4 text-xl font-bold">Commande passée avec succès !</h2>
              <p className="mt-2 text-sm text-base-content/60">
                Merci pour votre achat. Redirection vers les produits...
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}