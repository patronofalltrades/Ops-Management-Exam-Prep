import React from 'react';
import katex from 'katex';

function renderKatex(math, displayMode = false) {
    try {
        const html = katex.renderToString(math, {
            displayMode,
            throwOnError: false,
            strict: 'ignore',
            trust: true,
        });
        return <span dangerouslySetInnerHTML={{ __html: html }} />;
    } catch (e) {
        return <span style={{ color: 'var(--red)', fontSize: '12px' }}>{e.message}</span>;
    }
}

export function renderWithMath(text) {
    if (typeof text !== 'string') return text;

    // Split the string by block math ($$...$$) and inline math ($...$)
    // Inline math must NOT span newlines to avoid false matches
    const parts = text.split(/(\$\$[\s\S]*?\$\$|\$[^$\n]+?\$)/g);

    return parts.map((part, i) => {
        if (part.startsWith('$$') && part.endsWith('$$')) {
            return (
                <div className="math-block-container" key={i}>
                    {renderKatex(part.slice(2, -2), true)}
                </div>
            );
        }
        if (part.startsWith('$') && part.endsWith('$')) {
            return <React.Fragment key={i}>{renderKatex(part.slice(1, -1).trim(), false)}</React.Fragment>;
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
