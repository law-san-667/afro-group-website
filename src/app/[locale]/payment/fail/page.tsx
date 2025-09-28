"use client";

import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { AlertTriangle, ArrowLeft, CreditCard, HelpCircle, RefreshCw, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Order {
  created_at: string;
  expiration: string | null;
  id: string;
  package_id: number | null;
  period: string | null;
  status: string | null;
  user_id: string | null;
}

interface Package {
  id: number;
  title: string;
  price_xof_m: number;
  price_ios_m: number;
  description: string;
  benefits: string[];
  price_xof_y: number;
  price_ios_y: number;
  created_at: string;
}

export default function PaymentFailPage() {
  const t = useTranslations('payment.fail');
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = params.locale as string;
  
  // Get payment details from URL params
  const orderId = searchParams.get('orderId');
  const errorCode = searchParams.get('error');
  const errorMessage = searchParams.get('message');
  
  const [order, setOrder] = useState<Order | null>(null);
  const [packageData, setPackageData] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);
  
  const backendUrl = process.env.NEXT_PUBLIC_FINED_BACKEND_URL;

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId) {
        setLoading(false);
        return;
      }

      try {
        // Fetch order details
        const orderResponse = await fetch(`${backendUrl}/v1/orders/${orderId}`);
        if (orderResponse.ok) {
          const orderData = await orderResponse.json();
          setOrder(orderData.data || orderData);

          // Fetch package details if package_id exists
          if (orderData.data?.package_id || orderData.package_id) {
            const packageId = orderData.data?.package_id || orderData.package_id;
            const packageResponse = await fetch(`${backendUrl}/v1/packages/${packageId}`);
            if (packageResponse.ok) {
              const packageResponseData = await packageResponse.json();
              setPackageData(packageResponseData.data || packageResponseData);
            }
          }
        }
      } catch (error) {
        console.error('Failed to fetch order details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId, backendUrl]);

  const handleTryAgain = () => {
    if (order?.package_id && order?.period) {
      router.push(`/${locale}/payment/${order.package_id}/${order.period}`);
    } else {
      router.push(`/${locale}`);
    }
  };

  const handleContactSupport = () => {
    // You can replace this with your actual support contact method
    window.open('mailto:support@afrogroup.com?subject=Payment Issue&body=I encountered a payment issue. Error details: ' + (errorMessage || 'Payment failed'));
  };

  const reasons = t.raw('reasons') as string[];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background p-4">
      <div className="container mx-auto max-w-2xl py-8">
        {/* Back Button */}
        <div className="flex justify-start mb-6">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => router.push(`/${locale}`)}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('backToPayment')}
          </Button>
        </div>

        {/* Fail Card */}
        <Card className="w-full border-red-200">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto mb-6 w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
              <X className="h-10 w-10 text-red-600" />
            </div>
            <CardTitle className="text-3xl font-bold text-red-800 mb-2">
              {t('title')}
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              {t('subtitle')}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Description */}
            <div className="text-center">
              <p className="text-muted-foreground leading-relaxed">
                {t('description')}
              </p>
            </div>

            {/* Error Details (if available) */}
            {(errorCode || errorMessage) && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-red-800 mb-1">Error Details</h4>
                    {errorCode && (
                      <p className="text-sm text-red-700 mb-1">
                        <span className="font-medium">Code:</span> {errorCode}
                      </p>
                    )}
                    {errorMessage && (
                      <p className="text-sm text-red-700">
                        <span className="font-medium">Message:</span> {errorMessage}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Order Details (if available) */}
            {order && (
              <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                <h4 className="font-semibold mb-4">Failed Order Details</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Order ID:</span>
                    <p className="font-mono">#{order.id}</p>
                  </div>
                  {packageData && (
                    <div>
                      <span className="text-muted-foreground">Package:</span>
                      <p className="font-semibold">{packageData.title}</p>
                    </div>
                  )}
                  {order.period && (
                    <div>
                      <span className="text-muted-foreground">Period:</span>
                      <p>{order.period === 'm' ? 'Monthly' : 'Yearly'}</p>
                    </div>
                  )}
                  <div>
                    <span className="text-muted-foreground">Status:</span>
                    <p className="text-red-600 font-semibold">{order.status || 'Failed'}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Common Reasons */}
            <div className="bg-muted/50 rounded-lg p-6">
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-muted-foreground" />
                {t('commonReasons')}
              </h4>
              <ul className="space-y-2">
                {reasons.map((reason, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <Button 
                onClick={handleTryAgain}
                className="w-full h-12 text-base"
                size="lg"
              >
                <RefreshCw className="h-5 w-5 mr-2" />
                {t('tryAgain')}
              </Button>
              
              <Button 
                variant="outline"
                onClick={handleContactSupport}
                className="w-full h-12 text-base"
                size="lg"
              >
                <HelpCircle className="h-5 w-5 mr-2" />
                {t('contactSupport')}
              </Button>
              
              <Button 
                variant="ghost"
                onClick={() => router.push(`/${locale}`)}
                className="w-full h-12 text-base"
                size="lg"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Home
              </Button>
            </div>

            {/* Reassurance Note */}
            <div className="text-center pt-4 border-t">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <CreditCard className="h-4 w-4" />
                <span>No charges were made to your account</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
