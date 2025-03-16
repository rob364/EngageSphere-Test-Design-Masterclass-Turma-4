Cypress.Commands.add('getClientesPorPagina', (pagina) => {
  return cy.request({
    method: 'GET',
    url: `http://localhost:3001/customers?page=${pagina}&limit=10&size=All&industry=All`,
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property('customers');
    expect(response.body.customers).to.be.an('array').that.is.not.empty;

    // Exibir no console para debug
    cy.log(`Clientes da Página ${pagina}:`, JSON.stringify(response.body.customers, null, 2));
    console.log(`Clientes da Página ${pagina}:`, response.body.customers);

    return cy.wrap(response.body.customers.map(c => c.id)); // ✅ Garantindo que o Cypress gerencie a async function corretamente
  });
});


