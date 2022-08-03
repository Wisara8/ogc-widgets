const data = {
  quoteNumber: 4501,
  customerName: 'Cam Loftus',
  customerEmail: 'camloftus@gmail.com',
  customerPhone: 7781234567,
  grandTotal: '102000-135000',
  requiresVehicle: true,
  configuration: [
    { base: [{ chassisExtended: 25320 }, { layout2: 0 }, { shellMod: 0 }, { subTotal: 25320 }] },
    { roofSkylights: [{ maxxFanDeluxe: '1150-1390' }, { maxxFanDome: '660' }, { subTotal: '1750-1990' }] }
  ],
  customerComments: "I want a satelite dish"
};

function summaryTableBuilder(row) {
  let tableSection = [];
  tableSection.push(<tr>row.key</tr>);
  row.value.forEach(selection => {
    tableSection.push(
      <tr><td>''</td><td>selection.key</td><td>selection.value</td></tr>)
  });
  return tableSection;
}

const report =
  <section>
    <h1>Quote #${data.quoteNumber}</h1>
    <h2>Customer: ${data.customerName}</h2>
    <h3>Client Information</h3>
    Name: ${data.customerName}
    Email: ${data.customerEmail}
    Phone: ${data.customerPhone}
    Estimate: $ ${data.gramdTotal}
    <h2>Order Information</h2>
    Requires Vehicle? ${data.requiresVehicle}
    <table>
      <thead>
        <tr>
          <th>Category</th>
          <th>Selection</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {data.configuration.forEach(row => summaryTableBuilder(row))}
      </tbody>
    </table>
    <h1>${data.grandTotal}</h1>
    Customer Comments: ${data.customerComments}
  </section>
  ;