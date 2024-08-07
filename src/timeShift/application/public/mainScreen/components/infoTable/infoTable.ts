class infoTable implements Component {
  private readonly id: string;
  private readonly headline: string;
  private readonly data: dataPoint[];
  private readonly renderData: (data: dataPoint[]) => edomTemplate[];

  public constructor(
    headline: string,
    id: string,
    data: dataPoint[],
    renderData: (data: dataPoint[]) => edomTemplate[],
  ) {
    this.headline = headline;
    this.id = id;
    this.data = data;
    this.renderData = renderData;
  }

  public render(parent: edomElement) {
    edom.fromTemplate([this.instructions()], parent);
  }

  public instructions(): edomTemplate {
    return {
      tag: "div",
      id: this.id,
      children: [
        new infoTableHeader(this.headline).instructions(),
        {
          tag: "table",
          classes: ["infoTable"],
          children: [...this.renderData(this.data)],
        },
      ],
    };
  }

  public unload() {}
}
