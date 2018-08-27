import React from 'react';

export default React.createContext({
    currentSlideIndex: 0,
    onLeftArrowClick: () => { },
    onRightArrowClick: () => { },
    onTopArrowClick: () => { },
    onBottomArrowClick: () => { },
    onImageClick: (imageIndex) => { }
});