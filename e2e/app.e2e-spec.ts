import { AngularTableListPage } from './app.po';

describe('angular-table-list App', () => {
  let page: AngularTableListPage;

  beforeEach(() => {
    page = new AngularTableListPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
