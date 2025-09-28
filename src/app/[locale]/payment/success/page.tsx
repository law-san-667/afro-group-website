"use client";

import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { ArrowLeft, Calendar, Check, Download, Hash, X } from "lucide-react";
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

export default function PaymentSuccessPage() {
  const t = useTranslations('payment.success');
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = params.locale as string;
  const orderId = searchParams.get('orderId');
  
  const [order, setOrder] = useState<Order | null>(null);
  const [packageData, setPackageData] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const backendUrl = process.env.NEXT_PUBLIC_FINED_BACKEND_URL;

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId) {
        setError('Order ID not provided');
        setLoading(false);
        return;
      }

      try {
        // Fetch order details
        const orderResponse = await fetch(`${backendUrl}/v1/orders/${orderId}`);
        if (!orderResponse.ok) {
          throw new Error('Order not found');
        }
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
      } catch (error) {
        console.error('Failed to fetch order details:', error);
        setError('Failed to load order information');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId, backendUrl]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US');
  };

  const getReturnUrl = () => {
    if (order?.package_id && order?.period) {
      return `/${locale}/payment/${order.package_id}/${order.period}`;
    }
    return `/${locale}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background p-4">
        <div className="container mx-auto max-w-2xl py-8">
          <Card className="w-full border-red-200">
            <CardContent className="pt-6 text-center">
              <X className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-red-800 mb-2">Error</h3>
              <p className="text-red-600 mb-4">{error || 'Order not found'}</p>
              <Button onClick={() => router.push(`/${locale}`)}>
                Back to Home
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background p-4">
      <div className="container mx-auto max-w-2xl py-8">
        {/* Back to Home Button */}
        <div className="flex justify-start mb-6">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => router.push(`/${locale}`)}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('backToApp')}
          </Button>
        </div>

        {/* Success Card */}
        <Card className="w-full">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto mb-6 w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <CardTitle className="text-3xl font-bold text-green-800 mb-2">
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

            {/* Order Details */}
            <div className="bg-muted/50 rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{t('orderNumber')}:</span>
                </div>
                <span className="font-mono text-sm bg-background px-2 py-1 rounded">
                  #{order?.id}
                </span>
              </div>
              
              {packageData && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="font-medium">{t('packageActivated')}:</span>
                  </div>
                  <span className="text-green-700 font-semibold">
                    {packageData.title}
                  </span>
                </div>
              )}
              
              {order?.expiration && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{t('validUntil')}:</span>
                  </div>
                  <span className="font-semibold">
                    {formatDate(order.expiration)}
                  </span>
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Order Date:</span>
                </div>
                <span className="font-semibold">
                  {formatDate(order?.created_at || '')}
                </span>
              </div>
              
              {order?.period && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Subscription:</span>
                  </div>
                  <span className="font-semibold">
                    {order.period === 'm' ? 'Monthly' : 'Yearly'}
                  </span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <Button 
                onClick={() => window.open("https://onelink.to/akekfv", "_blank")}
                className="w-full h-12 text-base"
                size="lg"
              >
                <Download className="h-5 w-5 mr-2" />
                {t('downloadApp')}
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => router.push(getReturnUrl())}
                className="w-full h-12 text-base"
                size="lg"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                {t('backToApp')}
              </Button>
            </div>

            {/* Additional Message */}
            <div className="text-center pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                {t('continueJourney')}
              </p>
            </div>
          </CardContent>
        </Card>
        
        {/* Celebration Animation */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="animate-bounce">
              <div className="w-2 h-2 bg-green-500 rounded-full opacity-0 animate-ping" style={{ animationDelay: '0s' }}></div>
            </div>
          </div>
          <div className="absolute top-1/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
            <div className="animate-bounce" style={{ animationDelay: '0.2s' }}>
              <div className="w-1 h-1 bg-primary rounded-full opacity-0 animate-ping" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
          <div className="absolute top-2/3 right-1/4 transform translate-x-1/2 -translate-y-1/2">
            <div className="animate-bounce" style={{ animationDelay: '0.4s' }}>
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full opacity-0 animate-ping" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
