class infoTablePanel implements Component {
  private readonly idPanel: string =
    "infoTablePanel" + Math.random().toString(36).substring(7);
  private readonly idTblBuchungen: string =
    "tblBuchungen" + Math.random().toString(36).substring(7);
  private readonly idTblSalden: string =
    "tblSalden" + Math.random().toString(36).substring(7);

  public render(parent: edomElement) {
    edom.fromTemplate([this.instructions()], parent);
  }

  public instructions(): edomTemplate {
    return {
      tag: "div",
      classes: ["infoTablePanel"],
      id: this.idPanel,
      children: [],
    };
  }

  public update(data: dataPoint[]) {
    const tblBuchungen: edomElement | undefined = edom.findById(
      this.idTblBuchungen,
    );
    const tblSalden: edomElement | undefined = edom.findById(this.idTblSalden);
    if (tblBuchungen) {
      tblBuchungen.delete();
    }
    if (tblSalden) {
      tblSalden.delete();
    }

    edom.fromTemplate(
      [
        new infoTable(
          "Buchungen",
          this.idTblBuchungen,
          data,
          infoTablePanel.renderDataBuchungen,
        ).instructions(),
        new infoTable(
          "Saldenübersicht",
          this.idTblSalden,
          data,
          () => [],
        ).instructions(),
      ],
      edom.findById(this.idPanel),
    );
  }

  private static renderDataBuchungen(data: dataPoint[]): edomTemplate[] {
    console.log(data);
    return data.map((point: dataPoint) => {
      return {
        tag: "tr",
        text: `${point.hour}:${point.minute} ${point.isStart ? "kommen" : "gehen"}`,
      };
    });
  }

  public unload() {}
}
