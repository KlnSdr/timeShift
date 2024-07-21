class calendar implements Component {
  public render(parent: edomElement) {
    edom.fromTemplate([this.instructions()], parent);
  }

  public instructions(): edomTemplate {
    return {
      tag: "div",
      classes: ["calendar"],
      children: [
        ...["M", "D", "M", "D", "F", "S", "S"].map((day: string) =>
          new button(day, () => {}, [
            "squareButton",
            "disabledButton",
          ]).instructions(),
        ),
        ...[1, 2, 3].map((i: number) =>
          new button("", () => {}, [
            "squareButton",
            "disabledButton",
          ]).instructions(),
        ),
        ...Array.from({ length: 31 }, (_, i) => i + 1).map((day: number) =>
          new button(day.toString(), () => {}, ["squareButton"]).instructions(),
        ),
      ],
    };
  }

  public unload() {}
}
