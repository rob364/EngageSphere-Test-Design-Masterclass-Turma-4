describe("EngageSphere GUI", () => {
  
    beforeEach(() => {
      cy.visit("/");
      cy.setCookie('cookieConsent', 'accepted')
    });
  
    it("CT01 - Recupera clientes com sucesso (Mantém os filtros ao voltar da visualização de detalhes do cliente *)", () => {
      //cy.buscarClientes()
      cy.get('[data-test="view-customer-0"]').click();
      cy.get('[data-test="button-back"]').click();
      cy.get('[data-testid="size-filter"]')
        .find('option')
        .should('contain', 'All');

      });

      // it("CT02 - Retorna à lista de clientes ao clicar no botão Voltar*)", () => {
       
    
      //   });

      //   it("CT03 - Exibie o rodapé com o texto e links corretos *)", () => {
        
    
      //       });

      //     it("CT04 - Exibe a saudação Hi, there quando nenhum nome é fornecido *)", () => {
        
    
      //           });

      //   it("CT05 - Exibe a saudação Hi, Joe quando o nome é fornecido *)", () => {
        
    
      //               });

      // it("CT06 - Exibe o cabeçalho com um título, alternador de tema e um campo de entrada de texto *)", () => {  
      
    
      //                   });
    
  });
  