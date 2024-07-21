class calendarPanel implements Component {
  public render(parent: edomElement) {
    edom.fromTemplate([this.instructions()], parent);
  }

  public instructions(): edomTemplate {
    return {
      tag: "div",
      classes: ["calendarPanel"],
      children: [
        {
          tag: "div",
          classes: ["calendarHeader"],
          children: [
            new button("<", () => {}, ["squareButtonSmol"]).instructions(),
            {
              tag: "label",
              text: "Juli 2024",
            },
            new button(">", () => {}, ["squareButtonSmol"]).instructions(),
          ],
        },
        new calendar().instructions(),
      ],
    };
  }

  public unload() {}
}
