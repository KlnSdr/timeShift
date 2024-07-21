class mainPanel implements Component {
  public render(parent: edomElement) {
    edom.fromTemplate([this.instructions()], parent);
  }

  public instructions(): edomTemplate {
    return {
      tag: "div",
      children: [
        new button("click me", () => alert(1)).instructions(),
      ]
    };
  }

  public unload() {}
}
