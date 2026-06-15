import { Card } from '../Card'
import { MobileLayout } from '../MobileLayout'
import { PrimaryButton } from '../PrimaryButton'

interface AddressScreenProps {
  address: string
  onAddressChange: (address: string) => void
  onNext: () => void
}

export function AddressScreen({
  address,
  onAddressChange,
  onNext,
}: AddressScreenProps) {
  const isValid = address.trim().length >= 10

  return (
    <MobileLayout>
      <Card>
        <h1 className="mb-2 flex items-center justify-center gap-2 text-lg font-extrabold text-white uppercase">
          <span>📍</span>
          Onde eu te busco?
        </h1>
        <p className="mb-5 text-center text-sm text-white/75">
          Coloca seu endereço pra eu chegar aí 🚗
        </p>

        <div className="mb-6">
          <label className="mb-2 block text-xs font-semibold text-white/70">
            Seu endereço
          </label>
          <textarea
            value={address}
            onChange={(e) => onAddressChange(e.target.value)}
            placeholder="Rua, número, bairro, complemento..."
            rows={4}
            className="w-full resize-none rounded-3xl border-2 border-white/10 bg-[#2a1810] px-5 py-3.5 text-sm text-white placeholder:text-white/35 outline-none focus:border-[#f05a3a]"
          />
        </div>

        <PrimaryButton onClick={onNext} disabled={!isValid}>
          {isValid ? 'Confirmar endereço 💙' : 'Preenche o endereço'}
        </PrimaryButton>
      </Card>
    </MobileLayout>
  )
}
