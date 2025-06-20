import { component, defineMarkdocConfig, nodes } from "@astrojs/markdoc/config";

export default defineMarkdocConfig({
  nodes: {
    document: {
      ...nodes.document, // Apply defaults for other options
      render: undefined, // default 'article'
    },
    heading: {
      attributes: {
        ...nodes.heading.attributes, // Use the correct base attributes for a heading
        // Additional custom attributes if needed
        title: { type: String, render: "title" },
        level: { type: Number, render: "level" },
      },
      render: component("./src/components/primitives/Title.astro"),
    },
    link: {
      render: "a",
      attributes: {
        href: { type: String },
        target: { type: String, default: "_blank" },
        rel: { type: String, default: "noopener noreferrer" },
      },
    },
  },
  tags: {
    Container: {
      attributes: {
        class: { type: String, render: "class" },
      },
      children: ["*"],
      render: component("./src/components/primitives/Container.astro"),
    },
    ContainerFluid: {
      attributes: {
        class: { type: String, render: "class" },
      },
      children: ["*"],
      render: component("./src/components/primitives/ContainerFluid.astro"),
    },
    Prose: {
      attributes: {
        class: { type: String, render: "class" },
      },
      children: ["*"],
      render: component("./src/components/primitives/Prose.astro"),
    },
    Flex: {
      attributes: {
        class: { type: String, render: "class" },
        direction: { type: String, render: "direction" },
        verticalAlign: { type: String, render: "verticalAlign" },
        horizontalAlign: { type: String, render: "horizontalAlign" },
        itemsAlignment: { type: String, render: "itemsAlignment" },
        gap: { type: Number, render: "gap" },
        wrap: { type: Boolean, render: "wrap" },
      },
      children: ["*"],
      render: component("./src/components/primitives/Flex.astro"),
    },
    Hero: {
      attributes: {
        title: { type: String, render: "title", required: true },
        subtitle: { type: String, render: "subtitle", required: true },
        buttons: { type: Array, render: "buttons", required: true },
      },
      render: component("./src/components/sections/Hero.astro"),
    },
    BlogLatest: {
      attributes: {
        title: { type: String, render: "title", required: true },
      },
      render: component("./src/components/sections/BlogLatest.astro"),
    },
    ImageText: {
      attributes: {
        items: { type: Array, render: "items", required: true },
      },
      render: component("./src/components/sections/ImageText.astro"),
    },
    LogoCloud: {
      attributes: {
        title: { type: String, render: "title", required: true },
        logos: { type: Array, render: "logos", required: true },
      },
      render: component("./src/components/sections/LogoCloud.astro"),
    },
    Services: {
      attributes: {
        title: { type: String, render: "title", required: true },
        services: { type: Array, render: "services", required: true },
      },
      render: component("./src/components/sections/Services.astro"),
    },
    RecentWork: {
      attributes: {
        title: { type: String, render: "title", required: true },
        buttons: { type: Array, render: "buttons", required: true },
      },
      render: component("./src/components/sections/RecentWork.astro"),
    },
    Testimonial: {
      attributes: {
        testimonial: { type: String, render: "testimonial", required: true },
        name: { type: String, render: "name", required: true },
      },
      render: component("./src/components/sections/Testimonial.astro"),
    },
    Results: {
      attributes: {
        title: { type: String, render: "title", required: true },
        results: { type: Array, render: "results", required: true },
      },
      render: component("./src/components/sections/Results.astro"),
    },
    About: {
      attributes: {
        title: { type: String, render: "title", required: true },
        subtitle: { type: String, render: "subtitle", required: true },
        content: { type: String, render: "content", required: true },
      },
      render: component("./src/components/sections/About.astro"),
    },
    Works: {
      attributes: {},
      render: component("./src/components/sections/Works.astro"),
    },
    News: {
      attributes: {},
      render: component("./src/components/sections/News.astro"),
    },
    Contact: {
      attributes: {
        title: { type: String, render: "title", required: true },
        fields: { type: Array, render: "fields", required: true },
      },
      render: component("./src/components/sections/Contact.astro"),
    },
  },
});
