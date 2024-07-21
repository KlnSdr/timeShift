class infoTablePanel implements Component {
  public render(parent: edomElement) {
    edom.fromTemplate([this.instructions()], parent);
  }

  public instructions(): edomTemplate {
    return {
      tag: "div",
      classes: ["infoTablePanel"],
      children: [
        new infoTable().instructions(),
        new infoTable().instructions(),
      ],
    };
  }

  public unload() {}
}
