class infoTable implements Component {
  private readonly headline: string;
  
  public constructor(headline: string) {
    this.headline = headline;
  }
  
  public render(parent: edomElement) {
    edom.fromTemplate([this.instructions()], parent);
  }

  public instructions(): edomTemplate {
    return {
      tag: "table",
      classes: ["infoTable"],
      children: [
        new infoTableHeader(this.headline).instructions(),
        ...[1, 2, 3, 4].map((i: number) => new infoTableRow().instructions()),
      ],
    };
  }

  public unload() {}
}
