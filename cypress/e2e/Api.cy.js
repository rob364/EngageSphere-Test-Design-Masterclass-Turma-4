describe("EngageSphere API", () => {
  it.only("Recupera 10 clientes com sucesso e verifica o código de status 200", () => {
    const page = 1;
    cy.request({
      method: "GET",
      url: `${Cypress.env("apiUrl")}/customers?page=${page}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.customers).to.be.an("array"); 
    });
  });
 
