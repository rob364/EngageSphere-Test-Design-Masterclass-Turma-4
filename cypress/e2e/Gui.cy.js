describe("EngageSphere GUI", () => {
  beforeEach(() => {
    cy.setCookie('cookieConsent', 'accepted');
    cy.visit("/");
  });
  it("Recupera clientes com sucesso e mantém os filtros ao voltar da visualização de detalhes do cliente *)", () => {
    cy.get('[data-testid="size-filter"]').select('Small');
    cy.contains('button', 'View').click();
    cy.contains('button', 'Back').click();
    cy.get('[data-testid="size-filter"]').should('have.value', 'Small');
  });
  it('exibe o rodapé com o texto e links corretos', () => {
    cy.get('[data-testid="footer"]').should('be.visible')
    cy.get('[data-testid="footer"]').contains('Copyright 2025 - Talking About Testing')
    // Verifica os links
    const links = [
      { text: 'Blog', href: 'https://talkingabouttesting.com' },
      { text: 'Courses', href: 'https://talking-about-testing.vercel.app/' },
      { text: 'Podcast', href: 'https://open.spotify.com/show/5HFlqWkk6qtgJquUixyuKo' },
      { text: 'YouTube', href: 'https://youtube.com/@talkingabouttesting' }
    ]
    links.forEach(link => {
      cy.get('[data-testid="footer"]')
        .contains('a', link.text)
        .should('have.attr', 'href', link.href)
        .and('have.attr', 'target', '_blank') // Garante que o link abre em nova aba
    })
  })
  it('exibe a saudação padrão "Hi there!" quando nenhum nome é fornecido', () => {
    cy.get('[data-testid="name"]').type('Joe')
    cy.get('[data-testid="table"]')
      .find('h2')
      .should('contain.text', 'Hi Joe')
  })
  it("Retorna à lista de clientes ao clicar no botão Voltar", () => {
    cy.contains('button', 'View').click();
    cy.contains('button', 'Back').click();
    cy.url().should("eq", "http://localhost:3000/");
    
  });
  describe("Filtragem por tamanho", () => {
    const filtros = ['Small', 'Medium', 'Enterprise', 'Large Enterprise', 'Very Large Enterprise'];
    filtros.forEach((filtro) => {
      it(`Deve filtrar por ${filtro} e garantir que o filtro permanece ao voltar`, () => {
        cy.get('[data-testid="size-filter"]').select(filtro);
        cy.contains('button', 'View').click();
        cy.contains('button', 'Back').click();
        cy.get('[data-testid="size-filter"]').should('have.value', filtro);
      });
    });
  });
  describe("Filtragem por indústria", () => {
    const industrias = ['Logistics', 'Retail', 'Technology', 'HR', 'Finance'];
    industrias.forEach((industria) => {
      it(`Deve filtrar por ${industria} e garantir que o filtro permanece ao voltar`, () => {
        cy.get('[data-testid="industry-filter"]').select(industria);
        cy.contains('button', 'View').click();
        cy.contains('button', 'Back').click();
        cy.get('[data-testid="industry-filter"]').should('have.value', industria);
      });
    });
  });
});
