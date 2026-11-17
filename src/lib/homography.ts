// Projective map of four points to four points, as a CSS matrix3d string. Used to lay a flat grid of
// roof panels onto the roof quad of the hero image, so it sits in correct perspective at every size.

type Pt = readonly [number, number];

/** Solve the 3x3 homography taking src[i] to dst[i] (4 points each); returns its eight coefficients (the ninth is 1). */
function solve(src: readonly Pt[], dst: readonly Pt[]): number[] {
  const A: number[][] = [];
  const b: number[] = [];
  for (let i = 0; i < 4; i++) {
    const [x, y] = src[i];
    const [u, v] = dst[i];
    A.push([x, y, 1, 0, 0, 0, -x * u, -y * u]);
    b.push(u);
    A.push([0, 0, 0, x, y, 1, -x * v, -y * v]);
    b.push(v);
  }
  for (let i = 0; i < 8; i++) {
    // gaussian elimination with partial pivoting
    let p = i;
    for (let r = i + 1; r < 8; r++) if (Math.abs(A[r][i]) > Math.abs(A[p][i])) p = r;
    [A[i], A[p]] = [A[p], A[i]];
    [b[i], b[p]] = [b[p], b[i]];
    for (let r = i + 1; r < 8; r++) {
      const f = A[r][i] / A[i][i];
      for (let c = i; c < 8; c++) A[r][c] -= f * A[i][c];
      b[r] -= f * b[i];
    }
  }
  const h = new Array<number>(8);
  for (let i = 7; i >= 0; i--) {
    let s = b[i];
    for (let c = i + 1; c < 8; c++) s -= A[i][c] * h[c];
    h[i] = s / A[i][i];
  }
  return h;
}

/** The same solve as a function: maps a grid point to its screen point. Used to draw the roof panels on a canvas. */
export function projector(src: readonly Pt[], dst: readonly Pt[]): (x: number, y: number) => Pt {
  const [a, b, c, d, e, f, g, h] = solve(src, dst);
  return (x, y) => {
    const w = g * x + h * y + 1;
    return [(a * x + b * y + c) / w, (d * x + e * y + f) / w];
  };
}

/** The same solve as a CSS `matrix3d(...)` string. */
export function homography(src: readonly Pt[], dst: readonly Pt[]): string {
  const [a, bb, c, d, e, f, g, hh] = solve(src, dst);
  return `matrix3d(${a},${d},0,${g}, ${bb},${e},0,${hh}, 0,0,1,0, ${c},${f},0,1)`;
}
