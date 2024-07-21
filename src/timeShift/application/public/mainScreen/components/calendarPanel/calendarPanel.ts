class calendarPanel implements Component {
  public render(parent: edomElement) {
    edom.fromTemplate([this.instructions()], parent);
  }

  public instructions(): edomTemplate {
    return {
      tag: "div",
      classes: ["calendarPanel"],
      children: [new calendar().instructions()],
    };
  }

  public unload() {}
}
