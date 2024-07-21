class app implements Component {
  private readonly links: NavItem[] = [
    {
      destination: "/",
      text: "home",
    },
    {
      destination: "/about",
      text: "about",
    },
    {
      destination: "/contact",
      text: "contact",
    },
    {
      destination: "/logout",
      text: "logout",
    },
  ];

  public render(parent: edomElement) {
    edom.fromTemplate([this.instructions()], parent);
  }

  public instructions(): edomTemplate {
    return {
      tag: "div",
      children: [
        new navbar(this.links).instructions(),
        new mainPanel().instructions(),
      ],
    };
  }

  public unload() {}
}
