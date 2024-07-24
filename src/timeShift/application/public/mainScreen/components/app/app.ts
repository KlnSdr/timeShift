class app implements Component {
  private readonly links: NavItem[] = [
    {
      destination: "{{CONTEXT}}/do-logout",
      text: "abmelden",
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
