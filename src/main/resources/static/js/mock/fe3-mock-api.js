const MOCK_ORDERS = [
  { orderId: 'DH001', status: 'Chờ thanh toán', totalAmount: 1000000,
    createdAt: '2026-10-20T09:30:00', paymentAt: null,
    items: [{ ticketId: 'V001', ticketName: 'VIP', eventName: 'Đêm nhạc Mùa Thu', price: 500000, quantity: 2 }] },
  { orderId: 'DH002', status: 'Đã thanh toán', totalAmount: 300000,
    createdAt: '2026-10-18T14:00:00', paymentAt: '2026-10-18T14:05:00',
    items: [{ ticketId: 'V002', ticketName: 'Thường', eventName: 'Lễ hội Ẩm thực', price: 150000, quantity: 2 }] },
  { orderId: 'DH003', status: 'Đã hủy', totalAmount: 500000,
    createdAt: '2026-10-10T08:00:00', paymentAt: null,
    items: [{ ticketId: 'V001', ticketName: 'VIP', eventName: 'Đêm nhạc Mùa Thu', price: 500000, quantity: 1 }] }
];

const MOCK_EVENTS = [
  { eventId: 'SK01', eventName: 'Đêm nhạc Mùa Thu', organizerName: 'Công ty ABC', createType: null, status: 'PENDING' },
  { eventId: 'SK02', eventName: 'Lễ hội Ẩm thực', organizerName: 'Công ty XYZ', createType: 'YEARLY', status: 'APPROVED' },
  { eventId: 'SK03', eventName: 'Hội chợ Sách', organizerName: 'Công ty ABC', createType: 'MONTHLY', status: 'REJECTED' }
];

function mockApi(method, url, body) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      try { resolve(handleMock(method, url, body)); } catch (e) { reject(e); }
    }, 300);
  });
}

function handleMock(method, url, body) {
  if (method === 'GET' && url.startsWith('/api/orders/me')) {
  const status = new URLSearchParams(url.split('?')[1] || '').get('status');
  return status ? MOCK_ORDERS.filter(o => o.status === status) : MOCK_ORDERS;
}
  const m = url.match(/^\/api\/orders\/(\w+)$/);
  if (method === 'GET' && m) return MOCK_ORDERS.find(o => o.orderId === m[1]);

  if (method === 'POST' && url === '/api/orders') return MOCK_ORDERS[0];

  if (/\/(pay|cancel|approve|reject)$/.test(url)) return null;

  if (method === 'GET' && url.startsWith('/api/admin/events')) return MOCK_EVENTS;

  throw new Error('Mock chưa có: ' + method + ' ' + url);
}