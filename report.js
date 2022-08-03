const data = {
  quoteNumber: 4501,
  customerName: 'Cam Loftus',
  customerEmail: 'camloftus@gmail.com',
  customerPhone: '778-123-4567',
  grandTotal: [105000, 135000], // take first or take last (will take the same number if an array of one)
  requiresVehicle: true,
  // configuration: [
  //   { key: 'Base', values: [{ chassisExtended: 25320 }, { layout2: [0] }, { shellMod: [0] }, { subTotal: 25320 }] },
  //   { key: 'Roof Skylights', values: [{ maxxFanDeluxe: [1150, 1390] }, { maxxFanDome: [660] }, { subTotal: [1750, 1990] }] }
  // ],
  selections: [
    { name: "Chassis Extended", price: [25320], category: "Base" },
    { name: "Layout 2", price: [0], category: "Base" },
    { name: "Maxx Fan Deluxe", price: [1150, 1390], category: "Roof Sky Light" },
    { name: "Maxx Dome", price: [600], category: "Roof Sky Light" }
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

({
  selections: [{ id: 555, placement: 'North', }, { id: 1212, voltage: 'a hundred?', quantity: 6 }],
  selectables: [
    { id: 555, name: 'Maxx Fan Deluxe', price: [1150, 1390], category: ['Base', 'VanCompass', 'Layout 3'] },
    { id: 1212, name: 'Maxx Fan Dome', price: [660], category: 'Base' },
  ],
})

selections.map(s => ({ ...s, ...selectables.find(_s => _s.id === s.id) }));

// make a new object with the keys of both selections and selectables
// new object has all the keys of selections then matches id in selctions to selectables and add the new keys in also overwriting the existing keys like "keys"
// From Spreadsheet

const incomingObj = {
  selectables: [
    { id: 1001, name: "Short Wheel Base", price: [20613], category: ['Chassis'], component: 'ShortWheelBaseDescription' },
    { id: 1002, name: "Long Wheel Base", price: [23813], category: ['Chassis'], component: 'LongWheelBaseDescription' },
    { id: 1003, name: "Extended Wheel Base", price: [25913], category: ['Chassis'], component: 'ExtendedWheelBaseDescription' },
    { id: 1004, name: "Maxx Fan Deluxe", price: [1150, 1390], category: ['Roof Fans & Skylights'], component: 'DeluxeDescription' },
    { id: 1005, name: "Maxx Fan Dome", price: [600], category: ['Roof Fans & Skylights'], component: 'DomeDescription' },
    { id: 1006, name: "Basic", price: [0], category: ["Electrical"], component: 'BasicElectricalLayout' },
    { id: 1007, name: "Tier 1", price: [0], category: ["Electrical"], component: 'Tier1ElectricalLayout' },
    { id: 1008, name: "Tier 2", price: [20000], category: ["Electrical"], component: 'Tier2ElectricalLayout' },
    { id: 1009, name: "Tier 3", price: [25000], category: ["Electrical"], component: 'Tier3ElectricalLayout' },
    { id: 1010, name: "Heat Only", price: [2430], category: ["Heat / Hot Water"], component: 'HeatOnlyLayout' },
    { id: 1011, name: "Airtronic 12V heater", price: [3850], category: ["Heat / Hot Water"], component: 'AirtronicLayout' },
    { id: 1012, name: "VLT Siesta System", price: [10140], category: ["Heat / Hot Water"], component: 'SiestaLayout' },
    { id: 1013, name: "VLT Roman System", price: [18393], category: ["Heat / Hot Water"], component: 'RomanLayout' },
  ]
}