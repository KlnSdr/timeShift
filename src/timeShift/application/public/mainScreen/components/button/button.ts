class button implements Component {
  private text: string = "";
  private click: (self: edomElement) => void = () => {};
  private additionalClasses: string[];
  constructor(
    text: string,
    click: (self: edomElement) => void,
    additionalClasses: string[] = [],
  ) {
    this.text = text;
    this.click = click;
    this.additionalClasses = additionalClasses;
  }

  public render(parent: edomElement) {
    edom.fromTemplate([this.instructions()], parent);
  }

  public instructions(): edomTemplate {
    return {
      tag: "button",
      text: this.text,
      classes: ["timeShift_button", ...this.additionalClasses],
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
