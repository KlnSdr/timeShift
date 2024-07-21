class infoTableRow implements Component {
  public render(parent: edomElement) {
    edom.fromTemplate([this.instructions()], parent);
  }

  public instructions(): edomTemplate {
    return {
      tag: "tr",
      classes: ["infoTableRow"],
      text: "Hello World!",
    };
  }

  public unload() {}
}
