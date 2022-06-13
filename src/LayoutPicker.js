import { useState } from 'react';

function LayoutPicker() {
  const [selected, setSelected] = useState('The Cozy Cabin');
  const [hovered, setHovered] = useState(null);
  const imgMap = {
    'The Cozy Cabin': '/layout-cabin.png',
    'The Adventurers': '/layout-adventure.png',
    'The Entrepreneur': '/layout-entrepreneur.png',
  };
  return (
    <>
      <aside className='cardlike'>
        <MenuItem price={100} title='The Cozy Cabin' selected={selected} onSelect={setSelected} onHover={setHovered}></MenuItem>
        <MenuItem price={100} title='The Adventurers' selected={selected} onSelect={setSelected} onHover={setHovered}></MenuItem>
        <MenuItem price={100} title='The Entrepreneur' selected={selected} onSelect={setSelected} onHover={setHovered}></MenuItem>
        <p>{hovered}</p>
      </aside>
      <section className='layout-picker-image cardlike'>
        <img className='layout-selected' src={imgMap[selected]} />
        {hovered && <img className='layout-ghost' src={imgMap[hovered]} />}
      </section>
    </>
  )
}

function MenuItem({ title, price, selected, onHover=()=>{}, onSelect=()=>{} }) {
  const isSelected = selected === title ? 'selected' : '';
  const classList = ['cardlike', 'light', 'menu-item', isSelected].join(" ");
  return (
    <div className={classList} onClick={() => onSelect(title)} onMouseOver={() => onHover(title)} onMouseOut={() => onHover(null)}>
    <h3>{title}</h3>
    <p>${price}</p>
    </div>
  )
}

export default LayoutPicker;
