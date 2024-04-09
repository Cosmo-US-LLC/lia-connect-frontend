export class ConfigDB {
  static data = {
    settings: {
      layout_type: "ltr",
      sidebar: {
        type: "compact-wrapper",
        iconType: "stroke-svg",
      },
      sidebar_setting: "default-sidebar",
    },
    color: {
      primary_color: localStorage.getItem("default_color") || "#1264FD",
      secondary_color: localStorage.getItem("secondary_color") || "#1D1D1D",
      mix_background_layout: "light-only",
    },
    router_animation: "fadeIn",
  };
}
export default ConfigDB;
