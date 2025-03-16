describe("EngageSphere API", () => {
  it("Recupera 10 clientes com sucesso e verifica o código de status 200", () => {
    const page = 1;
    cy.request({
      method: "GET",
      url: `${Cypress.env("apiUrl")}/customers?page=${page}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.customers).to.be.an("array"); 
    });
  });
  it("Realiza a paginação de clientes corretamente", () => {
    const CUSTOMERS_API_URL = Cypress.env("CUSTOMERS_API_URL"); 

    cy.request("GET", `${CUSTOMERS_API_URL}?page=2`).as("getCustomersPageTwo");

    cy.get("@getCustomersPageTwo")
      .its("body.pageInfo.currentPage")
      .should("eq", 2); 
  });
});

 
