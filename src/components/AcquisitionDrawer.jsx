import { useState } from 'react';
import { X, Check, ShieldCheck, Gift, Truck, Sparkles } from 'lucide-react';

export default function AcquisitionDrawer({
  isOpen,
  onClose,
  selectedItem,
  cartCount,
  setCartCount,
}) {
  const [quantity, setQuantity] = useState(1);
  const [isOrdered, setIsOrdered] = useState(false);

  const pricePerUnit = 185;
  const subtotal = pricePerUnit * quantity;

  const handleCheckout = () => {
    setIsOrdered(true);
    setCartCount(quantity);
  };

  const handleReset = () => {
    setIsOrdered(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dark Ambient Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#060504]/85 backdrop-blur-md transition-opacity duration-500"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-8">
        <div className="w-screen max-w-md bg-[#0c0a08] border-l border-[#d4af37]/30 p-7 sm:p-9 flex flex-col justify-between shadow-[0_0_60px_rgba(0,0,0,0.9)] relative">
          {/* Header */}
          <div>
            <div className="flex items-center justify-between border-b border-[#d4af37]/20 pb-4 mb-6">
              <div className="flex flex-col">
                <span className="text-[8.5px] tracking-[0.35em] text-[#d4af37] uppercase font-sans font-medium">
                  CONFIDENTIAL ACQUISITION
                </span>
                <h3 className="font-display text-2xl text-white uppercase mt-0.5">
                  Your Private Coffret
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-2 text-[#a89a87] hover:text-[#d4af37] transition-colors focus:outline-none"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isOrdered ? (
              /* Success State */
              <div className="flex flex-col items-center text-center py-10">
                <div className="w-16 h-16 rounded-full border border-[#d4af37] flex items-center justify-center mb-5 bg-[#d4af37]/15 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                  <Check className="w-8 h-8 text-[#d4af37]" />
                </div>
                <span className="text-[9px] tracking-[0.3em] text-[#d4af37] uppercase font-sans mb-1">
                  IMPERIAL ALLOTMENT RESERVED
                </span>
                <h4 className="font-display text-2xl sm:text-3xl text-white mb-3 uppercase">
                  Acquisition Confirmed
                </h4>
                <p className="text-xs text-[#bdae9c] font-sans font-light leading-relaxed mb-6">
                  Your numbered flacon of{' '}
                  <strong className="text-[#f7ecd5] font-medium">
                    {selectedItem ? selectedItem.name : 'Al Noble Ameer'}
                  </strong>{' '}
                  has been verified in our Dubai vault. A wax-sealed courier tracking certificate will arrive in your inbox.
                </p>

                <div className="editorial-card p-4 w-full text-left mb-6">
                  <span className="text-[8px] uppercase tracking-[0.22em] text-[#8e816e] block mb-1">
                    VAULT DISPATCH ALLOTMENT
                  </span>
                  <span className="font-mono text-xs text-[#d4af37]">
                    NOIRÉ-DXB-LOT-{Math.floor(Math.random() * 90000 + 10000)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full py-4 btn-gold-couture text-xs"
                >
                  Return To Experience
                </button>
              </div>
            ) : (
              /* Normal Bag Content */
              <div>
                {/* Product Summary Item */}
                <div className="editorial-card atelier-bracket p-5 mb-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-serif text-xl text-white">
                        {selectedItem ? selectedItem.name : 'Al Noble Ameer'}
                      </h4>
                      <span className="text-[9.5px] tracking-wider text-[#d4af37] uppercase font-sans">
                        100ML • 3.4 FL. OZ. Extrait De Parfum
                      </span>
                    </div>
                    <span className="font-mono text-base text-[#f7ecd5] font-medium">
                      ${pricePerUnit}
                    </span>
                  </div>

                  <p className="text-[11px] text-[#a89a87] font-sans font-light mb-4">
                    Sovereign black stag flacon with 24K solid alloy cap and velvet presentation casket.
                  </p>

                  {/* Quantity selector */}
                  <div className="flex items-center justify-between border-t border-[#d4af37]/15 pt-3">
                    <span className="text-[9.5px] uppercase tracking-wider text-[#8e816e] font-sans">
                      Allotment
                    </span>
                    <div className="flex items-center border border-[#d4af37]/35 bg-[#120f0c]">
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-1 text-[#f7ecd5] hover:bg-[#d4af37]/20 transition-colors focus:outline-none"
                      >
                        -
                      </button>
                      <span className="px-3.5 py-1 text-xs font-mono text-[#d4af37]">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3 py-1 text-[#f7ecd5] hover:bg-[#d4af37]/20 transition-colors focus:outline-none"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Complimentary Haute Privileges */}
                <div className="space-y-2.5 mb-6">
                  <span className="text-[8.5px] uppercase tracking-[0.3em] text-[#d4af37] block font-sans font-medium">
                    COMPLIMENTARY ROYALE PRIVILEGES
                  </span>

                  <div className="flex items-center gap-3 bg-[#110e0b] p-3 border border-[#d4af37]/15">
                    <Gift className="w-4 h-4 text-[#d4af37] shrink-0" />
                    <div className="text-[11px] text-[#bdae9c] font-sans">
                      <strong className="text-white font-normal">Velvet Coffret:</strong> Hand-crafted gold-embossed jewelers box.
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-[#110e0b] p-3 border border-[#d4af37]/15">
                    <ShieldCheck className="w-4 h-4 text-[#d4af37] shrink-0" />
                    <div className="text-[11px] text-[#bdae9c] font-sans">
                      <strong className="text-white font-normal">Discovery Duo:</strong> Two 5ml travel extracts (Wazeer & Safeer).
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-[#110e0b] p-3 border border-[#d4af37]/15">
                    <Truck className="w-4 h-4 text-[#d4af37] shrink-0" />
                    <div className="text-[11px] text-[#bdae9c] font-sans">
                      <strong className="text-white font-normal">White-Glove Courier:</strong> Tracked, insured international delivery.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Checkout Bar */}
          {!isOrdered && (
            <div className="border-t border-[#d4af37]/20 pt-6">
              <div className="flex justify-between items-baseline mb-4">
                <span className="text-xs uppercase tracking-[0.2em] text-[#8e816e] font-sans">
                  Total Investment
                </span>
                <span className="font-serif text-3xl text-white">
                  ${subtotal}
                </span>
              </div>

              <button
                type="button"
                onClick={handleCheckout}
                className="w-full py-4 btn-gold-couture text-xs"
              >
                Complete Private Acquisition
              </button>

              <span className="block text-center text-[8.5px] uppercase tracking-[0.22em] text-[#6d6355] mt-3 font-sans">
                Encrypted 256-Bit SSL • 30-Day Royal Return Privilege
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
