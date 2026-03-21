import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';

export function renderWithMath(text) {
    if (typeof text !== 'string') return text;

    // Split the string by block math ($$...$$) and inline math ($...$)
    // Inline math must NOT span newlines to avoid false matches
    const parts = text.split(/(\$\$[\s\S]*?\$\$|\$[^$\n]+?\$)/g);

    return parts.map((part, i) => {
        if (part.startsWith('$$') && part.endsWith('$$')) {
            return (
                <div className="math-block-container" key={i}>
                    <BlockMath math={part.slice(2, -2)} renderError={(error) => <span style={{color:'var(--red)', fontSize: '12px'}}>{error.message}</span>} />
                </div>
            );
        }
        if (part.startsWith('$') && part.endsWith('$')) {
            return <InlineMath key={i} math={part.slice(1, -1).trim()} renderError={(error) => <span style={{color:'var(--red)', fontSize: '12px'}}>{error.message}</span>} />;
        }

        // Convert newlines and **bold** in the remaining text
        return part.split('\n').map((line, j) => {
            const boldParts = line.split(/(\*\*[^*]+\*\*)/g);
            const rendered = boldParts.map((seg, k) => {
                if (seg.startsWith('**') && seg.endsWith('**')) {
                    return <strong key={k}>{seg.slice(2, -2)}</strong>;
                }
                return seg;
            });
            return (
                <React.Fragment key={`${i}-${j}`}>
                    {j > 0 && <br />}
                    {rendered}
                </React.Fragment>
            );
        });
    });
}
