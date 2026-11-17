// Line-art illustrations, drawn as inline SVG at build time.
// They contain no text, numbers or logos: they are abstract diagrams only.
// Pick one in content.yaml with  art: "chart" | "code" | "nodes" | "network" | "sorter" | "dashboard"
// Colours come from CSS (see ".art" in styles.css), so a brand kit restyles them too.

const svg = (w, h, body) =>
  `<svg class="art" viewBox="0 0 ${w} ${h}" fill="none" aria-hidden="true" focusable="false">${body}</svg>`;
const line = (x1, y1, x2, y2, c = 's', extra = '') => `<line class="${c}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"${extra}/>`;
const rect = (x, y, w, h, r, c = 's') => `<rect class="${c}" x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}"/>`;
const circ = (x, y, r, c = 's') => `<circle class="${c}" cx="${x}" cy="${y}" r="${r}"/>`;
const path = (d, c = 's', extra = '') => `<path class="${c}" d="${d}"${extra}/>`;
const DRAW = ' pathLength="1"';

// Data analysis and BI: bars with a trend line.
function chart() {
  const heights = [52, 84, 64, 110, 92, 132, 118];
  let o = '';
  for (const y of [60, 100, 140, 180]) o += line(40, y, 360, y, 's2 dash');
  o += line(40, 200, 360, 200, 's');
  const pts = [];
  heights.forEach((h, i) => {
    const x = 56 + i * 44;
    o += rect(x, 200 - h, 24, h, 5, i === 5 ? 'bt' : 't');
    pts.push([x + 12, 200 - h - 24]);
  });
  o += path('M' + pts.map((p) => p.join(' ')).join(' L'), 'b draw', DRAW);
  pts.forEach((p, i) => {
    o += i === 5 ? circ(p[0], p[1], 10, 'halo') + circ(p[0], p[1], 4.5, 'bf') : circ(p[0], p[1], 3.5, 'kb');
  });
  return svg(400, 240, o);
}

// Software and frontend: an app window with code lines and a component.
function code() {
  let o = rect(48, 30, 304, 180, 14, 't') + line(48, 60, 352, 60, 's');
  o += circ(68, 45, 3.5, 's') + circ(82, 45, 3.5, 's') + circ(96, 45, 3.5, 's');
  o += line(128, 60, 128, 210, 's2');
  [[82, 42, 'wb'], [100, 34, 'w'], [118, 46, 'w'], [136, 28, 'w']].forEach(([y, l, c]) => (o += line(64, y, 64 + l, y, c)));
  [
    [146, 82, 64, 'wb'], [162, 100, 108, 'w'], [162, 118, 80, 'w'], [178, 136, 96, 'w2'],
    [178, 154, 52, 'wb'], [162, 172, 40, 'w'], [146, 190, 28, 'w'],
  ].forEach(([x, y, l, c]) => (o += line(x, y, x + l, y, c)));
  o += rect(290, 128, 48, 64, 10, 'bt') + path('M306 150 l-8 10 8 10 M322 150 l8 10 -8 10', 'b');
  return svg(400, 240, o);
}

// AI and machine learning: a small network with one highlighted route.
function nodes() {
  const layers = [[70, [76, 120, 164]], [150, [54, 98, 142, 186]], [230, [54, 98, 142, 186]], [310, [98, 142]]];
  const hot = new Set(['0-1', '1-2', '2-1', '3-0']);
  let o = '';
  for (let l = 0; l < layers.length - 1; l++) {
    const [x1, ys1] = layers[l];
    const [x2, ys2] = layers[l + 1];
    ys1.forEach((y1, i) =>
      ys2.forEach((y2, j) => {
        const on = hot.has(`${l}-${i}`) && hot.has(`${l + 1}-${j}`);
        o += on ? line(x1, y1, x2, y2, 'b draw', DRAW) : line(x1, y1, x2, y2, 's2');
      })
    );
  }
  o += line(310, 98, 346, 98, 'b draw', DRAW);
  layers.forEach(([x, ys], l) =>
    ys.forEach((y, i) => {
      o += hot.has(`${l}-${i}`) ? circ(x, y, 11, 'halo') + circ(x, y, 6, 'bf') : circ(x, y, 6, 'k');
    })
  );
  o += rect(346, 84, 28, 28, 8, 'bt');
  return svg(400, 240, o);
}

// IT and systems support: devices connected to a hub.
function network() {
  const devices = [[70, 56], [70, 184], [330, 56], [330, 184], [200, 30], [200, 210]];
  let o = circ(200, 120, 84, 's2 dash');
  devices.forEach(([x, y], i) => (o += line(200, 120, x, y, i % 2 ? 's dash flow' : 'b dash flow')));
  devices.forEach(([x, y]) => {
    o += rect(x - 26, y - 18, 52, 36, 9, 'k') + line(x - 14, y - 4, x + 4, y - 4, 'w') + line(x - 14, y + 6, x - 2, y + 6, 'w2') + circ(x + 15, y - 7, 3, 'bf');
  });
  o += circ(200, 120, 24, 'halo') + circ(200, 120, 14, 'kb') + circ(200, 120, 5, 'bf');
  return svg(400, 240, o);
}

// Google Drive organizer: loose documents pass through a classifier into folders.
function sorter() {
  let o = '';
  [[110, 92], [152, 160], [100, 236], [168, 268]].forEach(([x, y]) => (o += path(`M${x} ${y} C ${x + 50} ${y}, 190 170, 232 170`, 's dash flow')));
  [70, 150, 230].forEach((y) => (o += path(`M328 170 C 380 170, 372 ${y + 34}, 424 ${y + 34}`, 'b dash flow')));
  [[52, 56, -8], [96, 128, 6], [44, 206, -4], [112, 238, 10]].forEach(([x, y, r]) => {
    o += `<g transform="rotate(${r} ${x + 27} ${y + 34})">` + rect(x, y, 54, 68, 8, 'k') + line(x + 12, y + 18, x + 42, y + 18, 'w') + line(x + 12, y + 32, x + 36, y + 32, 'w2') + line(x + 12, y + 46, x + 30, y + 46, 'w2') + '</g>';
  });
  o += `<g transform="rotate(45 280 170)">` + rect(244, 134, 72, 72, 16, 'kb') + '</g>';
  o += circ(280, 170, 26, 'halo') + circ(280, 170, 15, 'bt') + circ(280, 170, 5, 'bf');
  [70, 150, 230].forEach((y) => {
    const x = 424;
    o += path(`M${x} ${y + 12} v48 a8 8 0 0 0 8 8 h80 a8 8 0 0 0 8 -8 v-40 a8 8 0 0 0 -8 -8 h-44 l-10 -10 h-26 a8 8 0 0 0 -8 8 z`, 'k');
    o += line(x + 16, y + 34, x + 60, y + 34, 'w') + line(x + 16, y + 48, x + 44, y + 48, 'w2');
  });
  return svg(560, 340, o);
}

// Equipment dashboard: a wireframe report with tiles, a line chart and bars.
function dashboard() {
  let o = rect(40, 24, 480, 292, 16, 't') + line(40, 58, 520, 58, 's');
  o += circ(62, 41, 3.5, 's') + circ(76, 41, 3.5, 's') + circ(90, 41, 3.5, 's') + line(430, 41, 500, 41, 'w2');
  for (let i = 0; i < 4; i++) {
    const x = 56 + i * 114;
    o += rect(x, 72, 104, 54, 10, i === 0 ? 'bt' : 'k') + line(x + 14, 90, x + 50, 90, 'w2') + line(x + 14, 108, x + [70, 58, 76, 46][i], 108, i === 0 ? 'wb' : 'w');
  }
  o += rect(56, 138, 276, 162, 10, 'k');
  for (const y of [176, 212, 248]) o += line(72, y, 316, y, 's2 dash');
  const pts = [[72, 262], [106, 240], [140, 250], [174, 214], [208, 226], [242, 190], [276, 198], [316, 164]];
  const d = 'M' + pts.map((p) => p.join(' ')).join(' L');
  o += path(d + ' L316 284 L72 284 Z', 'area') + path(d, 'b draw', DRAW);
  pts.forEach((p, i) => { if (i % 2 === 1) o += circ(p[0], p[1], 3.5, 'kb'); });
  o += rect(344, 138, 160, 162, 10, 'k');
  [112, 86, 98, 60, 40].forEach((l, i) => (o += line(360, 164 + i * 28, 360 + l, 164 + i * 28, i === 0 ? 'wb thick' : 'w thick')));
  return svg(560, 340, o);
}

// Fallback for projects with no "art" set.
function generic() {
  let o = '';
  for (let i = 0; i < 5; i++) o += rect(280 - 60 - i * 38, 170 - 40 - i * 24, 120 + i * 76, 80 + i * 48, 14 + i * 4, i === 0 ? 'bt' : i < 3 ? 's' : 's2 dash');
  o += circ(280, 170, 5, 'bf');
  return svg(560, 340, o);
}

const ALL = { chart, code, nodes, network, sorter, dashboard, generic };
export const art = (name) => (ALL[name] || generic)();
