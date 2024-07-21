class infoTable implements Component {
  public render(parent: edomElement) {
    edom.fromTemplate([this.instructions()], parent);
  }

  public instructions(): edomTemplate {
    return {
      tag: "table",
      classes: ["infoTable"],
      children: [
        ...[1, 2, 3, 4].map((i: number) => new infoTableRow().instructions()),
      ],
    };
  }

  public unload() {}
}
