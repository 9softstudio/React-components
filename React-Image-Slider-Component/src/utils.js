export const mergeClassName = (props, ...classNames) => {
    if (props && props.className) {
        classNames.unshift(props.className);
    }

    return classNames.join(' ');
};