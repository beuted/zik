import { ZikPage } from './app.po';

describe('zik App', () => {
  let page: ZikPage;

  beforeEach(() => {
    page = new ZikPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
