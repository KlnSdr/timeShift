class startStopPanel implements Component {
  public render(parent: edomElement) {
    edom.fromTemplate([this.instructions()], parent);
  }

  public instructions(): edomTemplate {
    return {
      tag: "div",
      classes: ["startStopPanel"],
      children: [
        {
          tag: "h1",
          text: this.getCurrentTime(),
        },
        new button("kommen", () => {}).instructions(),
      ],
    };
  }

  private getCurrentTime(): string {
    return new Date().toLocaleTimeString("de-DE", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  public unload() {}
}
