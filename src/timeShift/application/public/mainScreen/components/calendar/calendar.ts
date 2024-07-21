class calendar implements Component {
  public render(parent: edomElement) {
    edom.fromTemplate([this.instructions()], parent);
  }

  public instructions(): edomTemplate {
    return {
      tag: "div",
      classes: ["calendar"],
      children: [
        ...Array.from({ length: 31 }, (_, i) => i + 1).map((day: number) =>
          new button(day.toString(), () => {}, ["squareButton"]).instructions(),
        ),
      ],
    };
  }

  public unload() {}
}
