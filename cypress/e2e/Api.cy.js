describe("EngageSphere API", () => {
  const apiUrl = Cypress.env("CUSTOMERS_API_URL"); 
  it("Verificando se na recuperação do cliente o status é 200", () => {
    const page = 1;

    cy.request({
      method: "GET",
      url: `${apiUrl}?page=${page}`, 
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("Recuperando 10 clientes com sucesso", () => {
    const page = 1;

    cy.request({
      method: "GET",
      url: `${apiUrl}?page=${page}`,
    }).then((response) => {
      expect(response.body).to.have.property("customers");
      expect(response.body.customers).to.be.an("array").that.has.length(10);
    });
  });

  it("Realiza a paginação de clientes corretamente", () => {
    cy.request("GET", `${apiUrl}?page=2`).as("getCustomersPageTwo");

    cy.get("@getCustomersPageTwo").then((response) => {
      expect(response.body).to.have.property("pageInfo");
      expect(response.body.pageInfo).to.have.property("currentPage", 2);
    });
  });
});



