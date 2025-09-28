"use client";

import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Check, Loader2, Mail, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface LoginProps {
  packageId: string;
  period: string;
  locale: string;
}

export default function Login({ packageId, period, locale }: LoginProps) {
  const router = useRouter();
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
      setError('Please enter your email');
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
        setError(errorData.message || 'Failed to send verification code');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError('Please enter the 6-digit code');
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
      console.log("If Ok will be redirected to payment " + `/${locale}/payment/${packageId}/${period}`);
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
          setError('Too many failed attempts. Please start over.');
          setTimeout(() => {
            setStep('email');
            setOtp('');
            setOtpAttempts(0);
            setResendCount(0);
            setError('');
          }, 3000);
        } else {
          setError(errorData.message || `Invalid code. ${2 - otpAttempts} attempts remaining.`);
          setOtp('');
        }
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendCount >= 3) {
      setError('Maximum resend attempts reached');
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
        setError(errorData.message || 'Failed to resend code');
      }
    } catch (error) {
      setError('Network error. Please try again.');
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
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            {step === 'email' ? (
              <Mail className="h-6 w-6 text-primary" />
            ) : (
              <Shield className="h-6 w-6 text-primary" />
            )}
          </div>
          <CardTitle className="text-2xl font-bold">
            {step === 'email' ? 'Sign In' : 'Verify Your Email'}
          </CardTitle>
          <CardDescription>
            {step === 'email'
              ? 'Enter your email to continue to payment'
              : `Enter the 6-digit code sent to ${email}`}
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
                  Login Successful!
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Redirecting to payment page...
                </p>
              </div>
              <Button 
                onClick={() => router.push(`/${locale}/payment/${packageId}/${period}`)}
                className="w-full"
              >
                Continue to Payment
              </Button>
            </div>
          ) : step === 'email' ? (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
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
                    Sending Code...
                  </>
                ) : (
                  'Send Verification Code'
                )}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">Verification Code</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="000000"
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
                    Verifying...
                  </>
                ) : (
                  'Verify Code'
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
                    Resend Code ({3 - resendCount} remaining)
                  </Button>
                ) : resendTimer > 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Resend available in {formatTime(resendTimer)}
                  </p>
                ) : resendCount >= 3 ? (
                  <p className="text-sm text-destructive">
                    Maximum resend attempts reached
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
                  Change Email
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}