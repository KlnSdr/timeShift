class mainPanel implements Component {
  public render(parent: edomElement) {
    edom.fromTemplate([this.instructions()], parent);
  }

  public instructions(): edomTemplate {
    return {
      tag: "div",
      classes: ["mainPanel"],
      children: [
        new startStopPanel().instructions(),
        new calendarPanel().instructions(),
        new infoTablePanel().instructions()
      ]
    };
  }

  public unload() {}
}
