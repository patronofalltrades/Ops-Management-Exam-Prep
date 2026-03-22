import { useState, lazy, Suspense } from 'react';
import { conceptData } from '../data/concepts';
import { renderWithMath } from '../components/Math';

const UtilizationCurve = lazy(() => import('../components/diagrams/UtilizationCurve'));
const EOQCostCurve = lazy(() => import('../components/diagrams/EOQCostCurve'));

const DIAGRAMS = {
  'utilization-curve': UtilizationCurve,
  'eoq-cost-curve': EOQCostCurve,
}

export default function Concepts() {
  return (
    <>
      <h1 className="h1">Conceptual Discovery</h1>
      <p className="sub">Core intuitions behind every exam topic. Click any card to expand. Queueing → Capacity → Inventory.</p>

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
            if (item.type === 'diagram') {
              const Comp = DIAGRAMS[item.id];
              return Comp ? <Suspense key={idj} fallback={<div style={{padding:20,textAlign:'center',color:'var(--tx3)'}}>Loading chart...</div>}><Comp /></Suspense> : null;
            }
            return null;
          })}
        </div>
      ))}
    </>
  );
}

function ConceptCard({ title, official, dumb, example }) {
  const [open, setOpen] = useState(false);
  const [openDumb, setOpenDumb] = useState(false);
  const [openExample, setOpenExample] = useState(false);

  return (
    <div className={`cc cc-collapsible${open ? ' cc-expanded' : ''}`}>
      <button className="cc-title-toggle" onClick={() => setOpen(o => !o)}>
        <span className="cc-title-chevron">{open ? '▾' : '▸'}</span>
        <h4>{title}</h4>
      </button>

      {open && (
        <div className="cc-body">
          <div className="cc-official">
            {renderWithMath(official)}
          </div>

          {dumb && (
            <div className="cc-collapse">
              <button className={`cc-toggle dumb-mode ${openDumb ? 'open' : ''}`} onClick={() => setOpenDumb(!openDumb)}>
                <span className="chevron">▶</span> Dumb MBA Translation
              </button>
              {openDumb && <div className="cc-content dumb-text">{renderWithMath(dumb)}</div>}
            </div>
          )}

          {example && (
            <div className="cc-collapse">
              <button className={`cc-toggle cc-example-toggle ${openExample ? 'open' : ''}`} onClick={() => setOpenExample(!openExample)}>
                <span className="chevron">▶</span> Practice Problem
              </button>
              {openExample && (
                <div className="cc-content cc-example-content">
                  <div className="cc-example-story">
                    <span className="cc-example-label">Story</span>
                    <div>{renderWithMath(example.story)}</div>
                  </div>
                  <ExampleReveal label="Translation — What is this really asking?" content={example.translate} />
                  <ExampleReveal label="Solution" content={example.solve} isAnswer />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ExampleReveal({ label, content, isAnswer }) {
  const [show, setShow] = useState(false);
  return (
    <div className={`cc-example-reveal${isAnswer ? ' cc-example-reveal-answer' : ''}`}>
      <button className="cc-example-reveal-btn" onClick={() => setShow(s => !s)}>
        <span style={{ fontSize: 10 }}>{show ? '▾' : '▸'}</span> {label}
      </button>
      {show && (
        <div className={`cc-example-reveal-content${isAnswer ? ' cc-example-a' : ''}`}>
          {renderWithMath(content)}
        </div>
      )}
    </div>
  );
}

function Tip({ children }) {
  return <div className="cb cb-tip"><span className="ct">Exam tip</span><p>{children}</p></div>;
}

function Warn({ children }) {
  return <div className="cb cb-warn"><span className="ct">Warning</span><p>{children}</p></div>;
}
