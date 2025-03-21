Comando para rodar o projeto
npm run start:server & npm run start:frontend & npx cypress open


 
  it("Persists the limit of items per page when changed", () => {
    const newLimit = "10"; // Define o novo limite

    // 1️⃣ Seleciona o novo limite e dispara eventos extras
    cy.get('select[name="pagination-limit"]')
      .select(newLimit)
      .trigger("change") // Garante que o evento seja detectado
      .trigger("input")
      .blur();

    // 2️⃣ Aguarda um tempo para garantir que a aplicação salvou o valor
    cy.wait(4000);

    // 3️⃣ Verifica se o localStorage foi atualizado (confirme a chave no DevTools!)
    cy.window()
      .its("localStorage")
      .invoke("getItem", "pagination-limit")
      .should("not.be.null")
      .and("eq", newLimit);

    // 4️⃣ Recarrega a página para testar a persistência
    cy.reload();

    // 5️⃣ Confirma que o dropdown ainda exibe o valor salvo
    cy.get('select[name="pagination-limit"]').should("have.value", newLimit);
  });