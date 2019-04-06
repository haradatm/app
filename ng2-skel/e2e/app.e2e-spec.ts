import { Ng2SkelPage } from './app.po';

describe('ng2-skel App', function() {
  let page: Ng2SkelPage;

  beforeEach(() => {
    page = new Ng2SkelPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
