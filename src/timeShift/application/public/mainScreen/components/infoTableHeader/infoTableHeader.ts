class infoTableHeader implements Component {
  private readonly headline: string;

  public constructor(headline: string) {
    this.headline = headline;
  }

  public render(parent: edomElement) {
    edom.fromTemplate([this.instructions()], parent);
  }

  public instructions(): edomTemplate {
    return {
      tag: "th",
      classes: ["infoTableHeader"],
      text: this.headline,
    };
  }

  public unload() {}
}
