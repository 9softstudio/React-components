import React from 'react'
import renderer from 'react-test-renderer'

import Pager from '../Pager'

describe('Pager', () => {
    const firstPageIndex = 0;
    const lastPageIndex = 3;
    const prevPageIndex = 1;
    const nextPageIndex = 2;

    describe('render', () => {
        it('component is rendered correctly', () => {
            const props = {
                pageOption: {
                    PageIndex: 1,
                    PageSize: 5,
                    PageList: [5, 10, 20],
                    TotalItem: 10
                }
            };

            const component = renderer.create(<Pager {...props} />);
            const result = component.toJSON();

            expect(result).toMatchSnapshot();
        });

        it('component is hidden if paging is not available', () => {
            const props = {
                pageOption: {
                    PageIndex: 1,
                    PageSize: 5,
                    PageList: [5, 10, 20],
                    TotalItem: 1
                }
            };

            const component = renderer.create(<Pager {...props} />);
            const result = component.toJSON();

            expect(result).toMatchSnapshot();
            expect(result.props.style.display).toBe("none");
        });

        it('_renderPageIcon - first page icon - disable icon if PageIndex is 1', () => {
            const props = {
                pageOption: {
                    PageIndex: 1,
                    PageSize: 5,
                    PageList: [5, 10, 20],
                    TotalItem: 10
                }
            };

            const component = renderer.create(<Pager {...props} />);
            const result = component.toJSON();

            expect(result).toMatchSnapshot();
            expect(component.root.findAllByType('a')[firstPageIndex].props.className).toContain("disable");
        });

        it('_renderPageIcon - first page icon - disable icon if PageIndex is not 1', () => {
            const props = {
                pageOption: {
                    PageIndex: 2,
                    PageSize: 5,
                    PageList: [5, 10, 20],
                    TotalItem: 10
                }
            };

            const component = renderer.create(<Pager {...props} />);
            const result = component.toJSON();

            expect(result).toMatchSnapshot();
            expect(component.root.findAllByType('a')[firstPageIndex].props.className).not.toContain("disable");
        });

        it('_renderPageIcon - last page icon - disable icon if PageIndex is the last', () => {
            const props = {
                pageOption: {
                    PageIndex: 3,
                    PageSize: 5,
                    PageList: [5, 10, 20],
                    TotalItem: 15
                }
            };

            const component = renderer.create(<Pager {...props} />);
            const result = component.toJSON();

            expect(result).toMatchSnapshot();
            expect(component.root.findAllByType('a')[lastPageIndex].props.className).toContain("disable");
        });

        it('_renderPageIcon - last page icon - disable icon if PageIndex is not the last', () => {
            const props = {
                pageOption: {
                    PageIndex: 2,
                    PageSize: 5,
                    PageList: [5, 10, 20],
                    TotalItem: 15
                }
            };

            const component = renderer.create(<Pager {...props} />);
            const result = component.toJSON();

            expect(result).toMatchSnapshot();
            expect(component.root.findAllByType('a')[lastPageIndex].props.className).not.toContain("disable");
        });

        it('_renderPageIcon - previous page icon - disable icon if PageIndex is 1', () => {
            const props = {
                pageOption: {
                    PageIndex: 1,
                    PageSize: 5,
                    PageList: [5, 10, 20],
                    TotalItem: 10
                }
            };

            const component = renderer.create(<Pager {...props} />);
            const result = component.toJSON();

            expect(result).toMatchSnapshot();
            expect(component.root.findAllByType('a')[prevPageIndex].props.className).toContain("disable");
        });

        it('_renderPageIcon - previous page icon - disable icon if PageIndex is not 1', () => {
            const props = {
                pageOption: {
                    PageIndex: 2,
                    PageSize: 5,
                    PageList: [5, 10, 20],
                    TotalItem: 10
                }
            };

            const component = renderer.create(<Pager {...props} />);
            const result = component.toJSON();

            expect(result).toMatchSnapshot();
            expect(component.root.findAllByType('a')[prevPageIndex].props.className).not.toContain("disable");
        });

        it('_renderPageIcon - next page icon - disable icon if PageIndex is the last', () => {
            const props = {
                pageOption: {
                    PageIndex: 3,
                    PageSize: 5,
                    PageList: [5, 10, 20],
                    TotalItem: 15
                }
            };

            const component = renderer.create(<Pager {...props} />);
            const result = component.toJSON();

            expect(result).toMatchSnapshot();
            expect(component.root.findAllByType('a')[nextPageIndex].props.className).toContain("disable");
        });

        it('_renderPageIcon - next page icon - disable icon if PageIndex is not the last', () => {
            const props = {
                pageOption: {
                    PageIndex: 2,
                    PageSize: 5,
                    PageList: [5, 10, 20],
                    TotalItem: 15
                }
            };

            const component = renderer.create(<Pager {...props} />);
            const result = component.toJSON();

            expect(result).toMatchSnapshot();
            expect(component.root.findAllByType('a')[nextPageIndex].props.className).not.toContain("disable");
        });

        it('_renderPageInfo - page info is rendered if isShowPagingInfo is true', () => {
            const props = {
                pageOption: {
                    PageIndex: 1,
                    PageSize: 5,
                    PageList: [5, 10, 20],
                    TotalItem: 10
                },
                isShowPagingInfo: true
            };

            const component = renderer.create(<Pager {...props} />);
            const result = component.toJSON();

            expect(result).toMatchSnapshot();
        });

        it('_renderPageInput - page input is rendered if isAllowInputPageIndex is true', () => {
            const props = {
                pageOption: {
                    PageIndex: 1,
                    PageSize: 5,
                    PageList: [5, 10, 20],
                    TotalItem: 10
                },
                isAllowInputPageIndex: true
            };

            const component = renderer.create(<Pager {...props} />);
            const result = component.toJSON();

            expect(result).toMatchSnapshot();
        });

        it('_renderPageLabel - page lable is rendered if isAllowInputPageIndex is false', () => {
            const props = {
                pageOption: {
                    PageIndex: 1,
                    PageSize: 5,
                    PageList: [5, 10, 20],
                    TotalItem: 10
                },
                isAllowInputPageIndex: false
            };

            const component = renderer.create(<Pager {...props} />);
            const result = component.toJSON();

            expect(result).toMatchSnapshot();
        });
    });

    describe('goToPage', () => {
        it('page index is invalid - do not call onPaging with new input', () => {
            const props = {
                pageOption: {
                    PageIndex: 1,
                    PageSize: 5,
                    PageList: [5, 10, 20],
                    TotalItem: 15
                },
                onPaging: jest.fn()
            };

            const component = renderer.create(<Pager {...props} />);
            let tree = component.toJSON();
            expect(tree).toMatchSnapshot();
            const input = component.root.findByType('input');

            const newIndex = 'a';

            input.props.onChange({ target: { value: newIndex } });
            input.props.onKeyUp({ keyCode: 13 });
            tree = component.toJSON();

            expect(tree).toMatchSnapshot();
            expect(props.onPaging).not.toHaveBeenCalledWith(newIndex, props.pageOption.pageSize);
        });

        it('page size selection is changed - call onPaging', () => {
            const props = {
                pageOption: {
                    PageIndex: 1,
                    PageSize: 5,
                    PageList: [5, 10, 20],
                    TotalItem: 15
                },
                onPaging: jest.fn()
            };

            const component = renderer.create(<Pager {...props} />);
            let tree = component.toJSON();
            expect(tree).toMatchSnapshot();

            component.root.findByType('select').props.onChange({ target: { value: 10 } });
            tree = component.toJSON();

            expect(tree).toMatchSnapshot();
            expect(props.onPaging).toHaveBeenCalled();
        });

        it('page icon is clicked - call onPaging', () => {
            const props = {
                pageOption: {
                    PageIndex: 2,
                    PageSize: 5,
                    PageList: [5, 10, 20],
                    TotalItem: 15
                },
                onPaging: jest.fn()
            };
            const pageSize = 5;
            const totalPage = 3;
            let currentPage = 2;

            const component = renderer.create(<Pager {...props} />);
            const root = component.root;
            let tree = component.toJSON();
            expect(tree).toMatchSnapshot();

            currentPage = 1;
            root.findAllByType('a')[firstPageIndex].props.onClick();
            tree = component.toJSON();
            expect(tree).toMatchSnapshot();
            expect(props.onPaging).toHaveBeenLastCalledWith(currentPage, pageSize);

            currentPage = totalPage;
            root.findAllByType('a')[lastPageIndex].props.onClick();
            tree = component.toJSON();
            expect(tree).toMatchSnapshot();
            expect(props.onPaging).toHaveBeenLastCalledWith(currentPage, pageSize);

            currentPage = 1;
            root.findAllByType('a')[prevPageIndex].props.onClick();
            tree = component.toJSON();
            expect(tree).toMatchSnapshot();
            expect(props.onPaging).toHaveBeenLastCalledWith(currentPage, pageSize);

            currentPage = 3;
            root.findAllByType('a')[nextPageIndex].props.onClick();
            tree = component.toJSON();
            expect(tree).toMatchSnapshot();
            expect(props.onPaging).toHaveBeenLastCalledWith(currentPage, pageSize);
        });
    });

    describe('PageInput', () => {
        it('page size input is changed - value is not a number - disable page icons and page size selection', () => {
            const props = {
                pageOption: {
                    PageIndex: 3,
                    PageSize: 5,
                    PageList: [5, 10, 20],
                    TotalItem: 15
                },
                isAllowInputPageIndex: true
            };

            const component = renderer.create(<Pager {...props} />);
            let tree = component.toJSON();
            const root = component.root;

            root.findByType('input').props.onChange({ target: { value: '' } });
            tree = component.toJSON();

            expect(tree).toMatchSnapshot();
            expect(root.findAllByType('a')[prevPageIndex].props.className).toContain("disable");
            expect(root.findAllByType('a')[nextPageIndex].props.className).toContain("disable");
            expect(root.findByType('select').props.disabled).toBe(true);
        });

        describe('onKeyUpHandle', () => {
            it('page size input is inputted - key code is not 13 - do nothing', () => {
                const props = {
                    pageOption: {
                        PageIndex: 3,
                        PageSize: 5,
                        PageList: [5, 10, 20],
                        TotalItem: 15
                    },
                    onPaging: jest.fn()
                };

                const component = renderer.create(<Pager {...props} />);
                let tree = component.toJSON();
                expect(tree).toMatchSnapshot();

                component.root.findByType('input').props.onKeyUp({ which: 10 });
                tree = component.toJSON();

                expect(tree).toMatchSnapshot();
                expect(props.onPaging).not.toHaveBeenCalled();
            });

            it('page size input is is inputted - key code is 13 - call onPaging', () => {
                const props = {
                    pageOption: {
                        PageIndex: 1,
                        PageSize: 5,
                        PageList: [5, 10, 20],
                        TotalItem: 15
                    },
                    onPaging: jest.fn()
                };

                const component = renderer.create(<Pager {...props} />);
                let tree = component.toJSON();
                expect(tree).toMatchSnapshot();

                component.root.findByType('input').props.onKeyUp({ keyCode: 13 });
                tree = component.toJSON();

                expect(tree).toMatchSnapshot();
                expect(props.onPaging).toHaveBeenCalled();
            });

            it('page size input is is inputted - key code is 13 - index is larger than total page - do notthing', () => {
                const props = {
                    pageOption: {
                        PageIndex: 5,
                        PageSize: 5,
                        PageList: [5, 10, 20],
                        TotalItem: 15
                    },
                    onPaging: jest.fn()
                };

                const component = renderer.create(<Pager {...props} />);
                let tree = component.toJSON();
                expect(tree).toMatchSnapshot();

                component.root.findByType('input').props.onKeyUp({ keyCode: 13 });
                tree = component.toJSON();

                expect(tree).toMatchSnapshot();
                expect(props.onPaging).not.toHaveBeenCalled();
            });
        });
    });

    describe('_updateState', () => {
        it('setState will be called with correct parameter', () => {
            const props = {
                pageOption: {
                    PageIndex: 1,
                    PageSize: 5,
                    PageList: [5, 10, 20],
                    TotalItem: 15
                }
            };
            const inputValue = 1;

            const component = new Pager(props);
            component.setState = jest.fn();

            component._updateState(inputValue);

            expect(component.setState).toHaveBeenLastCalledWith({
                inputValue: 1
            });
        });
    });

    describe('onInputChangeHandler', () => {
        it('input valid value - update state', () => {
            const props = {
                pageOption: {
                    PageIndex: 1,
                    PageSize: 5,
                    PageList: [5, 10, 20],
                    TotalItem: 15
                },
                isAllowInputPageIndex: true
            };
            const inputValue = '2';

            const component = renderer.create(<Pager {...props} />);
            const inputIndex = component.root.findByProps({type: "text"});
            inputIndex.props.onChange({target: {value: inputValue}});

            expect(component.getInstance().state.inputValue).toEqual(inputValue);
        });

        it('input invalid value - not update state', () => {
            const props = {
                pageOption: {
                    PageIndex: 1,
                    PageSize: 5,
                    PageList: [5, 10, 20],
                    TotalItem: 15
                }
            };
            const inputValue = 'a';

            const component = renderer.create(<Pager {...props} />);
            const inputIndex = component.root.findByProps({type: "text"});
            inputIndex.props.onChange({target: {value: inputValue}});

            expect(component.getInstance().state.inputValue).toEqual(props.pageOption.PageIndex);
            });
        });

    describe('onClickHandle', () => {
        it('isDisable - do not call onPaging', () => {
            const props = {
                pageOption: {
                    PageIndex: 1,
                    PageSize: 5,
                    PageList: [5, 10, 20],
                    TotalItem: 15
                },
                onPaging: jest.fn(),
                isAllowInputPageIndex: true
            };

            const component = renderer.create(<Pager {...props} />);

            const firstPage = component.root.findAllByType('a')[firstPageIndex];
            firstPage.props.onClick();

            expect(props.onPaging).not.toHaveBeenCalled();
            expect(firstPage.props.className).toContain("disable");
        });
    });

    describe('componentDidUpdate', () => {
        it('PageIndex is not changed - _updateState is not called', () => { 
            const props = {
                pageOption: {
                    PageIndex: 2,
                    PageSize: 5,
                    PageList: [5, 10, 20],
                    TotalItem: 15
                }
            };
            let component = new Pager(props);
            component._updateState = jest.fn();

            component.componentDidUpdate(props);

            expect(component._updateState).not.toHaveBeenCalled();
        });

        it('PageIndex is changed - state is changed', () => { 
            const props = {
                pageOption: {
                    PageIndex: 2,
                    PageSize: 5,
                    PageList: [5, 10, 20],
                    TotalItem: 15
                }
            };
            let component = new Pager(props);
            component._updateState = jest.fn();

            const prevProps = {
                pageOption: {
                    PageIndex: 1,
                    PageSize: 5,
                    PageList: [5, 10, 20],
                    TotalItem: 15
                }
            };
            component.componentDidUpdate(prevProps);

            expect(component._updateState).toHaveBeenCalled();
        });
    });
});