import {
  IconClock,
  IconShieldHalfFilled,
  IconTruck,
} from "@tabler/icons-react";

export default function LoginHero() {
  return (
    <>
      <div className="hidden lg:block">
        <div className="text-center space-y-6">
          <img
            className="w-full h-72 xl:h-96 object-cover rounded-2xl shadow-lg"
            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/2e5810ff3e-e750761ebcd4ae5907db.png"
            alt="Fresh vegetables and fruits shopping cart illustration, modern clean style, green theme"
            loading="lazy"
          />
          <div className="space-y-4">
            <h2 className="text-2xl xl:text-3xl font-bold text-gray-800">
              FreshCart - Your One-Stop Shop for Fresh Products
            </h2>
            <p className="text-base xl:text-lg text-gray-600">
              Join thousands of happy customers who trust FreshCart for their
              daily grocery needs
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-gray-500">
              <div className="flex items-center">
                <IconTruck className="text-primary-600 mr-2" stroke={2} />
                Free Delivery
              </div>
              <div className="flex items-center">
                <IconShieldHalfFilled className="text-primary-600 mr-2" />
                Secure Payment
              </div>
              <div className="flex items-center">
                <IconClock stroke={2} className="text-primary-600 mr-2" />
                24/7 Support
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}