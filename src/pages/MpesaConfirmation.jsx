import React, { useEffect, useMemo, useState } from "react";

 function PaymentConfirmation() {
  // Demo data (replace with your real values)
  const phoneNumber = "0722123456";
  const routeFrom = "Nairobi";
  const routeTo = "Nakuru";
  const seat = "4B";
  const amount = 800;
  const currency = "KSh";
  const ticketNumber = "4092";

  const [status, setStatus] = useState("pending"); // "pending" | "confirmed" | "cancelled" | "expired"
  const [secondsLeft, setSecondsLeft] = useState(59);
  const [resendCount, setResendCount] = useState(0);

  const totalSeconds = 59;

  useEffect(() => {
    if (status !== "pending") return;
    if (secondsLeft <= 0) {
      setStatus("expired");
      return;
    }

    const id = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [secondsLeft, status]);

  const progress = useMemo(() => {
    const clamped = Math.max(0, Math.min(totalSeconds, secondsLeft));
    return (clamped / totalSeconds) * 100;
  }, [secondsLeft]);

  const timeLabel = useMemo(() => {
    const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
    const ss = String(secondsLeft % 60).padStart(2, "0");
    return `${mm}:${ss}`;
  }, [secondsLeft]);

  function handleResend() {
    if (status !== "pending") return;
    setResendCount((c) => c + 1);
    setSecondsLeft(totalSeconds);

    // TODO: call your API to resend STK push
    // await api.resendStkPush();
  }

  function handleCancel() {
    setStatus("cancelled");

    // TODO: call your API to cancel payment
    // await api.cancelPayment();
  }

  function handleConfirmDemo() {
    setStatus("confirmed");

 
  }

  function handleViewTicket() {
    // TODO: navigate to ticket page
    // navigate(`/ticket/${ticketNumber}`);
    alert(`Viewing ticket #${ticketNumber}`);
  }

  return (
    <main>
      {status === "pending" || status === "expired" ? (
        <section aria-label="Payment confirmation">
          <header>
            <div aria-hidden="true">[icon]</div>
            <h1>Confirm Payment</h1>
            <p>
              STK Push sent to <strong>{phoneNumber}</strong>. Please enter your PIN on your
              phone to complete payment.
            </p>
          </header>

          <section aria-label="Time remaining">
            <div>
              <span>Time remaining</span> <strong>{timeLabel}</strong>
            </div>

            <progress value={progress} max={100} aria-label="Countdown progress" />

            <div>
              <button type="button" onClick={handleResend} disabled={status !== "pending"}>
                Resend Request
              </button>
              <span aria-label="Resend count">Resent: {resendCount}</span>
            </div>
          </section>

          <section aria-label="Trip summary">
            <h2>Summary</h2>

            <dl>
              <div>
                <dt>Route</dt>
                <dd>
                  {routeFrom} {routeTo}
                </dd>
              </div>

              <div>
                <dt>Seat</dt>
                <dd>{seat}</dd>
              </div>

              <div>
                <dt>Total Amount</dt>
                <dd>
                  {currency}
                  {amount.toFixed(2)}
                </dd>
              </div>
            </dl>
          </section>

          <footer>
            <button type="button" onClick={handleCancel}>
              Cancel Payment
            </button>

            {/* Demo-only helper button so you can see the confirmed UI */}
            <button type="button" onClick={handleConfirmDemo}>
              Mark as Confirmed (demo)
            </button>

            {status === "expired" ? (
              <p role="status">Request expired. You can resend the request.</p>
            ) : null}
          </footer>
        </section>
      ) : null}

      {status === "confirmed" ? (
        <section aria-label="Booking confirmed">
          <header>
            <div aria-hidden="true">[check]</div>
            <h1>Booking Confirmed!</h1>
            <p>Your seat has been successfully reserved. Safe travels!</p>
          </header>

          <p>
            Ticket <strong>#{ticketNumber}</strong>
          </p>

          <button type="button" onClick={handleViewTicket}>
            View Ticket
          </button>
        </section>
      ) : null}

      {status === "cancelled" ? (
        <section aria-label="Payment cancelled">
          <h1>Payment Cancelled</h1>
          <p>The payment request has been cancelled.</p>
          <button type="button" onClick={() => setStatus("pending")}>
            Start Again
          </button>
        </section>
      ) : null}
    </main>
  );
}

export default PaymentConfirmation;