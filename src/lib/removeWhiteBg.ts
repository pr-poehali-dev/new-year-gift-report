export type LogoVariant = 'normal' | 'light';

function readFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result as string);
    r.onerror = () => reject(new Error('read'));
    r.readAsDataURL(file);
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const el = new Image();
    el.onload = () => resolve(el);
    el.onerror = () => reject(new Error('decode'));
    el.src = src;
  });
}

export async function removeWhiteBg(file: File, variant: LogoVariant = 'normal', maxSize = 800): Promise<string> {
  const src = await readFile(file);
  if (file.type === 'image/svg+xml') return src;
  const img = await loadImage(src);

  const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
  const w = Math.max(1, Math.round(img.width * scale));
  const h = Math.max(1, Math.round(img.height * scale));
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) return src;
  ctx.drawImage(img, 0, 0, w, h);

  const data = ctx.getImageData(0, 0, w, h);
  const px = data.data;
  let minX = w, minY = h, maxX = -1, maxY = -1;

  for (let i = 0; i < px.length; i += 4) {
    const r = px[i], g = px[i + 1], b = px[i + 2], srcA = px[i + 3] / 255;
    const darkness = 255 - Math.min(r, g, b);
    const a = Math.min(1, Math.max(0, (darkness - 25) / 85)) * srcA;

    let nr = r, ng = g, nb = b;
    if (a > 0 && a < 1) {
      nr = Math.min(255, Math.max(0, (r - 255 * (1 - a)) / a));
      ng = Math.min(255, Math.max(0, (g - 255 * (1 - a)) / a));
      nb = Math.min(255, Math.max(0, (b - 255 * (1 - a)) / a));
    }

    if (variant === 'light' && a > 0) {
      const isRed = nr > ng + 40 && nr > nb + 40;
      if (isRed) {
        nr = 255; ng = 110; nb = 110;
      } else {
        nr = 255; ng = 255; nb = 255;
      }
    }

    px[i] = nr;
    px[i + 1] = ng;
    px[i + 2] = nb;
    px[i + 3] = Math.round(a * 255);

    if (a > 0.05) {
      const p = i / 4;
      const x = p % w;
      const y = (p - x) / w;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }

  ctx.putImageData(data, 0, 0);
  if (maxX < 0) return canvas.toDataURL('image/png');

  const cw = maxX - minX + 1;
  const ch = maxY - minY + 1;
  const out = document.createElement('canvas');
  out.width = cw;
  out.height = ch;
  out.getContext('2d')?.drawImage(canvas, minX, minY, cw, ch, 0, 0, cw, ch);
  return out.toDataURL('image/png');
}
