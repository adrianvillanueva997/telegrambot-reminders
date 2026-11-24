const { test, mock, afterEach } = require('node:test');
const assert = require('node:assert/strict');
const { getSpanishPublicHolidayTelegram } = require('../dist/publicHolidays');

const originalFetch = global.fetch;
afterEach(() => {
  global.fetch = originalFetch;
  mock.timers.reset();
});

function api(date, holidays) {
  mock.timers.enable({ apis: ['Date'], now: new Date(date) });
  global.fetch = async (url) => ({
    ok: true,
    json: async () => url.includes('/Subdivisions?')
      ? [{ code: 'ES-AN', name: [{ text: 'Andalucía' }], children: [{ code: 'ES-AN-MA', name: [{ text: 'Málaga' }] }] },
         { code: 'ES-AR', name: [{ text: 'Aragón' }] }]
      : holidays,
  });
}

function holiday(startDate, name, subdivisions, nationwide = false) {
  return { startDate, name: [{ text: name }], nationwide, subdivisions: subdivisions?.map(code => ({ code })) };
}

test('padded single-digit dates include all regional holidays and nested subdivisions', async () => {
  api('2026-06-08T12:00:00', [
    holiday('2026-06-09', 'fiesta uno', ['ES-AN-MA']),
    holiday('2026-06-09', 'fiesta dos', ['ES-AR', 'ES-AN']),
    holiday('2026-06-10', 'otro día', ['ES-AR']),
  ]);
  assert.equal(await getSpanishPublicHolidayTelegram(),
    '📅 *Mañana es Fiesta uno* en _Málaga_\n\n🔔 Acuérdate de quitar la alarma 🙏\n\n📅 *Mañana es Fiesta dos* en _Andalucía_ y _Aragón_\n\n🔔 Acuérdate de quitar la alarma 🙏');
});

test('year rollover requests tomorrow’s year and finds nationwide holiday', async () => {
  api('2025-12-31T12:00:00', [holiday('2026-01-01', 'año nuevo', undefined, true)]);
  const fetch = global.fetch;
  global.fetch = (url) => {
    if (url.includes('/PublicHolidays?')) assert.match(url, /validFrom=2026-01-01&validTo=2026-12-31/);
    return fetch(url);
  };
  assert.equal(await getSpanishPublicHolidayTelegram(), '📅 *Mañana es Año nuevo*\n\n🔔 Acuérdate de quitar la alarma 🙏');
});

test('returns null when no matching holiday can be resolved', async () => {
  api('2026-02-27T12:00:00', [holiday('2026-02-28', 'fiesta', ['unknown'])]);
  assert.equal(await getSpanishPublicHolidayTelegram(), null);
});

test('an unresolved holiday does not hide another holiday on the same day', async () => {
  api('2026-04-22T12:00:00', [
    holiday('2026-04-23', 'desconocida', ['unknown']),
    holiday('2026-04-23', 'día de Aragón', ['ES-AR']),
  ]);
  assert.match(await getSpanishPublicHolidayTelegram(), /Día de Aragón\* en _Aragón_/);
});

test('returns null when either API request fails', async () => {
  api('2026-04-22T12:00:00', []);
  global.fetch = async () => ({ ok: false });
  assert.equal(await getSpanishPublicHolidayTelegram(), null);
  global.fetch = async (url) => url.includes('/Subdivisions?')
    ? { ok: true, json: async () => [] }
    : { ok: false };
  assert.equal(await getSpanishPublicHolidayTelegram(), null);
});
