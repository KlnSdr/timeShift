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
        new calendarPanel(mainPanel.loadAndOpenDay).instructions(),
        new infoTablePanel().instructions(),
      ],
    };
  }

  private static loadAndOpenDay(day: number, month: number, year: number) {
    console.log(`Loading and opening day ${day} ${month} ${year}`);
  }

  public unload() {}
}
