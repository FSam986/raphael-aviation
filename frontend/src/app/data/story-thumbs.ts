// Story Flight stop pictures: one hand-picked illustration per CPL section
// ("folder/file" under /public/figures). Chosen to match the section and its
// story scene. Sections with no fitting original illustration are left out and
// show their stop number instead. PPL / IR sections inherit via their CPL mapping.
export const STORY_THUMBS: Record<string, string> = {
  // Aircraft Technical
  "A.1.1": "airframes/ch02_fig_11.png",      // gear pump (pumps, valves, bearings)
  "A.1.2": "airframes/ch01_fig_12.png",      // semi-monocoque
  "A.1.3": "electrics/ch04_04.png",          // lead-acid battery cell
  "A.1.4": "powerplant/fig_01_03.png",       // four-stroke cycle
  "A.1.5": "powerplant/fig_13_10.png",       // twin-spool turbofan
  "A.1.6": "airframes/ch15_fig_01.png",      // fire triangle
  "A.1.7": "met/microburst-surface-turbulence.jpg",
  "A.1.8": "fpp/fig_pf_5_5.png",             // thrust/drag curve
  // Air Law
  "A.3.2": "airlaw/al_x10.png",
  "A.3.5": "human-performance/hp-14.png",
  "A.3.6": "airlaw/al_x01.png",
  "A.3.7": "airlaw/al_x18.png",
  "A.3.10": "fpp/fig_x_tofp.png",
  "A.3.13": "airlaw/al_381_01.png",
  "A.3.14": "airlaw/al_x09.png",
  "A.3.16": "airlaw/al_x08.png",
  "A.3.17": "airlaw/al_x17.png",
  "A.3.18": "airlaw/al_433_01.png",
  // Flight Planning & Performance
  "A.4.1": "fpp/fig_x_tofp.png",
  "A.4.2": "fpp/fig_x_vn.png",
  "A.4.4": "fpp/fig_x_vs.png",
  "A.4.5": "fpp/fig_pf_2_4.png",
  "A.4.7": "fpp/fig_x_vxvy.png",
  "A.4.8": "fpp/fig_x_fac.png",
  "A.4.9": "fpp/fig_x_alt.png",
  "A.4.10": "fpp/fig_x_vmc.png",
  "A.4.11": "fpp/fig_x_dd.png",
  "A.4.12": "fpp/fig_mb_2_10.png",
  "A.4.13": "fpp/fig_14_01.png",
  // Human Performance
  "A.6.1": "human-performance/hp-09.png",
  "A.6.2": "human-performance/hp-40.png",
  "A.6.3": "human-performance/hp-04.png",
  // Instruments
  "A.7.1": "instruments/fig_02_02.png",
  "A.7.2": "instruments/fig_13_05.png",
  "A.7.3": "instruments/fig_22_05.png",
  "A.7.5": "instruments/fig_03_04.png",
  "A.7.6": "instruments/fig_25_06.png",
  "A.7.7": "instruments/fig_09_08.png",
  "A.7.8": "instruments/fig_33_07.png",
  "A.7.9": "instruments/fig_39_06.png",
  // Meteorology (matches the story scenes)
  "A.8.1": "met/mx_layers.png",
  "A.8.2": "met/atmosphere.jpg",
  "A.8.3": "met/mx_isobars.png",
  "A.8.4": "met/temperature.jpg",
  "A.8.5": "met/humidity.jpg",
  "A.8.6": "met/air-density.jpg",
  "A.8.7": "met/mx_altim.png",
  "A.8.8": "met/mx_bb.png",
  "A.8.9": "met/mx_lapse.png",
  "A.8.10": "met/mx_lifting.png",
  "A.8.11": "met/clouds-precip.jpg",
  "A.8.12": "met/mx_cbstages.png",
  "A.8.13": "met/mx_icetypes.png",
  "A.8.14": "met/microburst-surface-turbulence.jpg",
  "A.8.15": "met/mx_fogs.png",
  "A.8.17": "met/mx_coldfront.png",
  "A.8.18": "met/mx_trs.png",
  "A.8.19": "met/mx_cells.png",
  "A.8.20": "met/mx_shlow.png",
  "A.8.21": "met/mx_metar.png",
  // Navigation
  "A.9.1": "nav/nav_013_figure_01.png",
  "A.9.2": "nav/nav_066_figure_02.png",
  "A.9.3": "nav/nav_080_figure_01.png",
  "A.9.4": "nav/nav_405_figure_01.png",
  "A.9.5": "nav/nav_357_figure_01.png",
  "A.9.6": "nav/nav_181_figure_02.png",
  "A.9.7": "nav/nav_134_figure_02.png",
  "A.9.8": "nav/nav_198_figure_01.png",
  // Radio Navigation
  "A.10.1": "radionav/rn_x03.png",
  "A.10.2": "radionav/rn_x05.png",
  "A.10.3": "radionav/rn_13193.png",
  "A.10.4": "radionav/rn_x10.png",
  "A.10.5": "radionav/rn_x11.png",
  "A.10.7": "radionav/rn_x12.png",
  "A.10.8": "radionav/rn_x13.png",
  "A.10.9": "radionav/rn_x14.png",
  "A.10.10": "radionav/rn_x18.png",
  "A.10.11": "radionav/rn_x16.png",
  "A.10.12": "radionav/rn_x15.png",
};
