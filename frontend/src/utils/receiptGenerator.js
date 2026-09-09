/**
 * VEXORA Digital Receipt & Queue Pass Generator (PNG)
 * Renders a pixel-perfect, high-DPI luxury digital pass onto an HTML5 canvas and triggers a PNG download.
 */

function drawRoundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  if (!text) return y;
  const words = String(text).split(' ');
  let line = '';
  let currentY = y;
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line.trim(), x, currentY);
      line = words[n] + ' ';
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, currentY);
  return currentY;
}

export function generateReceiptCanvas(ticket) {
  const width = 640;
  const height = 960;
  const scale = 2; // 2x for retina / high-DPI sharpness

  const canvas = document.createElement('canvas');
  canvas.width = width * scale;
  canvas.height = height * scale;

  const ctx = canvas.getContext('2d');
  ctx.scale(scale, scale);

  // Background - Dark outer frame
  ctx.fillStyle = '#0a0b0e';
  ctx.fillRect(0, 0, width, height);

  // Main Card Area
  const cardX = 28;
  const cardY = 28;
  const cardW = width - cardX * 2;
  const cardH = height - cardY * 2;
  const radius = 24;

  // Card Shadow & Base Fill
  drawRoundedRect(ctx, cardX, cardY, cardW, cardH, radius);
  ctx.fillStyle = '#111319';
  ctx.fill();
  ctx.strokeStyle = '#222736';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Header Banner
  ctx.save();
  drawRoundedRect(ctx, cardX, cardY, cardW, 110, radius);
  ctx.fillStyle = '#171a24';
  ctx.fill();
  ctx.restore();

  // VEXORA Brand Wordmark
  ctx.fillStyle = '#ffffff';
  ctx.font = '800 22px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.letterSpacing = '0.12em';
  ctx.fillText('V E X O R A', cardX + 26, cardY + 48);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '600 10.5px "Courier New", Courier, monospace';
  ctx.letterSpacing = '0.1em';
  ctx.fillText('REAL-TIME QUEUE PASS & RECEIPT', cardX + 26, cardY + 70);

  // Status Badge (Top Right)
  const status = (ticket.status || 'waiting').toLowerCase();
  const isCompleted = status === 'completed';
  const isInService = status === 'in_service';
  const badgeLabel = isCompleted ? 'COMPLETED' : isInService ? 'IN CHAIR' : 'WAITING';
  const badgeBg = isCompleted ? '#064e3b' : isInService ? '#1e3a8a' : '#3f2d08';
  const badgeBorder = isCompleted ? '#059669' : isInService ? '#2563eb' : '#d97706';
  const badgeColor = isCompleted ? '#34d399' : isInService ? '#60a5fa' : '#fbbf24';

  const badgeW = 114;
  const badgeH = 32;
  const badgeX = cardX + cardW - badgeW - 24;
  const badgeY = cardY + 36;
  drawRoundedRect(ctx, badgeX, badgeY, badgeW, badgeH, 16);
  ctx.fillStyle = badgeBg;
  ctx.fill();
  ctx.strokeStyle = badgeBorder;
  ctx.lineWidth = 1.2;
  ctx.stroke();

  // Status dot
  ctx.beginPath();
  ctx.arc(badgeX + 16, badgeY + 16, 4, 0, Math.PI * 2);
  ctx.fillStyle = badgeColor;
  ctx.fill();

  ctx.fillStyle = badgeColor;
  ctx.font = '700 11px system-ui, sans-serif';
  ctx.letterSpacing = '0.06em';
  ctx.fillText(badgeLabel, badgeX + 26, badgeY + 20);

  // Perforated Divider 1 with cutout notches
  const notch1Y = cardY + 110;
  ctx.beginPath();
  ctx.arc(cardX, notch1Y, 12, -Math.PI / 2, Math.PI / 2, false);
  ctx.fillStyle = '#0a0b0e';
  ctx.fill();
  ctx.strokeStyle = '#222736';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(cardX + cardW, notch1Y, 12, Math.PI / 2, -Math.PI / 2, false);
  ctx.fillStyle = '#0a0b0e';
  ctx.fill();
  ctx.strokeStyle = '#222736';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.beginPath();
  ctx.setLineDash([6, 6]);
  ctx.moveTo(cardX + 18, notch1Y);
  ctx.lineTo(cardX + cardW - 18, notch1Y);
  ctx.strokeStyle = '#282d3f';
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.setLineDash([]);

  // Ticket Number & Big Queue Position
  const section1Y = notch1Y + 28;
  ctx.fillStyle = '#64748b';
  ctx.font = '700 10.5px "Courier New", Courier, monospace';
  ctx.letterSpacing = '0.12em';
  ctx.fillText('DIGITAL QUEUE TICKET', cardX + 26, section1Y + 12);

  ctx.fillStyle = '#ffffff';
  ctx.font = '800 36px "Courier New", Courier, monospace';
  ctx.letterSpacing = '0.04em';
  ctx.fillText(`#${ticket.ticketNumber || 'VXR-001'}`, cardX + 26, section1Y + 54);

  // Queue Position Pill on Right
  const qBoxW = 160;
  const qBoxH = 68;
  const qBoxX = cardX + cardW - qBoxW - 24;
  const qBoxY = section1Y - 2;
  drawRoundedRect(ctx, qBoxX, qBoxY, qBoxW, qBoxH, 12);
  ctx.fillStyle = '#181c28';
  ctx.fill();
  ctx.strokeStyle = '#2d3448';
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = '#94a3b8';
  ctx.font = '700 9.5px "Courier New", Courier, monospace';
  ctx.letterSpacing = '0.08em';
  ctx.fillText('QUEUE POSITION', qBoxX + 16, qBoxY + 24);

  ctx.fillStyle = isCompleted ? '#34d399' : isInService ? '#60a5fa' : '#f59e0b';
  ctx.font = '800 24px system-ui, sans-serif';
  const posText = isCompleted ? 'DONE' : isInService ? 'IN SEAT' : `#${ticket.queuePosition || 1}`;
  ctx.fillText(posText, qBoxX + 16, qBoxY + 54);

  // Divider Line
  const line1Y = section1Y + 82;
  ctx.beginPath();
  ctx.moveTo(cardX + 24, line1Y);
  ctx.lineTo(cardX + cardW - 24, line1Y);
  ctx.strokeStyle = '#1e2332';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Salon Details Section
  let currentY = line1Y + 26;
  ctx.fillStyle = '#64748b';
  ctx.font = '700 10px "Courier New", Courier, monospace';
  ctx.letterSpacing = '0.1em';
  ctx.fillText('SALON DESTINATION', cardX + 26, currentY);

  currentY += 24;
  ctx.fillStyle = '#ffffff';
  ctx.font = '700 19px system-ui, sans-serif';
  ctx.fillText(ticket.salonName || 'VEXORA Partner Salon', cardX + 26, currentY);

  if (ticket.salonAddress) {
    currentY += 20;
    ctx.fillStyle = '#94a3b8';
    ctx.font = '500 12.5px system-ui, sans-serif';
    currentY = wrapText(ctx, ticket.salonAddress, cardX + 26, currentY, cardW - 52, 18);
  }

  // Stylist & Services
  currentY += 26;
  const colHalf = (cardW - 52) / 2;

  // Stylist
  ctx.fillStyle = '#64748b';
  ctx.font = '700 10px "Courier New", Courier, monospace';
  ctx.letterSpacing = '0.1em';
  ctx.fillText('PREFERRED STYLIST', cardX + 26, currentY);

  ctx.fillStyle = '#e2e8f0';
  ctx.font = '600 14px system-ui, sans-serif';
  ctx.fillText(ticket.stylistName || 'Any Available Stylist', cardX + 26, currentY + 22);

  // Duration
  ctx.fillStyle = '#64748b';
  ctx.font = '700 10px "Courier New", Courier, monospace';
  ctx.letterSpacing = '0.1em';
  ctx.fillText('EST. DURATION', cardX + 26 + colHalf, currentY);

  ctx.fillStyle = '#e2e8f0';
  ctx.font = '600 14px system-ui, sans-serif';
  ctx.fillText(`~${ticket.totalDuration || 30} mins`, cardX + 26 + colHalf, currentY + 22);

  // Services
  currentY += 46;
  ctx.fillStyle = '#64748b';
  ctx.font = '700 10px "Courier New", Courier, monospace';
  ctx.letterSpacing = '0.1em';
  ctx.fillText('SELECTED SERVICES', cardX + 26, currentY);

  currentY += 20;
  ctx.fillStyle = '#e2e8f0';
  ctx.font = '500 13px system-ui, sans-serif';
  currentY = wrapText(ctx, ticket.serviceNames || 'Salon Services', cardX + 26, currentY, cardW - 52, 18);

  // Highlight Metric Box (Wait Time, Arrive By, Total Amount)
  currentY += 18;
  const boxH = 76;
  drawRoundedRect(ctx, cardX + 24, currentY, cardW - 48, boxH, 12);
  ctx.fillStyle = '#171a25';
  ctx.fill();
  ctx.strokeStyle = '#272d3e';
  ctx.lineWidth = 1;
  ctx.stroke();

  const metricColW = (cardW - 48) / 3;

  // Col 1: Wait Time
  ctx.fillStyle = '#94a3b8';
  ctx.font = '700 9.5px "Courier New", Courier, monospace';
  ctx.letterSpacing = '0.06em';
  ctx.fillText('EST. WAIT TIME', cardX + 40, currentY + 24);

  ctx.fillStyle = '#ffffff';
  ctx.font = '700 18px system-ui, sans-serif';
  ctx.fillText(isCompleted ? '—' : `~${ticket.estimatedWaitTime || 15} min`, cardX + 40, currentY + 52);

  // Col 2: Arrive By
  ctx.fillStyle = '#94a3b8';
  ctx.font = '700 9.5px "Courier New", Courier, monospace';
  ctx.letterSpacing = '0.06em';
  ctx.fillText('ARRIVE BY', cardX + 40 + metricColW, currentY + 24);

  ctx.fillStyle = '#ffffff';
  ctx.font = '700 18px system-ui, sans-serif';
  ctx.fillText(ticket.arriveBy || 'On Time', cardX + 40 + metricColW, currentY + 52);

  // Col 3: Total Price
  ctx.fillStyle = '#94a3b8';
  ctx.font = '700 9.5px "Courier New", Courier, monospace';
  ctx.letterSpacing = '0.06em';
  ctx.fillText('TOTAL AMOUNT', cardX + 40 + metricColW * 2, currentY + 24);

  ctx.fillStyle = '#10b981';
  ctx.font = '800 20px system-ui, sans-serif';
  ctx.fillText(`₹${ticket.totalPrice || '0'}`, cardX + 40 + metricColW * 2, currentY + 52);

  // Guest Details
  currentY += boxH + 26;
  ctx.fillStyle = '#64748b';
  ctx.font = '700 10px "Courier New", Courier, monospace';
  ctx.letterSpacing = '0.1em';
  ctx.fillText('GUEST & BOOKING REFERENCE', cardX + 26, currentY);

  currentY += 20;
  ctx.fillStyle = '#ffffff';
  ctx.font = '600 13.5px system-ui, sans-serif';
  const guestInfo = `${ticket.customerName || 'Guest'}${ticket.phone ? ` (+91 ${ticket.phone})` : ''}`;
  ctx.fillText(guestInfo, cardX + 26, currentY);

  currentY += 18;
  ctx.fillStyle = '#64748b';
  ctx.font = '500 11.5px "Courier New", Courier, monospace';
  const bookingTime = new Date(ticket.createdAt || Date.now()).toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });
  ctx.fillText(`Booked: ${bookingTime} · Ref: ${ticket.appointmentId || ticket.ticketNumber || 'VXR-REF'}`, cardX + 26, currentY);

  // Perforated Divider 2
  const notch2Y = cardY + cardH - 120;
  ctx.beginPath();
  ctx.arc(cardX, notch2Y, 12, -Math.PI / 2, Math.PI / 2, false);
  ctx.fillStyle = '#0a0b0e';
  ctx.fill();
  ctx.strokeStyle = '#222736';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(cardX + cardW, notch2Y, 12, Math.PI / 2, -Math.PI / 2, false);
  ctx.fillStyle = '#0a0b0e';
  ctx.fill();
  ctx.strokeStyle = '#222736';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.beginPath();
  ctx.setLineDash([6, 6]);
  ctx.moveTo(cardX + 18, notch2Y);
  ctx.lineTo(cardX + cardW - 18, notch2Y);
  ctx.strokeStyle = '#282d3f';
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.setLineDash([]);

  // Barcode decoration at bottom
  const barcodeY = notch2Y + 20;
  const barcodeH = 34;
  const barcodeStartX = cardX + 70;
  const barcodeTotalW = cardW - 140;

  // Draw simulated barcode stripes
  const stripePattern = [3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 4, 2, 3, 1, 2, 1, 3, 4, 1, 2, 3, 1, 4, 2, 3, 1, 2, 4, 1, 3, 2, 1, 3, 2, 4, 1, 2, 3, 1, 4];
  let curBarX = barcodeStartX;
  ctx.fillStyle = '#cbd5e1';
  for (let i = 0; i < stripePattern.length && curBarX < barcodeStartX + barcodeTotalW; i++) {
    const barW = stripePattern[i] * 1.6;
    if (i % 2 === 0) {
      ctx.fillRect(curBarX, barcodeY, barW, barcodeH);
    }
    curBarX += barW + (i % 3 === 0 ? 3 : 2);
  }

  // Footer text
  ctx.fillStyle = '#64748b';
  ctx.font = '600 10px "Courier New", Courier, monospace';
  ctx.letterSpacing = '0.14em';
  ctx.textAlign = 'center';
  ctx.fillText(`* ${ticket.ticketNumber || 'VEXORA-PASS'} *`, width / 2, barcodeY + barcodeH + 18);

  ctx.fillStyle = '#475569';
  ctx.font = '600 9px system-ui, sans-serif';
  ctx.letterSpacing = '0.1em';
  ctx.fillText('POWERED BY VEXORA REAL-TIME SALON OS · DIGITALLY AUTHENTICATED', width / 2, barcodeY + barcodeH + 34);
  ctx.textAlign = 'left';

  return canvas;
}

/**
 * Generates and triggers download of the ticket receipt as a PNG image.
 */
export function downloadReceiptPng(ticket) {
  if (!ticket) return;

  try {
    const canvas = generateReceiptCanvas(ticket);
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `VEXORA-Receipt-${ticket.ticketNumber || 'Ticket'}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }, 'image/png');
  } catch (err) {
    console.error('[Receipt PNG Generation Failed]', err);
  }
}
