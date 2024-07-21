class button implements Component {
  private text: string = "";
  private click: (self: edomElement) => void = () => {};
  constructor(text: string, click: (self: edomElement) => void) {
    this.text = text;
    this.click = click;
  }

  public render(parent: edomElement) {
    edom.fromTemplate([this.instructions()], parent);
  }

  public instructions(): edomTemplate {
    return {
      tag: "button",
      text: this.text,
      classes: ["timeShift_button"],
      handler: [
        {
          id: "click",
          type: "click",
          body: this.click,
        },
      ],
    };
  }

  public unload() {}
}
