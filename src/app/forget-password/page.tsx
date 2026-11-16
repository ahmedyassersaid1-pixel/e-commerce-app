"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { ArrowLeft, Check, KeyRound, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ForgetPasswordSchema, type ForgetPasswordSchemaType } from "@/schemas/auth.schema";
import { forgetPassword, resetPassword, verifyResetCode } from "@/action/forgetPassword.action";
import { toast } from "@/components/ui/toast";

const steps = [
  { label: "Email", Icon: Mail },
  { label: "Verify code", Icon: KeyRound },
  { label: "New password", Icon: LockKeyhole },
];

function getApiMessage(data: { message?: string; statusMsg?: string }) {
  return data.message || data.statusMsg || "Something went wrong. Please try again.";
}

export default function ForgetPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [codeError, setCodeError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const codeInputs = useRef<(HTMLInputElement | null)[]>([]);

  const form = useForm<ForgetPasswordSchemaType>({
    defaultValues: { email: "" },
    resolver: zodResolver(ForgetPasswordSchema),
  });

  async function requestResetCode(values: ForgetPasswordSchemaType) {
    setBusy(true);
    try {
      const result = await forgetPassword(values);
      if (result.ok && result.data.statusMsg?.toLowerCase() === "success") {
        setEmail(values.email);
        setCode(["", "", "", "", "", ""]);
        setStep(2);
        toast.add({ type: "success", description: result.data.message || "A reset code has been sent to your email." });
        return;
      }
      toast.add({ type: "error", description: getApiMessage(result.data) });
    } catch {
      toast.add({ type: "error", description: "Could not send the reset code. Please try again." });
    } finally {
      setBusy(false);
    }
  }

  function updateCodeDigit(index: number, value: string) {
    const digits = value.replace(/\D/g, "");
    if (!digits) {
      setCode((current) => current.map((digit, i) => i === index ? "" : digit));
      return;
    }

    // Support pasting the complete six-digit code into any box.
    if (digits.length > 1) {
      const next = [...code];
      digits.slice(0, 6 - index).split("").forEach((digit, offset) => { next[index + offset] = digit; });
      setCode(next);
      codeInputs.current[Math.min(index + digits.length, 5)]?.focus();
      return;
    }

    setCode((current) => current.map((digit, i) => i === index ? digits : digit));
    if (index < 5) codeInputs.current[index + 1]?.focus();
  }

  function handleCodeKeyDown(index: number, event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace" && !code[index] && index > 0) codeInputs.current[index - 1]?.focus();
    if (event.key === "ArrowLeft" && index > 0) codeInputs.current[index - 1]?.focus();
    if (event.key === "ArrowRight" && index < 5) codeInputs.current[index + 1]?.focus();
  }

  async function submitCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const resetCode = code.join("");
    if (resetCode.length !== 6) {
      setCodeError("Enter all 6 digits from the email.");
      return;
    }

    setBusy(true);
    setCodeError("");
    try {
      const result = await verifyResetCode(resetCode);
      const status = String(result.data.status || result.data.statusMsg || "").toLowerCase();
      if (result.ok && status !== "error" && status !== "fail") {
        setStep(3);
        toast.add({ type: "success", description: result.data.message || "Code verified. Choose a new password." });
        return;
      }
      setCodeError(getApiMessage(result.data));
    } catch {
      setCodeError("Could not verify the code. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function submitNewPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d/.test(password) || !/[^\w\s]/.test(password)) {
      setPasswordError("Use 8+ characters with uppercase, lowercase, number, and symbol.");
      return;
    }
    if (password !== confirmPassword) {
      setPasswordError("The passwords do not match.");
      return;
    }

    setBusy(true);
    setPasswordError("");
    try {
      const result = await resetPassword(email, password);
      const status = String(result.data.status || result.data.statusMsg || "").toLowerCase();
      if (result.ok && status !== "error" && status !== "fail") {
        toast.add({ type: "success", description: result.data.message || "Your password has been reset." });
        router.push("/login");
        return;
      }
      setPasswordError(getApiMessage(result.data));
    } catch {
      setPasswordError("Could not reset your password. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="flex min-h-[calc(100vh-9rem)] items-center justify-center bg-white px-4 py-10 sm:px-6 sm:py-14">
      <div className="container mx-auto px-4 py-16" id="forgot-password-section">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <section className="hidden lg:block" aria-label="Password recovery information">
            <div className="space-y-6 text-center">
              <div className="relative flex h-96 w-full items-center justify-center overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#effcf4,#f6fbf8_55%,#edf8f1)] shadow-[0_5px_12px_rgba(30,50,40,0.12)]">
                <div className="absolute left-8 top-8 size-24 rounded-full bg-[#ddf8e7]/70" />
                <div className="absolute bottom-12 right-10 size-32 rounded-full bg-[#e2f9eb]/70" />
                <div className="absolute right-20 top-20 size-16 rounded-full bg-[#d9f6e4]/70" />
                <div className="relative z-10 flex flex-col items-center gap-6">
                  <div className="flex size-28 rotate-3 items-center justify-center rounded-3xl bg-white shadow-xl transition-transform duration-300 hover:rotate-0">
                    <div className="flex size-20 items-center justify-center rounded-2xl bg-[#d8f8e3]"><LockKeyhole size={36} className="text-[#16a34a]" /></div>
                  </div>
                  <div className="absolute -left-16 top-4 flex size-14 -rotate-12 items-center justify-center rounded-xl bg-white text-[#16a34a] shadow-lg"><Mail size={20} /></div>
                  <div className="absolute -right-16 top-8 flex size-14 rotate-12 items-center justify-center rounded-xl bg-white text-[#16a34a] shadow-lg"><ShieldCheck size={20} /></div>
                  <div className="flex gap-3"><span className="size-3 animate-pulse rounded-full bg-[#16a34a]" /><span className="size-3 animate-pulse rounded-full bg-[#16a34a] [animation-delay:150ms]" /><span className="size-3 animate-pulse rounded-full bg-[#16a34a] [animation-delay:300ms]" /></div>
                </div>
              </div>
              <div className="space-y-4">
                <h1 className="text-3xl font-bold text-[#21313c]">Reset Your Password</h1>
                <p className="text-lg text-[#6a7282]">Don&apos;t worry, it happens to the best of us. We&apos;ll help you get back into your account in no time.</p>
                <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-[#6a7282]">
                  <span className="inline-flex items-center gap-2"><Mail size={15} className="text-[#16a34a]" />Email Verification</span>
                  <span className="inline-flex items-center gap-2"><ShieldCheck size={15} className="text-[#16a34a]" />Secure Reset</span>
                  <span className="inline-flex items-center gap-2"><LockKeyhole size={15} className="text-[#16a34a]" />Encrypted</span>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full min-w-0" aria-label="Reset password form">
            <div className="min-w-0 rounded-2xl bg-white p-5 shadow-[0_8px_24px_rgba(20,33,50,0.14)] sm:p-8 lg:p-12">
              <div className="mb-8 text-center">
                <Link href="/" className="text-3xl font-bold text-[#16a34a]" aria-label="FreshCart home">Fresh<span className="text-[#263445]">Cart</span></Link>
                <h2 className="mb-2 mt-4 text-2xl font-bold text-[#263445]">{step === 1 ? "Forgot Password?" : step === 2 ? "Enter Reset Code" : "Create New Password"}</h2>
                <p className="text-sm leading-6 text-[#6a7282]">
                  {step === 1 ? "No worries, we’ll send you a reset code" : step === 2 ? <>Enter the 6-digit code sent to <strong className="font-semibold text-[#364153]">{email}</strong></> : "Choose a strong password for your account."}
                </p>
              </div>

              <ol aria-label="Password reset progress" className="mb-8 flex items-center justify-center">
                {steps.map(({ label, Icon }, index) => {
                  const stepNumber = index + 1;
                  const complete = stepNumber < step;
                  const active = stepNumber === step;
                  return (
                    <li key={label} className="flex items-center">
                      <div className={`flex size-8 items-center justify-center rounded-full transition-colors sm:size-9 ${active || complete ? "bg-[#16a34a] text-white" : "bg-[#f0f2f5] text-[#a0a8b5]"}`} aria-label={`${label}${active ? ", current step" : complete ? ", complete" : ""}`}>
                        {complete ? <Check size={15} /> : <Icon size={15} />}
                      </div>
                      {index < steps.length - 1 && <span className={`mx-2 h-0.5 w-8 sm:w-12 ${complete ? "bg-[#16a34a]" : "bg-[#e4e8ed]"}`} />}
                    </li>
                  );
                })}
              </ol>

              {step === 1 && (
                <form className="space-y-6" onSubmit={form.handleSubmit(requestResetCode)}>
                  <Controller name="email" control={form.control} render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="recovery-email">Email Address</FieldLabel>
                      <Input {...field} id="recovery-email" type="email" autoComplete="email" placeholder="Enter your email address" aria-invalid={fieldState.invalid} className="h-12 rounded-xl px-4 text-sm focus-visible:ring-[#16a34a]/20" />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )} />
                  <button type="submit" disabled={busy} className="h-12 w-full rounded-xl bg-[#16a34a] px-4 text-sm font-semibold text-white shadow-md transition hover:bg-[#12843d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16a34a] disabled:cursor-wait disabled:opacity-60">{busy ? "Sending code…" : "Send Reset Code"}</button>
                </form>
              )}

              {step === 2 && (
                <form className="space-y-6" onSubmit={submitCode}>
                  <fieldset className="min-w-0">
                    <legend className="mb-3 text-sm font-semibold text-[#364153]">6-digit verification code</legend>
                    <div className="grid w-full min-w-0 grid-cols-6 gap-1.5 sm:gap-3" dir="ltr">
                      {code.map((digit, index) => (
                        <input
                          key={index}
                          ref={(element) => { codeInputs.current[index] = element; }}
                          aria-label={`Code digit ${index + 1}`}
                          autoComplete={index === 0 ? "one-time-code" : "off"}
                          inputMode="numeric"
                          pattern="[0-9]*"
                          maxLength={index === 0 ? 6 : 1}
                          value={digit}
                          onChange={(event) => updateCodeDigit(index, event.target.value)}
                          onKeyDown={(event) => handleCodeKeyDown(index, event)}
                          className="h-11 w-full min-w-0 rounded-lg border border-[#dfe4eb] px-0 text-center text-base font-semibold text-[#21313c] outline-none transition focus:border-[#16a34a] focus:ring-2 focus:ring-[#16a34a]/15 sm:h-14 sm:text-lg"
                        />
                      ))}
                    </div>
                    {codeError && <p role="alert" className="mt-2 text-sm text-red-600">{codeError}</p>}
                  </fieldset>
                  <button type="submit" disabled={busy} className="h-12 w-full rounded-xl bg-[#16a34a] px-4 text-sm font-semibold text-white shadow-md transition hover:bg-[#12843d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16a34a] disabled:cursor-wait disabled:opacity-60">{busy ? "Verifying…" : "Verify Code"}</button>
                  <div className="flex items-center justify-between text-sm">
                    <button type="button" onClick={() => setStep(1)} className="inline-flex items-center gap-1.5 font-medium text-[#6a7282] hover:text-[#16a34a]"><ArrowLeft size={14} /> Change email</button>
                    <button type="button" disabled={busy} onClick={() => void requestResetCode({ email })} className="font-semibold text-[#16a34a] hover:text-[#12843d] disabled:opacity-50">Resend code</button>
                  </div>
                </form>
              )}

              {step === 3 && (
                <form className="space-y-5" onSubmit={submitNewPassword}>
                  <Field>
                    <FieldLabel htmlFor="new-password">New password</FieldLabel>
                    <Input id="new-password" type="password" autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter a new password" className="h-12 rounded-xl px-4 text-sm focus-visible:ring-[#16a34a]/20" required />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">Confirm new password</FieldLabel>
                    <Input id="confirm-password" type="password" autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Enter the password again" className="h-12 rounded-xl px-4 text-sm focus-visible:ring-[#16a34a]/20" required />
                  </Field>
                  {passwordError && <p role="alert" className="text-sm text-red-600">{passwordError}</p>}
                  <p className="text-xs leading-5 text-[#7a8493]">Use at least 8 characters with uppercase and lowercase letters, a number, and a symbol.</p>
                  <button type="submit" disabled={busy} className="h-12 w-full rounded-xl bg-[#16a34a] px-4 text-sm font-semibold text-white shadow-md transition hover:bg-[#12843d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16a34a] disabled:cursor-wait disabled:opacity-60">{busy ? "Updating password…" : "Reset Password"}</button>
                </form>
              )}

              <div className="mt-8 border-t border-[#edf0ee] pt-6 text-center">
                <p className="text-sm text-[#6a7282]">Remember your password? <Link href="/login" className="font-semibold text-[#16a34a] transition hover:text-[#12843d]">Sign In</Link></p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
