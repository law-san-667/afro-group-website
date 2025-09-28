"use client";

import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { ArrowLeft, Check, Download, Loader2, Mail, Shield } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const t = useTranslations('login');
  const params = useParams();
  const router = useRouter();
  const packageId = params.packageId as string;
  const period = params.period as 'm' | 'y';
  const locale = params.locale as string;
  
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [otpAttempts, setOtpAttempts] = useState(0);
  const [resendCount, setResendCount] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const backendUrl = process.env.NEXT_PUBLIC_FINED_BACKEND_URL;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    } else if (step === 'otp' && !canResend) {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [resendTimer, step, canResend]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError(t('pleaseEnterEmail'));
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${backendUrl}/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (response.ok) {
        setStep('otp');
        setResendTimer(30);
        setCanResend(false);
      } else {
        const errorData = await response.json();
        setError(errorData.message || t('failedToSend'));
      }
    } catch (error) {
      setError(t('networkError'));
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError(t('pleaseEnterCode'));
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${backendUrl}/v1/auth/verify-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          code: otp,
          type: 'CUSTOMER',
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data.data);
        
        // Set cookies
        document.cookie = `accessToken=${data.data.accessToken}; path=/; max-age=86400; secure; samesite=strict`;
        document.cookie = `refreshToken=${data.data.refreshToken}; path=/; max-age=2592000; secure; samesite=strict`;
        
        // Show success state first
        setLoginSuccess(true);
        
        // Auto-redirect after 2 seconds
        setTimeout(() => {
          router.push(`/${locale}/payment/${packageId}/${period}`);
        }, 2000);
      } else {
        const errorData = await response.json();
        setOtpAttempts(prev => prev + 1);
        
        if (otpAttempts >= 2) {
          setError(t('tooManyAttempts'));
          setTimeout(() => {
            setStep('email');
            setOtp('');
            setOtpAttempts(0);
            setResendCount(0);
            setError('');
          }, 3000);
        } else {
          setError(errorData.message || t('invalidCodeRemaining', { count: 2 - otpAttempts }));
          setOtp('');
        }
      }
    } catch (error) {
      setError(t('networkError'));
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendCount >= 3) {
      setError(t('maximumResendReached'));
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${backendUrl}/v1/auth/refresh-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (response.ok) {
        setResendCount(prev => prev + 1);
        setCanResend(false);
        
        // Set timer based on resend count
        if (resendCount === 0) setResendTimer(60);      // 1 minute
        else if (resendCount === 1) setResendTimer(300); // 5 minutes
        else setResendTimer(0);
        
        setError('');
      } else {
        const errorData = await response.json();
        setError(errorData.message || t('failedToResend'));
      }
    } catch (error) {
      setError(t('networkError'));
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Return Home Button */}
        <div className="flex justify-start">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => router.push(`/${locale}`)}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('backToHome')}
          </Button>
        </div>
        
        <Card className="w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            {step === 'email' ? (
              <Mail className="h-6 w-6 text-primary" />
            ) : (
              <Shield className="h-6 w-6 text-primary" />
            )}
          </div>
          <CardTitle className="text-2xl font-bold">
            {step === 'email' ? t('signIn') : t('verifyEmail')}
          </CardTitle>
          <CardDescription>
            {step === 'email'
              ? t('enterEmailToContinue')
              : t('enterCodeSentTo') + ` ${email}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loginSuccess ? (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  {t('loginSuccessful')}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {t('redirectingToPayment')}
                </p>
              </div>
              <Button 
                onClick={() => router.push(`/${locale}/payment/${packageId}/${period}`)}
                className="w-full"
              >
                {t('continueToPayment')}
              </Button>
            </div>
          ) : step === 'email' ? (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t('emailAddress')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t('emailPlaceholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('sendingCode')}
                  </>
                ) : (
                  t('sendVerificationCode')
                )}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">{t('verificationCode')}</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder={t('codePlaceholder')}
                  value={otp}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                    setOtp(value);
                  }}
                  disabled={loading}
                  maxLength={6}
                  className="text-center text-2xl tracking-widest"
                  required
                />
              </div>
              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
              <Button type="submit" className="w-full" disabled={loading || otp.length !== 6}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('verifying')}
                  </>
                ) : (
                  t('verifyCode')
                )}
              </Button>
              
              <div className="text-center space-y-2">
                {canResend && resendCount < 3 ? (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleResendOtp}
                    disabled={loading}
                    className="text-sm"
                  >
                    {t('resendCode')} ({3 - resendCount} {t('remaining')})
                  </Button>
                ) : resendTimer > 0 ? (
                  <p className="text-sm text-muted-foreground">
                    {t('resendAvailableIn')} {formatTime(resendTimer)}
                  </p>
                ) : resendCount >= 3 ? (
                  <p className="text-sm text-destructive">
                    {t('maximumResendAttempts')}
                  </p>
                ) : null}
                
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setStep('email');
                    setOtp('');
                    setError('');
                    setOtpAttempts(0);
                    setResendCount(0);
                    setCanResend(false);
                    setResendTimer(0);
                  }}
                  className="text-sm"
                >
                  {t('changeEmail')}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
        </Card>
        
        {/* Create Account Section */}
        <Card className="w-full">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Download className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  {t('noAccountYet')}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {t('downloadAppDescription')}
                </p>
              </div>
              <Button 
                onClick={() => window.open("https://onelink.to/akekfv", "_blank")}
                className="w-full"
                variant="outline"
              >
                <Download className="h-4 w-4 mr-2" />
                {t('downloadFinEdApp')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}