import { useState } from 'react';
import { conceptData } from '../data/concepts';
import { renderWithMath } from '../components/Math';

export default function Concepts() {
  return (
    <>
      <h1 className="h1">Conceptual Discovery</h1>
      <p className="sub">Core intuitions behind every exam topic. Queueing first, then inventory — matching exam order.</p>

      {conceptData.map((category, idx) => (
        <div key={idx}>
          <h2 className="h2">{category.category}</h2>
          {category.items.map((item, idj) => {
            if (item.type === 'intro') return <p className="concepts-intro" key={idj}>{item.content}</p>;
            if (item.type === 'heading') return <h3 className="h3" key={idj}>{item.title}</h3>;
            if (item.type === 'concept') return <div className="cb cb-concept" key={idj}><span className="ct">{item.title}</span><p>{renderWithMath(item.official)}</p></div>;
            if (item.type === 'tip') return <Tip key={idj}>{item.content}</Tip>;
            if (item.type === 'warn') return <Warn key={idj}>{item.content}</Warn>;
            if (item.type === 'card') return <ConceptCard key={idj} {...item} />;
            return null;
          })}
        </div>
      ))}
    </>
  );
}

function ConceptCard({ title, official, dumb }) {
  const [openOff, setOpenOff] = useState(true);
  const [openDumb, setOpenDumb] = useState(false);

  return (
    <div className="cc">
      <h4>{title}</h4>
      <div className="cc-collapse">
        <button className={`cc-toggle ${openOff ? 'open' : ''}`} onClick={() => setOpenOff(!openOff)}>
          <span className="chevron">▶</span> Official Excerpt
        </button>
        {openOff && <div className="cc-content">{renderWithMath(official)}</div>}
      </div>
      <div className="cc-collapse">
        <button className={`cc-toggle dumb-mode ${openDumb ? 'open' : ''}`} onClick={() => setOpenDumb(!openDumb)}>
          <span className="chevron">▶</span> Dumb MBA Translation
        </button>
        {openDumb && <div className="cc-content dumb-text">{renderWithMath(dumb)}</div>}
      </div>
    </div>
  );
}

function Tip({ children }) {
  return <div className="cb cb-tip"><span className="ct">Exam tip</span><p>{children}</p></div>;
}

function Warn({ children }) {
  return <div className="cb cb-warn"><span className="ct">Warning</span><p>{children}</p></div>;
}
