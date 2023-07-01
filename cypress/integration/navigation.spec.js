describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  it("should navigate to Tuesday", () => {
    cy.visit("/");
  
    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected")
  });

  it("should book an interview", () => { //only works if 1st slot on tues isnt filled
    cy.visit("/")

    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      cy.get("[data-testid=appointment]").eq(0).click();

    cy.get("[data-testid=student-name-input").type("Lydia Miller Jones")

    cy.get("[alt='Sylvia Palmer']").click()
    cy.contains("Save").click()
    cy.contains("Saving...").should("exist")
    cy.contains("Lydia Miller Jones").should("exist");
    cy.contains("[data-testid=day]", "Monday")
    .parent()
    .find("[data-testid=spots-remaining]")
   
  })

  it.only("should edit an appointment", () => {
    cy.visit("/");
    
    cy.contains("[data-testid=appointment]", "Archie Cohen")
    .trigger("mouseover")
    .click()
    //only works when the mouse is hovered over ahchie during the test
    //cant get cypress to do mouseOver properly
    .then(() => {
      cy.get("[data-testid=edit]").click({force:true});
    });

    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Updated Name");
    
      cy.get(".interviewers__item").first().click();
    
    cy.contains("Save").click();
    cy.contains("[data-testid=appointment]", "Updated Name").should("exist");
  });
})

it("should delete a appointment", () => {
  cy.visit("/")

  cy.contains("[data-testid=appointment]", "Archie Cohen")
  cy.get("[alt=Delete]").click({force:true})
  .then(() => {
    cy.contains("Confirm").click();
  });
  
})