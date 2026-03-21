import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';

export function renderWithMath(text) {
    if (typeof text !== 'string') return text;

    // Split the string by block math ($$) and inline math ($)
    // This matches $$...$$ or $...$
    const parts = text.split(/(\$\$[\s\S]*?\$\$|\$[\s\S]*?\$)/g);

    return parts.map((part, i) => {
        if (part.startsWith('$$') && part.endsWith('$$')) {
            return (
                <div className="math-block-container" key={i}>
                    <BlockMath math={part.slice(2, -2)} />
                </div>
            );
        }
        if (part.startsWith('$') && part.endsWith('$')) {
            // Small adjustment if they wrote "$ $" spaces inside
            return <InlineMath key={i} math={part.slice(1, -1).trim()} />;
        }

        // Convert newlines in the remaining text into <br> tags
        return part.split('\n').map((line, j) => (
            <React.Fragment key={`${i}-${j}`}>
                {j > 0 && <br />}
                {line}
            </React.Fragment>
        ));
    });
}
