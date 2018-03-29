const styles = {
    heading1: {left: '# '},
    heading2: {left: '## '},
    heading3: {left: '### '},

    bold: {left: '**', right: '**'},
    italic: {left: '_', right: '_'},
    link: {left: '[', right: '](url)'},
    quote: {left: '> ', list: true},

    taskList: {left: '- [ ] ', list: true},
    orderedList: {left: (index = 0) => `${index + 1}. `, list: true},
    bulletedList: {left: '- ', list: true},
};

const value = (value, arg) =>
    typeof value === 'function' ? value(arg) : value;

const escape = string =>
    string
        .split('')
        .map(char => `\\${char}`)
        .join('');

const wrapRegExp = (left, right) => new RegExp(`^${left}(.+)${right}$`);

const word = (text, position) => {
    const spaceBefore = text.slice(0, position).lastIndexOf(' ') + 1;
    const newlinwBefore = text.slice(0, position).lastIndexOf('\n') + 1;

    const start = spaceBefore > newlinwBefore ? spaceBefore : newlinwBefore;
    const end = position + text.slice(position).search(/\s|\n/);

    return text.slice(start === -1 ? 0 : start, end === -1 ? text.length : end);
};

const wordSplit = (text, start, end) => {
    if (start === end) {
        const spaceBefore = text.slice(0, start).lastIndexOf(' ') + 1;
        const newlinwBefore = text.slice(0, start).lastIndexOf('\n') + 1;

        start = spaceBefore > newlinwBefore ? spaceBefore : newlinwBefore;
        const lastMarker = text.slice(start).search(/\s|\n/);

        if (lastMarker !== -1) {
            end = start + lastMarker;
        }
    }

    return [
        text.slice(0, start === -1 ? 0 : start),
        text.slice(end === -1 ? text.length : end),
    ];
};

const isApplied = (text, {left = '', right = ''} = {}) =>
    wrapRegExp(escape(left), escape(right)).test(text);

const wrap = (text, {left = '', right = ''} = {}) => `${left}${text}${right}`;

const unwrap = (text, {left = '', right = ''} = {}) =>
    wrapRegExp(escape(left), escape(right)).exec(text)[1];

const prepareStyle = ({left, right}, arg) => ({
    left: value(left, arg),
    right: value(right, arg),
});

const format = (text, style) =>
    isApplied(text, style) ? unwrap(text, style) : wrap(text, style);

const join = (textBefore, textFormatted, textAfter, isList) => {
    if (isList) {
        const textJoined = [textBefore, textFormatted, textAfter].filter(
            Boolean
        );

        return textJoined.length === 1
            ? textJoined[0]
            : textJoined.map(str => str.replace(/^\n+|\n+$/g, '')).join('\n\n');
    }

    return `${textBefore}${textFormatted}${textAfter}`;
};

const markeddown = (text, action, {start, end}) => {
    const textPlain =
        start === end ? word(text, start) : text.slice(start, end);
    const [textBefore, textAfter] = wordSplit(text, start, end);
    const style = styles[action];

    if (!style) {
        return text;
    }

    const textPlainArray =
        style.list && textPlain.split('\n').length > 1
            ? textPlain.split('\n')
            : [textPlain];

    let textFormatted = textPlainArray
        .map((text, index) => format(text, prepareStyle(style, index)))
        .join('\n');

    return join(textBefore, textFormatted, textAfter, style.list);
};

export default markeddown;
