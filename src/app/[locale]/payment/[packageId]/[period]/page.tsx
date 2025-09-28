"use client";

import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { AlertTriangle, Check, CreditCard, Loader2, Smartphone, User } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
}

interface CustomerAccount {
  id: string;
  user_id: string;
  name: string;
  orgs: string[] | null;
  is_premium: boolean;
  started_packs: string[] | null;
  created_at: string;
  updated_at: string;
  premium_expiration: string | null;
  current_package: number | null;
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

interface UserData {
  user: User;
  customerAccount: CustomerAccount;
}

export default function PaymentPage() {
  const t = useTranslations('payment');
  const params = useParams();
  const router = useRouter();
  const packageId = params.packageId as string;
  const period = params.period as 'm' | 'y';
  const locale = params.locale as string;
  
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [packageData, setPackageData] = useState<Package | null>(null);
  const [currentPackageData, setCurrentPackageData] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [paymentLoading, setPaymentLoading] = useState<string | null>(null);

  const backendUrl = process.env.NEXT_PUBLIC_FINED_BACKEND_URL;

  // Logout function
  const handleLogout = () => {
    // Clear cookies
    document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    
    // Redirect to login page
    router.push(`/${locale}/payment/${packageId}/${period}/login`);
  };

  // Get access token from cookies
  const getAccessToken = () => {
    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('accessToken='));
    return tokenCookie ? tokenCookie.split('=')[1] : null;
  };

  // Check authentication and fetch user data
  useEffect(() => {
    const checkAuth = async () => {
      const token = getAccessToken();
      
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${backendUrl}/v1/auth/me`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const response_data = await response.json();
          setUserData(response_data.data);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          // Clear invalid token
          document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
          document.cookie = 'refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [backendUrl]);

  // Fetch package data
  useEffect(() => {
    const fetchPackageData = async () => {
      try {
        const response = await fetch(`${backendUrl}/v1/packages/${packageId}`);
        if (response.ok) {
          const response_data = await response.json();
          setPackageData(response_data.data);
        } else {
          setError(t('packageNotFound'));
        }
      } catch (error) {
        console.error('Failed to fetch package:', error);
        setError(t('failedToLoadPackage'));
      }
    };

    if (packageId) {
      fetchPackageData();
    }
  }, [packageId, backendUrl]);

  // Fetch current package data if user has one
  useEffect(() => {
    const fetchCurrentPackage = async () => {
      if (userData?.customerAccount.current_package && 
          userData.customerAccount.current_package !== parseInt(packageId)) {
        try {
          const response = await fetch(`${backendUrl}/v1/packages/${userData.customerAccount.current_package}`);
          if (response.ok) {
            const response_data = await response.json();
            setCurrentPackageData(response_data.data || response_data);
          }
        } catch (error) {
          console.error('Failed to fetch current package:', error);
        }
      }
    };

    fetchCurrentPackage();
  }, [userData, packageId, backendUrl]);

  const handlePayment = async (method: 'wave' | 'orange' | 'card') => {
    setPaymentLoading(method);
    
    // Here you would integrate with your payment provider
    // For now, we'll just simulate the payment process
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // After successful payment, you would typically:
      // 1. Process the payment with your payment provider
      // 2. Update the user's package in your backend
      // 3. Redirect to success page
      
      alert(t('paymentProcessing', { method }));
    } catch (error) {
      console.error('Payment failed:', error);
      alert(t('paymentFailed'));
    } finally {
      setPaymentLoading(null);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price);
  };

  const getCurrentPrice = () => {
    if (!packageData) return 0;
    return period === 'm' ? packageData.price_xof_m : packageData.price_xof_y;
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // Show login if not authenticated
  if (!isAuthenticated) {
    // This should be handled by middleware, but as a fallback
    router.push(`/${locale}/payment/${packageId}/${period}/login`);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // Show error if package not found
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-destructive">{error}</p>
            <Button 
              onClick={() => router.back()} 
              className="mt-4"
            >
              {t('goBack')}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background p-4">
      <div className="container mx-auto max-w-4xl py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">
                {t('welcome')}, {userData?.customerAccount.name || userData?.user.email}
              </span>
            </div>
            <Button 
            //   variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              className="text-white  hover:text-foreground bg-red-500 hover:bg-red-600"
            >
              {t('useAnotherAccount')}
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-primary">{t('completeYourPurchase')}</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Package Information */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  {packageData?.title}
                </CardTitle>
                <CardDescription>
                  {period === 'm' ? t('monthlySubscription') : t('yearlySubscription')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {packageData?.description && (
                  <p className="text-muted-foreground">{packageData.description}</p>
                )}
                
                {packageData?.benefits && packageData.benefits.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">{t('packageBenefits')}:</h4>
                    <ul className="space-y-1">
                      {packageData.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">{t('total')}:</span>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        {formatPrice(getCurrentPrice())} CFA
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {period === 'm' ? t('perMonth') : t('perYear')}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Package Warning */}
            {currentPackageData && (
              <Card className="mt-4 border-orange-200 bg-orange-50">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-orange-800 mb-1">
                        {t('packageChangeNotice')}
                      </h4>
                      <p className="text-sm text-orange-700">
                        {t('currentPackageWarning', { packageName: currentPackageData.title })}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Payment Methods */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>{t('choosePaymentMethod')}</CardTitle>
                <CardDescription>
                  {t('selectPaymentOption')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Wave Payment */}
                <Button
                  onClick={() => handlePayment('wave')}
                  disabled={paymentLoading !== null}
                  className="w-full h-16 justify-start text-left"
                  variant="outline"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                      <Smartphone className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">{t('wave')}</div>
                      <div className="text-sm text-muted-foreground">{t('mobileMoney')}</div>
                    </div>
                    {paymentLoading === 'wave' && (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    )}
                  </div>
                </Button>

                {/* Orange Money */}
                <Button
                  onClick={() => handlePayment('orange')}
                  disabled={paymentLoading !== null}
                  className="w-full h-16 justify-start text-left"
                  variant="outline"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                      <Smartphone className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">{t('orangeMoney')}</div>
                      <div className="text-sm text-muted-foreground">{t('mobileMoney')}</div>
                    </div>
                    {paymentLoading === 'orange' && (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    )}
                  </div>
                </Button>

                {/* Card Payment */}
                <Button
                  onClick={() => handlePayment('card')}
                  disabled={paymentLoading !== null}
                  className="w-full h-16 justify-start text-left"
                  variant="outline"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">{t('cardPayment')}</div>
                      <div className="text-sm text-muted-foreground">{t('visaMastercard')}</div>
                    </div>
                    {paymentLoading === 'card' && (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    )}
                  </div>
                </Button>

                {/* Security Note */}
                <div className="mt-6 pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>{t('securePaymentProcessing')}</span>
                  </div>
                  {/* <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Cancel anytime</span>
                  </div> */}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}