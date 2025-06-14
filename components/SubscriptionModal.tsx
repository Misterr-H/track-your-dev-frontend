import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SubscriptionModal({ isOpen, onClose }: SubscriptionModalProps) {
  const router = useRouter();

  const handlePurchaseSubscription = () => {
    window.open('https://checkout.dodopayments.com/buy/pdt_tWWK1EU7qQbAg9WjO1PK1?quantity=1', '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Subscription Required</DialogTitle>
          <DialogDescription className="pt-4">
            Your account is not activated yet. Please purchase a subscription to access this feature.
            <br /><br />
            If you have already purchased a subscription, please write to{' '}
            <a href="mailto:himanshu@trackyour.dev" className="text-primary hover:underline">
              himanshu@trackyour.dev
            </a>{' '}
            to get your account activated.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end pt-4">
          <Button onClick={handlePurchaseSubscription}>
            Purchase Subscription
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 