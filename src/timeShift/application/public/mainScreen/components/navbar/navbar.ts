class navbar implements Component {
  public render(parent: edomElement) {
    edom.fromTemplate([this.instructions()], parent);
  }

  public instructions(): edomTemplate {
    return {
      tag: "nav",
      classes: ["navbar"],
    };
  }

  public unload() {}
}
