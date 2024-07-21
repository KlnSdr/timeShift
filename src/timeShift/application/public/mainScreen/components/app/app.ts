class app implements Component {
  public render(parent: edomElement) {
    edom.fromTemplate([this.instructions()], parent);
  }

  public instructions(): edomTemplate {
    return {
      tag: "div",
      children: [
        new navbar().instructions(),
        new mainPanel().instructions(),
      ]
    }
  }

  public unload() {}
}
