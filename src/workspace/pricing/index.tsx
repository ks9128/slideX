import { PricingTable } from "@clerk/clerk-react";
import { useEffect } from "react";

function Pricing() {
  // Add custom styling to the pricing table when component mounts
  useEffect(() => {
    // Add a slight delay to ensure the pricing table is rendered
    const timer = setTimeout(() => {
      const pricingTable = document.querySelector(
        ".clerk-pricing-table-wrapper"
      );
      if (pricingTable) {
        // Add custom classes for better styling
        pricingTable.classList.add(
          "rounded-xl",
          "overflow-hidden",
          "shadow-lg"
        );
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-background py-12">
      <div className="text-center max-w-4xl w-full px-4">
        <h2 className="font-bold text-3xl mb-2 text-foreground">Pricing</h2>
        <p className="text-muted-foreground mb-8">
          Start Creating Unlimited PPT sliders
        </p>
        <div className="flex justify-center">
          <div className="w-full max-w-3xl">
            <div className="clerk-pricing-table-wrapper">
              <PricingTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
