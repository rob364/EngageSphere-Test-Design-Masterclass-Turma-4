describe("EngageSphere API", () => {
  
  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-test="accept-button"]').click();
  });

  it("CT01 - Recupera clientes com sucesso (por exemplo, verifica o código de status 200)", () => {
    
    // Função para buscar clientes dentro do próprio teste
    const buscarClientes = (page = 1, limit = 10, size = "All", industry = "All") => {
      return cy.request({
        method: "GET",
        url: `${Cypress.env("apiUrl")}/customers?page=${page}&limit=${limit}&size=${size}&industry=${industry}`,
      }).then((response) => {
        expect(response.status).to.eq(200);
        return response.body; // Retorna o corpo da resposta, que é um objeto
      });
    };
  
    // Chamada da função para executar a requisição e validar a resposta
    buscarClientes().then((clientes) => {
      expect(clientes.customers.length).to.be.greaterThan(0); // Verifica se há clientes na resposta
    });
  });
  

  it('CT02 - Verifica que a paginação retorna clientes diferentes entre páginas', () => {
    cy.getClientesPorPagina(1).then((clientesPagina1) => {
      cy.getClientesPorPagina(2).then((clientesPagina2) => {

        // Exibir os clientes no console para depuração
        console.log("Clientes Página 1:", clientesPagina1);
        console.log("Clientes Página 2:", clientesPagina2);

        // Verifica que não há interseção entre os IDs das páginas
        const intersecao = clientesPagina1.filter(id => clientesPagina2.includes(id));
        expect(intersecao).to.be.empty;
      });
    });
  });

});

 