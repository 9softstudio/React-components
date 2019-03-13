import React from 'react'
import renderer from 'react-test-renderer'

import Page from '../Page'

describe('Page ', () => {
    const firstPageIndex = 0;
    const lastPageIndex = 4;
    const prevPageIndex = 1;
    const nextPageIndex = 3;
    const pageSize = 5;
    const pageInput = 2;

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

            const component = renderer.create(<Page {...props} />);
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

            const component = renderer.create(<Page {...props} />);
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

            const component = renderer.create(<Page {...props} />);
            const result = component.toJSON(); 
        
            expect(result).toMatchSnapshot();
            expect(result.children[firstPageIndex].props.className).toContain("disable"); 
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

            const component = renderer.create(<Page {...props} />);
            const result = component.toJSON(); 
        
            expect(result).toMatchSnapshot();
            expect(result.children[firstPageIndex].props.className).not.toContain("disable"); 
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

            const component = renderer.create(<Page {...props} />);
            const result = component.toJSON(); 
        
            expect(result).toMatchSnapshot();
            expect(result.children[lastPageIndex].props.className).toContain("disable"); 
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

            const component = renderer.create(<Page {...props} />);
            const result = component.toJSON(); 
        
            expect(result).toMatchSnapshot();
            expect(result.children[lastPageIndex].props.className).not.toContain("disable"); 
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

            const component = renderer.create(<Page {...props} />);
            const result = component.toJSON(); 
        
            expect(result).toMatchSnapshot();
            expect(result.children[prevPageIndex].props.className).toContain("disable"); 
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

            const component = renderer.create(<Page {...props} />);
            const result = component.toJSON(); 
        
            expect(result).toMatchSnapshot();
            expect(result.children[prevPageIndex].props.className).not.toContain("disable"); 
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

            const component = renderer.create(<Page {...props} />);
            const result = component.toJSON(); 
        
            expect(result).toMatchSnapshot();
            expect(result.children[nextPageIndex].props.className).toContain("disable"); 
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

            const component = renderer.create(<Page {...props} />);
            const result = component.toJSON(); 
        
            expect(result).toMatchSnapshot();
            expect(result.children[nextPageIndex].props.className).not.toContain("disable"); 
        });
    });

    describe('componentWillReceiveProps', () => {
        it('props is not changed - _updateState is not called', () => { 
            const props = {
                pageOption: {
                    PageIndex: 2,
                    PageSize: 5,
                    PageList: [5, 10, 20],
                    TotalItem: 15
                }
            };
            let component = new Page(props);
            component._updateState = jest.fn();

            component.componentWillReceiveProps(props);

            expect(component._updateState).not.toHaveBeenCalled();
        });

        it('props is changed - state is changed', () => { 
            const props = {
                pageOption: {
                    PageIndex: 2,
                    PageSize: 5,
                    PageList: [5, 10, 20],
                    TotalItem: 15
                }
            };
            let component = new Page(props);
            component._updateState = jest.fn();

            const newProps = {
                pageOption: {
                    PageIndex: 1,
                    PageSize: 5,
                    PageList: [5, 10, 20],
                    TotalItem: 15
                }
            };
            component.componentWillReceiveProps(newProps);

            expect(component._updateState).toHaveBeenCalled();
        });
    });

    describe('goToPage', () => {
        it('page index is invalid - do not call onPaging', () => {
            const props = {
                pageOption: {
                    PageIndex: 1,
                    PageSize: 5,
                    PageList: [5, 10, 20],
                    TotalItem: 15
                },
                onPaging: jest.fn()
            };

            const component = renderer.create(<Page {...props} />);
            let tree = component.toJSON();         
            expect(tree).toMatchSnapshot();     

            tree.children[pageInput].children[1].props.onChange({ target: { value: 'a' } });           
            tree.children[pageInput].children[1].props.onKeyUp({ keyCode: 13 });     
            tree = component.toJSON();

            expect(tree).toMatchSnapshot();
            expect(props.onPaging).not.toHaveBeenCalled();
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

            const component = renderer.create(<Page {...props} />);
            let tree = component.toJSON();         
            expect(tree).toMatchSnapshot();     

            tree.children[pageSize].props.onChange({ target: { value: 10 } });           
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

            const component = renderer.create(<Page {...props} />);
            let tree = component.toJSON();
            expect(tree).toMatchSnapshot();

            currentPage = 1;
            tree.children[firstPageIndex].props.onClick();
            tree = component.toJSON();    
            expect(tree).toMatchSnapshot();
            expect(props.onPaging).toHaveBeenLastCalledWith(currentPage, pageSize);

            currentPage = totalPage;
            tree.children[lastPageIndex].props.onClick();
            tree = component.toJSON();    
            expect(tree).toMatchSnapshot();
            expect(props.onPaging).toHaveBeenLastCalledWith(currentPage, pageSize);

            currentPage = 1;
            tree.children[prevPageIndex].props.onClick();
            tree = component.toJSON();    
            expect(tree).toMatchSnapshot();
            expect(props.onPaging).toHaveBeenLastCalledWith(currentPage, pageSize);

            currentPage = 3;
            tree.children[nextPageIndex].props.onClick();
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
                }
            };

            const component = renderer.create(<Page {...props} />);
            let tree = component.toJSON();              

            tree.children[pageInput].children[1].props.onChange({ target: { value: 'a' } });           
            tree = component.toJSON();     

            expect(tree).toMatchSnapshot();
            expect(tree.children[prevPageIndex].props.className).toContain("disable"); 
            expect(tree.children[nextPageIndex].props.className).toContain("disable"); 
            expect(tree.children[pageSize].props.disabled).toBe(true); 
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

                const component = renderer.create(<Page {...props} />);
                let tree = component.toJSON();         
                expect(tree).toMatchSnapshot();     

                tree.children[pageInput].children[1].props.onKeyUp({ which: 10 });           
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

                const component = renderer.create(<Page {...props} />);
                let tree = component.toJSON();         
                expect(tree).toMatchSnapshot();     

                tree.children[pageInput].children[1].props.onKeyUp({ keyCode: 13 });           
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

                const component = renderer.create(<Page {...props} />);
                let tree = component.toJSON();         
                expect(tree).toMatchSnapshot();     

                tree.children[pageInput].children[1].props.onKeyUp({ keyCode: 13 });           
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

            const component = new Page(props);
            component.setState = jest.fn();

            component._updateState(inputValue);

            expect(component.setState).toHaveBeenLastCalledWith({
                inputValue: 1
            });
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
                onPaging: jest.fn()
            };

            const component = renderer.create(<Page {...props} />);
            let tree = component.toJSON();             

            tree.children[firstPageIndex].props.onClick();           
            tree = component.toJSON();     

            expect(props.onPaging).not.toHaveBeenCalled();
            expect(tree.children[firstPageIndex].props.className).toContain("disable");
        });
    });
});