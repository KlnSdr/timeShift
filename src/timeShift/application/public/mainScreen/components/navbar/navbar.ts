interface NavItem {
  destination: string;
  text: string;
}

class navbar implements Component {
  private readonly links: NavItem[];

  constructor(links: NavItem[]) {
    this.links = links;
  }

  public render(parent: edomElement) {
    edom.fromTemplate([this.instructions()], parent);
  }

  public instructions(): edomTemplate {
    return {
      tag: "nav",
      classes: ["navbar"],
      children: [
        ...this.links.map((link) =>
          new button(
            link.text,
            () => {
              location.assign(link.destination);
            },
            ["timeShift_button_inverted"],
          ).instructions(),
        ),
      ],
    };
  }

  public unload() {}
}
